import { useState, useEffect, ComponentType } from 'react';
import BackgroundEffects from '../components/BackgroundEffects';
import AccountHeader from '../components/AccountHeader';
import TariffCard from '../components/TariffCard';
import StatusCard from '../components/StatusCard';
import EndDateCard from '../components/EndDateCard';
import TrafficCard from '../components/TrafficCard';
// import SubscriptionCard from '../components/SubscriptionCard'; // kept for reference
import {
  Home,
  Server,
  Users,
  Settings,
  CreditCard,
  X,
} from 'lucide-react';
import { ensureValidAccessToken } from '../lib/auth';
import api from '../lib/api';

interface NavItem {
  name: string;
  icon: ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SubscriptionData {
  tariff: {
    name: string;
    price: string;
    period: string;
    features: string;
    speedLimitMbps: number;
    popular: boolean;
  };
  active: boolean;
  paymentDate: string;
  daysLeft: number;
  bandwidthUsedGb: number;
  bandwidthLeftGb: number;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string;
  popular: boolean;
  speedLimitMbps?: number;
  bandwidthGb?: number;
}

const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { name: 'Home', icon: Home },
    ],
  },
  {
    title: 'Management',
    items: [
      { name: 'Servers', icon: Server },
      { name: 'Users', icon: Users },
      { name: 'Settings', icon: Settings },
    ],
  },
  {
    title: 'Subscription',
    items: [
      { name: 'Billing', icon: CreditCard },
      { name: 'Plan', icon: CreditCard },
    ],
  },
];

