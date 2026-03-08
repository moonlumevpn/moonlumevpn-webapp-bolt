import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import BackgroundEffects from '../components/BackgroundEffects';
import Moon from '../components/Moon';

interface PublicInvoiceInformation {
  status: string;
  description: string;
  providerMethod: string;
  providerPaymentUrl: string;
}

interface PublicInvoiceInformationResponse {
  status?: unknown;
  description?: unknown;
  providerMethod?: unknown;
  providerPaymentUrl?: unknown;
  Status?: unknown;
  Description?: unknown;
  ProviderMethod?: unknown;
  ProviderPaymentUrl?: unknown;
}

const apiBase = import.meta.env.VITE_API_BASE_URL || '';
const tgBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL || '';
const isDev = import.meta.env.DEV;
const statusPollIntervalMs = 5000;
const maxInitialLoadAttempts = 15;
const initialRetryDelayMs = 1200;
type InvoiceStatusView = 'paid' | 'expired' | 'pending';

function extractUuid(pathname: string): string | null {
  const match = pathname.match(/^\/pay\/([^/]+)$/);
  if (!match) {
    return null;
  }
  return decodeURIComponent(match[1]);
}

function normalizeInvoice(data: PublicInvoiceInformationResponse): PublicInvoiceInformation {
  const toSafeString = (value: unknown): string => {
    if (typeof value === 'string') {
      return value;
    }
    if (value == null) {
      return '';
    }
    return String(value);
  };

  return {
    status: toSafeString(data.status ?? data.Status),
    description: toSafeString(data.description ?? data.Description),
    providerMethod: toSafeString(data.providerMethod ?? data.ProviderMethod),
    providerPaymentUrl: toSafeString(data.providerPaymentUrl ?? data.ProviderPaymentUrl),
  };
}

function toStatusView(rawStatus: unknown): InvoiceStatusView {
  const status = (typeof rawStatus === 'string' ? rawStatus : String(rawStatus ?? ''))
    .trim()
    .toLowerCase();

  if (['paid', 'success', 'succeeded', 'completed', 'complete'].includes(status)) {
    return 'paid';
  }

  if (['expired', 'failed', 'canceled', 'cancelled', 'voided', 'timeout', 'timed_out'].includes(status)) {
    return 'expired';
  }

  return 'pending';
}

function toRussianStatus(statusView: InvoiceStatusView): string {
  if (statusView === 'paid') {
    return 'Оплачен';
  }

  if (statusView === 'expired') {
    return 'Истек';
  }

  return 'Ожидает оплаты';
}

