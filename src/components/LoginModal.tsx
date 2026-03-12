import { X } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: Props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted', { login, password });
    // TODO: call API, show errors, redirect on success
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-md bg-dark rounded-2xl p-6 ring-1 ring-white/5">
        <button
          className="absolute top-4 right-4 text-gray-300"
          onClick={onClose}
          aria-label="Close"
        >
          <X />
        </button>

        <h3 className="text-2xl font-bold text-white mb-4">Войти</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Логин</label>
            <input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
              placeholder="Email или логин"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Пароль</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
              placeholder="Пароль"
              required
            />
          </div>

          <button className="w-full btn-gradient py-2 rounded-full text-white font-semibold">Войти</button>

          <div className="flex items-center gap-3">
            <button type="button" className="flex-1 glass-button py-2 rounded-full text-white">
              Войти через Telegram
            </button>
            <button type="button" className="text-sm text-gray-300 underline" onClick={() => { /* TODO: navigate to register */ }}>
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