export default function AccountPage() {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await ensureValidAccessToken();
      if (!token) {
        window.location.href = '/login';
      }
    };
    checkAuth();
  }, []);

  const [activeTab, setActiveTab] = useState<string>('Home');
  const [navModalOpen, setNavModalOpen] = useState<boolean>(false);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [subscriptionError, setSubscriptionError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // state for plan list
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState<boolean>(false);
  const [plansError, setPlansError] = useState<boolean>(false);

  useEffect(() => {
    if (activeTab === 'Home') {
      fetchSubscription();
    } else if (activeTab === 'Plan') {
      fetchPlans();
    }
  }, [activeTab]);

  const handlePlanClick = (plan: Plan) => {
    console.log('plan clicked', plan);
    // TODO: implement selection flow e.g. open purchase modal
  };

  const fetchSubscription = async () => {
    try {
      setIsLoading(true);
      setSubscriptionError(false);
      const response = await api.get('/api/account/subscription');
      setSubscriptionData(response.data);
    } catch (error) {
      const err = error as { response?: { status?: number } };
      if (err.response?.status === 404) {
        setSubscriptionError(true);
      }
      console.error('Failed to fetch subscription:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      setPlansLoading(true);
      setPlansError(false);
      const response = await api.get<Plan[]>('/api/tariffs');
      if (Array.isArray(response.data)) {
        setPlans(response.data);
      } else {
        setPlansError(true);
      }
    } catch (err) {
      console.error('Failed to fetch plans:', err);
      setPlansError(true);
    } finally {
      setPlansLoading(false);
    }
  };

  return (
    <div className="relative bg-dark min-h-screen flex flex-col">
      {/* background effects layer */}
      <BackgroundEffects />

      <div className="relative z-10 flex flex-col min-h-screen">
        <AccountHeader balance="0.00" />

        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          {/* mobile navigation button (opens modal) */}
          <div className="md:hidden p-4">
            <button
              onClick={() => setNavModalOpen(true)}
              className="w-full glass-card p-3 rounded-xl bg-dark/60 text-white flex justify-between items-center"
            >
              <span>{activeTab}</span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* sidebar for larger screens */}
          <aside className="hidden md:block w-64 p-6 overflow-y-auto">
            {navSections.map((section) => (
              <div key={section.title} className="mb-8">
                <p className="uppercase text-gray-400 text-xs font-semibold">
                  {section.title}
                </p>
                <nav className="mt-2 space-y-2">
                  {section.items.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setActiveTab(item.name)}
                      className={`glass-card flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-transform focus:outline-none text-gray-300 ` +
                        (activeTab === item.name
                          ? 'ring-2 ring-purple-500 text-white scale-105'
                          : 'hover:scale-105 hover:text-white')
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            ))}
          </aside>

          {/* navigation modal (mobile) */}
          {navModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
              <div className="relative bg-dark/80 rounded-xl p-6 w-11/12 max-w-sm">
                <button
                  onClick={() => setNavModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
                {navSections.map((section) => (
                  <div key={section.title} className="mb-6">
                    <p className="uppercase text-gray-400 text-xs font-semibold mb-2">
                      {section.title}
                    </p>
                    <nav className="space-y-2">
                      {section.items.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            setActiveTab(item.name);
                            setNavModalOpen(false);
                          }}
                          className={`glass-card flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-transform focus:outline-none text-gray-300 ` +
                            (activeTab === item.name
                              ? 'ring-2 ring-purple-500 text-white scale-105'
                              : 'hover:scale-105 hover:text-white')
                          }
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                ))}
              </div>
            </div>
          )}

          <main className="flex-1 p-8 overflow-auto">

            {/* always show the floating header */}
            <h1 className="glass-card rounded-2xl p-5 text-white justify-between border border-blue-500/50 bg-blue-900/20 text-2xl font-bold text-white mb-4">{activeTab}</h1>

            {activeTab === 'Home' && (
              isLoading ? (
                <div className="flex items-center justify-center h-96">
                  <p className="text-gray-400">Загрузка...</p>
                </div>
              ) : subscriptionError ? (
                <div className="glass-card rounded-2xl p-8 text-center border border-amber-500/50 bg-amber-900/20">
                  <h2 className="text-xl font-bold text-white mb-4">У вас нет активной подписка</h2>
                  <p className="text-gray-300 mb-6">Выберите тариф и активируйте защищённое соединение</p>
                  <button
                    onClick={() => setActiveTab('Plan')}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    Перейти к тарифам
                  </button>
                </div>
              ) : subscriptionData ? (
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="hover:scale-105 transition-transform animate-on-scroll translate-y-10">
                    <TariffCard
                      name={subscriptionData.tariff.name}
                      price={subscriptionData.tariff.price}
                      startDate={subscriptionData.paymentDate}
                      endDate={new Date(new Date().setDate(new Date().getDate() + subscriptionData.daysLeft)).toISOString()}
                    />
                  </div>
                  <div className="hover:scale-105 transition-transform animate-on-scroll translate-y-10">
                    <StatusCard status="Активирована" />
                  </div>
                  <div className="hover:scale-105 transition-transform animate-on-scroll translate-y-10">
                    <EndDateCard endDate={new Date(new Date().setDate(new Date().getDate() + subscriptionData.daysLeft)).toISOString()} />
                  </div>
                  <div className="hover:scale-105 transition-transform animate-on-scroll translate-y-10">
                    <TrafficCard
                      trafficUsedGB={subscriptionData.bandwidthUsedGb}
                      trafficTotalGB={subscriptionData.bandwidthUsedGb + subscriptionData.bandwidthLeftGb}
                      speedLimit={`${subscriptionData.tariff.speedLimitMbps} Mbps`}
                    />
                  </div>
                </div>
              ) : null
            )}

            {/* plan tab content (no header) */}
            {activeTab === 'Plan' && (
              plansLoading ? (
                <div className="flex items-center justify-center h-96">
                  <p className="text-gray-400">Загрузка тарифов...</p>
                </div>
              ) : plansError ? (
                <div className="text-center text-gray-400">Не удалось загрузить тарифы</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((plan, idx) => (
                    <TariffCard
                      key={idx}
                      name={plan.name}
                      price={plan.price}
                      features={plan.features}
                      speedLimit={plan.speedLimitMbps ? `${plan.speedLimitMbps} Mbps` : undefined}
                      bandwidth={plan.bandwidthGb ? `${plan.bandwidthGb} GB` : undefined}
                      onClick={() => handlePlanClick(plan)}
                    />
                  ))}
                </div>
              )
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