export default function PayPage() {
  const uuid = useMemo(() => extractUuid(window.location.pathname), []);
  const [invoice, setInvoice] = useState<PublicInvoiceInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [error, setError] = useState('');
  const [devStatusOverride, setDevStatusOverride] = useState<InvoiceStatusView | null>(null);

  useEffect(() => {
    if (!uuid) {
      setError('Неверная ссылка на оплату.');
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let isActive = true;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const waitBeforeRetry = async () => {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, initialRetryDelayMs);
      });
    };

    const fetchInvoice = async () => {
      const response = await axios.get<PublicInvoiceInformationResponse>(
        `${apiBase}/api/v1/invoices/public/by-uuid/${encodeURIComponent(uuid)}`,
        { signal: controller.signal }
      );

      const nextInvoice = normalizeInvoice(response.data);
      if (!isActive || controller.signal.aborted) {
        return;
      }
      setInvoice(nextInvoice);

      if (toStatusView(nextInvoice.status) !== 'pending' && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      setError('');
    };

    const fetchInvoiceWithRetries = async () => {
      try {
        if (!isActive || controller.signal.aborted) {
          return false;
        }
        setLoading(true);
        setError('');
        setLoadAttempt(0);

        for (let attempt = 1; attempt <= maxInitialLoadAttempts; attempt += 1) {
          if (!isActive || controller.signal.aborted) {
            return false;
          }

          setLoadAttempt(attempt);
          try {
            await fetchInvoice();
            return true;
          } catch (err) {
            if (axios.isCancel(err)) {
              return false;
            }

            if (attempt < maxInitialLoadAttempts) {
              await waitBeforeRetry();
            }
          }
        }

        if (isActive && !controller.signal.aborted) {
          setError(`Не удалось загрузить информацию об оплате после ${maxInitialLoadAttempts} попыток.`);
        }
        return false;
      } finally {
        if (isActive && !controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchInvoiceWithRetries().then((ok) => {
      if (!ok || !isActive || controller.signal.aborted) {
        return;
      }

      intervalId = setInterval(() => {
        void fetchInvoice().catch(() => {
          // Keep polling in background; next cycle will retry.
        });
      }, statusPollIntervalMs);
    });

    return () => {
      isActive = false;
      controller.abort();
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [uuid]);

  const statusView = toStatusView(invoice?.status ?? '');
  const effectiveStatusView = devStatusOverride ?? statusView;
  const showPaymentButton = !!invoice?.providerPaymentUrl && effectiveStatusView === 'pending';
  const showPostStatusActions = effectiveStatusView === 'paid' || effectiveStatusView === 'expired';
  const visibleAttempt = Math.max(loadAttempt, 1);
  const loadProgress = Math.min(100, Math.round((visibleAttempt / maxInitialLoadAttempts) * 100));

  const handleReturnToBot = () => {
    if (tgBotUrl) {
      window.location.href = tgBotUrl;
      return;
    }

    window.close();
  };

  return (
    <div className="relative bg-dark min-h-screen">
      <BackgroundEffects />
      <main className="relative z-10 min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="w-full max-w-md">
          <div className="text-center">
            <Moon />
            <h1 className="text-3xl font-bold text-white mb-6">Moonlume</h1>
          </div>

          <div className="bg-dark/80 ring-1 ring-white/5 rounded-2xl p-6 mt-6">
            {loading && (
              <div className="space-y-4 py-6">
                <div className="flex flex-col items-center justify-center gap-3 text-gray-200">
                  <svg
                    className="w-10 h-10"
                    viewBox="0 0 50 50"
                    role="img"
                    aria-label="Загрузка"
                    style={{ animation: 'spin 1s linear infinite' }}
                  >
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeOpacity="0.25"
                    />
                    <path
                      d="M25 5a20 20 0 0 1 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-sm text-center">
                    Загружаем данные платежа ({visibleAttempt}/{maxInitialLoadAttempts})
                  </p>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-purple-400 transition-all duration-300"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                <style>{'@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }'}</style>
              </div>
            )}

            {!loading && error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {!loading && !error && invoice && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Статус</p>
                  <p className="text-white">{toRussianStatus(effectiveStatusView)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Описание</p>
                  <p className="text-white">{invoice.description || 'Без описания'}</p>
                </div>

                {isDev && (
                  <div className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-gray-300">Dev: UI preview status</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setDevStatusOverride('pending')}
                        className="rounded-md bg-slate-700 px-3 py-1.5 text-xs text-white hover:bg-slate-600 transition-colors"
                      >
                        Pending
                      </button>
                      <button
                        type="button"
                        onClick={() => setDevStatusOverride('paid')}
                        className="rounded-md bg-emerald-700 px-3 py-1.5 text-xs text-white hover:bg-emerald-600 transition-colors"
                      >
                        Paid
                      </button>
                      <button
                        type="button"
                        onClick={() => setDevStatusOverride('expired')}
                        className="rounded-md bg-amber-700 px-3 py-1.5 text-xs text-white hover:bg-amber-600 transition-colors"
                      >
                        Expired
                      </button>
                      <button
                        type="button"
                        onClick={() => setDevStatusOverride(null)}
                        className="rounded-md bg-zinc-700 px-3 py-1.5 text-xs text-white hover:bg-zinc-600 transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}

                {showPaymentButton && (
                  <div className="space-y-3">
                    <a
                      href={invoice.providerPaymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1d1346] hover:bg-[#2a1c63] text-white py-3 text-sm font-medium transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="97"
                        height="120"
                        fill="none"
                        viewBox="0 0 97 120"
                        aria-hidden="true"
                        className="h-5 w-auto"
                      >
                        <path d="M0 26.12l14.532 25.975v15.844L.017 93.863 0 26.12z" fill="#5B57A2" />
                        <path d="M55.797 42.643l13.617-8.346 27.868-.026-41.485 25.414V42.643z" fill="#D90751" />
                        <path d="M55.72 25.967l.077 34.39-14.566-8.95V0l14.49 25.967z" fill="#FAB718" />
                        <path d="M97.282 34.271l-27.869.026-13.693-8.33L41.231 0l56.05 34.271z" fill="#ED6F26" />
                        <path d="M55.797 94.007V77.322l-14.566-8.78.008 51.458 14.558-25.993z" fill="#63B22F" />
                        <path d="M69.38 85.737L14.531 52.095 0 26.12l97.223 59.583-27.844.034z" fill="#1487C9" />
                        <path d="M41.24 120l14.556-25.993 13.583-8.27 27.843-.034L41.24 120z" fill="#017F36" />
                        <path d="M.017 93.863l41.333-25.32-13.896-8.526-12.922 7.922L.017 93.863z" fill="#984995" />
                      </svg>
                      <span>Оплатить через СБП</span>
                    </a>
                  </div>
                )}

                {effectiveStatusView === 'paid' && (
                  <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-200 px-4 py-3 rounded-lg text-sm text-center">
                    Платёж получен. Заказ успешно оплачен.
                    <br/>
                    В течении минуты активируется подписка
                    <br/>
                    <br/>
                    Ссылку для подключения в личном кабинете
                  </div>
                )}

                {effectiveStatusView === 'expired' && (
                  <div className="bg-amber-500/20 border border-amber-500 text-amber-200 px-4 py-3 rounded-lg text-sm text-center">
                    Срок оплаты истёк. Создайте новую ссылку на оплату.
                  </div>
                )}

                {showPostStatusActions && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <a
                      href="/"
                      className="flex w-full items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white py-3 text-sm font-medium transition-colors"
                    >
                      Вернуться на сайт
                    </a>
                    <button
                      type="button"
                      onClick={handleReturnToBot}
                      className="flex w-full items-center justify-center rounded-lg bg-[#1d1346] hover:bg-[#2a1c63] text-white py-3 text-sm font-medium transition-colors"
                    >
                      Вернуться в бота
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}



