import { useState, useRef, useEffect } from 'react';
import BackgroundEffects from '../components/BackgroundEffects';
import Moon from '../components/Moon';
import api from '../lib/api';
import { saveTokens, ensureValidAccessToken } from '../lib/auth';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  country: string;
  acceptTerms: boolean;
}

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countries: Country[] = [
  { code: 'RU', name: 'Россия', flag: '🇷🇺' },
  { code: 'BY', name: 'Беларусь', flag: '🇧🇾' },
  { code: 'KZ', name: 'Казахстан', flag: '🇰🇿' },
  { code: 'US', name: 'США', flag: '🇺🇸' },
  { code: 'CA', name: 'Канада', flag: '🇨🇦' },
  { code: 'GB', name: 'Соединённое Королевство', flag: '🇬🇧' },
  { code: 'DE', name: 'Германия', flag: '🇩🇪' },
  { code: 'FR', name: 'Франция', flag: '🇫🇷' },
  { code: 'IT', name: 'Италия', flag: '🇮🇹' },
  { code: 'ES', name: 'Испания', flag: '🇪🇸' },
  { code: 'NL', name: 'Нидерланды', flag: '🇳🇱' },
  { code: 'SE', name: 'Швеция', flag: '🇸🇪' },
  { code: 'CH', name: 'Швейцария', flag: '🇨🇭' },
  { code: 'AU', name: 'Австралия', flag: '🇦🇺' },
  { code: 'JP', name: 'Япония', flag: '🇯🇵' },
  { code: 'SG', name: 'Сингапур', flag: '🇸🇬' },
  { code: 'HK', name: 'Гонконг', flag: '🇭🇰' },
  { code: 'BR', name: 'Бразилия', flag: '🇧🇷' },
  { code: 'MX', name: 'Мексика', flag: '🇲🇽' },
  { code: 'IN', name: 'Индия', flag: '🇮🇳' },
];

