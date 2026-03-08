import { useState, useEffect } from 'react';
import BackgroundEffects from '../components/BackgroundEffects';
import Moon from '../components/Moon';
import api from '../lib/api';
import { saveTokens, ensureValidAccessToken } from '../lib/auth';

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export default function LoginPage(){
  useEffect(() => {
    const checkAuth = async () => {
      const token = await ensureValidAccessToken();
      if (token) {
        window.location.href = '/account';
      }
    };
    checkAuth();
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post<SignInResponse>('/api/auth/signin', {
        email,
        password,
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
      const errorObj = err as { response?: { data?: { message?: string } } };
      setError(errorObj.response?.data?.message || 'Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-dark min-h-screen">
      <BackgroundEffects />
      <div className="relative z-10">
        {/* header intentionally omitted on login page */}

        <main className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className="w-full max-w-md">
            <div className="text-center animate-on-scroll opacity-0 translate-y-10">
              <Moon />
              <h2 className="text-3xl font-bold text-white mb-6">Moonlume</h2>
            </div>

            <div className="bg-dark/80 ring-1 ring-white/5 rounded-2xl p-6 mt-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                {error && (
                  <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none"
                    placeholder="user@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Пароль</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none"
                    placeholder="Пароль"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-gradient py-2 rounded-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Подождите...' : 'Войти'}
                  </button>
                  <button type="button" className="flex-1 btn-gradient py-2 rounded-full text-white flex items-center justify-center">
                    Войти через
                    {/* inline SVG for Telegram */}
                    <svg className="w-6 h-6 ml-2" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7225)" />
                        <path d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z" fill="white" />
                        <defs>
                          <linearGradient id="paint0_linear_87_7225" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#37BBFE" />
                            <stop offset="1" stopColor="#007DBB" />
                          </linearGradient>
                        </defs>
                      </g>
                    </svg>
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => (window.location.href = '/register')}
                    className="text-sm text-gray-300 underline hover:text-purple-400"
                  >
                    Зарегистрироваться
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
