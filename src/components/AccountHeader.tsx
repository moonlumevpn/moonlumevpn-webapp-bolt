import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clearTokens, getUserName } from '../lib/auth';

interface AccountHeaderProps {
  balance?: string | number;
}

export default function AccountHeader({ balance = '0.00' }: AccountHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userName = getUserName() || 'Аккаунт';

  const handleLogout = () => {
    clearTokens();
    window.location.href = '/';
  };

  return (
    <header className="bg-dark/80 border-b border-purple-500/20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => (window.location.href = '/')}
        >
          <span className="text-3xl">🌙</span>
          <span className="text-2xl font-bold text-white">
            Moonlume <span className="text-purple-400">VPN</span>
          </span>
        </div>

        <div className="flex items-center space-x-4 relative">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
            Баланс: {balance}
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg"
            >
              <span>{userName}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