const steps = [
  { id: 1, title: 'Email и пароль', description: 'Создайте учётную запись' },
  { id: 2, title: 'Личные данные', description: 'Расскажите о себе' },
  { id: 3, title: 'Подтверждение', description: 'Завершение регистрации' }
];

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedCountry = countries.find((c) => c.code === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none text-left flex items-center justify-between hover:border-gray-600 transition-colors"
      >
        <span className="flex items-center gap-3">
          {selectedCountry ? (
            <>
              <span className="text-xl" style={{ fontFamily: '"Segoe UI Symbol"' }}>{selectedCountry.flag}</span>
              <span>{selectedCountry.name}</span>
            </>
          ) : (
            <span className="text-gray-400">Выберите страну</span>
          )}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => {
                onChange(country.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-700 transition-colors ${
                value === country.code ? 'bg-purple-500/20 border-l-2 border-purple-400' : ''
              }`}
            >
              <span className="text-xl" style={{ fontFamily: '"Segoe UI Symbol"' }}>{country.flag}</span>
              <span className="text-white">{country.name}</span>
              {value === country.code && <span className="ml-auto text-purple-400">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RegisterPage() {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await ensureValidAccessToken();
      if (token) {
        window.location.href = '/account';
      }
    };
    checkAuth();
  }, []);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    country: '',
    acceptTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContinue = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!formData.acceptTerms) {
        throw new Error('You must accept the terms and conditions');
      }

      const response = await api.post('/api/auth/register', {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        country: formData.country,
      });

      const { accessToken, refreshToken, expiresIn, tokenType } = response.data;
      
      // Save tokens to localStorage
      saveTokens({
        accessToken,
        refreshToken,
        expiresIn,
        tokenType,
      });

      // Redirect to home page
      window.location.href = '/';
    } catch (err) {
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
      setError(errorObj.response?.data?.message || errorObj.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-dark min-h-screen">
      <BackgroundEffects />
      <div className="relative z-10">
        <main className="min-h-screen flex items-center justify-center py-10 px-6">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-12">
              <Moon />
              <h1 className="text-4xl font-bold text-white mt-4">
                Moonlume
                <br/>
              </h1>
              <h1 className='mt-2 text-4xl text-white'>
                Регистрация
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Left side - Steps */}
              <div className="md:col-span-1">
                <div className="space-y-4">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`p-4 rounded-lg transition-all ${
                        currentStep === step.id
                          ? 'bg-purple-500/30 ring-2 ring-purple-400'
                          : currentStep > step.id
                          ? 'bg-green-500/20'
                          : 'bg-gray-800/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            currentStep >= step.id
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-700 text-gray-400'
                          }`}
                        >
                          {currentStep > step.id ? '✓' : step.id}
                        </div>
                        <div className="text-left">
                          <p className="text-white font-semibold text-sm">{step.title}</p>
                          <p className="text-gray-400 text-xs">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Form */}
              <div className="md:col-span-3">
                <div className="bg-dark/80 ring-1 ring-white/5 rounded-2xl p-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    {currentStep === 1 && (
                      <>
                        <h2 className="text-xl font-bold text-white mb-6">Email и пароль</h2>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Пароль</label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none"
                            placeholder="Минимум 8 символов"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Подтвердите пароль</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none"
                            placeholder="Повторите пароль"
                            required
                          />
                        </div>
                      </>
                    )}

                    {currentStep === 2 && (
                      <>
                        <h2 className="text-xl font-bold text-white mb-6">Личные данные</h2>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Имя</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none"
                            placeholder="Ваше имя"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Фамилия</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none"
                            placeholder="Ваша фамилия"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Страна</label>
                          <CountrySelect
                            value={formData.country}
                            onChange={(countryCode) =>
                              setFormData((prev) => ({
                                ...prev,
                                country: countryCode
                              }))
                            }
                          />
                        </div>
                      </>
                    )}

                    {currentStep === 3 && (
                      <>
                        <h2 className="text-xl font-bold text-white mb-6">Подтверждение</h2>
                        <div className="bg-gray-800/30 rounded-lg p-4 mb-6 border border-gray-700">
                          <p className="text-gray-300 text-sm mb-3">
                            <span className="font-semibold text-white">Email:</span> {formData.email}
                          </p>
                          <p className="text-gray-300 text-sm mb-3">
                            <span className="font-semibold text-white">Имя:</span> {formData.firstName} {formData.lastName}
                          </p>
                          <p className="text-gray-300 text-sm">
                            <span className="font-semibold text-white">Страна:</span>{' '}
                            {formData.country ? (
                              <span>
                                <span style={{ fontFamily: '"Segoe UI Symbol"' }}>{countries.find((c) => c.code === formData.country)?.flag}</span>{' '}
                                {countries.find((c) => c.code === formData.country)?.name}
                              </span>
                            ) : (
                              'Не выбрана'
                            )}
                          </p>
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleInputChange}
                            className="mt-1 w-4 h-4 rounded"
                            required
                          />
                          <span className="text-gray-300 text-sm">
                            Я согласен с <a href="#" className="text-purple-400 underline">условиями использования</a> и{' '}
                            <a href="#" className="text-purple-400 underline">политикой конфиденциальности</a>
                          </span>
                        </label>
                      </>
                    )}

                    <div className="flex gap-3 mt-8 pt-6 border-t border-gray-700">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className="flex-1 glass-button py-2 rounded-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Назад
                      </button>
                      {currentStep < steps.length ? (
                        <button
                          type="button"
                          onClick={handleContinue}
                          className="flex-1 btn-gradient py-2 rounded-full text-white font-semibold"
                        >
                          Далее
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 btn-gradient py-2 rounded-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Подождите...' : 'Создать аккаунт'}
                        </button>
                      )}
                    </div>

                    <p className="text-center text-gray-400 text-sm mt-4">
                      Уже есть аккаунт?{' '}
                      <a
                        href="/login"
                        className="text-purple-400 underline hover:text-purple-300"
                      >
                        Войти
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
