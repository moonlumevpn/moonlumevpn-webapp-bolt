import React from 'react';
import { Clock } from 'lucide-react';
import { daysBetween } from '../lib/dates';

type Props = {
  endDate?: string;
};

export default function EndDateCard({ endDate }: Props) {
  const daysLeft = daysBetween(new Date().toISOString(), endDate);
  const isExpiringSoon = daysLeft !== undefined && daysLeft <= 7;

  return (
    <div className={`glass-card rounded-2xl p-6 text-white flex flex-col justify-between h-full border ${isExpiringSoon ? 'border-red-500/50 bg-red-900/20' : 'border-gray-600'}`}>
      <div className="flex items-center gap-2 mb-2">
        <Clock className={`w-6 h-6 ${isExpiringSoon ? 'text-red-400' : 'text-gray-400'}`} strokeWidth={2.5} />
        <h4 className="font-semibold">Дата отключения</h4>
      </div>
      <div className="flex-grow">
        <p>{endDate ? new Date(endDate).toLocaleDateString() : '—'}</p>
        {daysLeft !== undefined && <p>Осталось дней: {daysLeft}</p>}
      </div>
    </div>
  );
}
