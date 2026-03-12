import React from 'react';
import { Package, List, Cloud, DollarSign } from 'lucide-react';
import { daysBetween } from '../lib/dates';

// new properties added for plan display
export type TariffCardProps = {
  name: string;
  price: string | number;
  startDate?: string;
  endDate?: string;
  features?: string; // semicolon delim list
  bandwidth?: string;
  onClick?: () => void;
};

export default function TariffCard({
  name,
  price,
  startDate,
  endDate,
  features,
  bandwidth,
  onClick,
}: TariffCardProps) {
  const totalDays = daysBetween(startDate, endDate);

  const containerClasses = `glass-card rounded-2xl p-6 text-white flex flex-col border border-blue-500/50 bg-blue-900/20 transition-transform ${
    onClick ? 'cursor-pointer hover:scale-105' : ''
  }`;

  const Content = (
    <div className={containerClasses} onClick={onClick}>
      <div className="flex items-center gap-2 mb-2">
        <Package className="w-6 h-6 text-blue-400" strokeWidth={2.5} />
        <h2 className="font-semibold">{name}</h2>
      </div>
      <div className="space-y-1">
        <p className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-green-400" />
          <span>Стоимость: {typeof price === 'number' ? `$${price}` : price}</span>
        </p>
        {features && (
          <div className="flex items-start gap-2">
            <ul className="list-disc list-inside space-y-1">
              {features.split(';').map((feat, i) => (
                <li key={i} className="text-gray-300 flex items-center gap-1">      
                    <List className="w-4 h-4 text-purple-400 mt-1" />
                    {feat.trim()}
                </li>
              ))}
            </ul>
          </div>
        )}
        {bandwidth && (
          <p className="flex items-center gap-1">
            <Cloud className="w-4 h-4 text-cyan-400" />
            <span>Трафик: {bandwidth}</span>
          </p>
        )}
        {totalDays !== undefined && <p>Количество дней: {totalDays}</p>}
        {startDate && <p>Дата подключения: {new Date(startDate).toLocaleDateString()}</p>}
      </div>
    </div>
  );

  // when there's no onClick, just render static div
  return Content;
}
