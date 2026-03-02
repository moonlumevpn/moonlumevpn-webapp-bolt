import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

type Props = {
  status?: string;
};

export default function StatusCard({ status }: Props) {
  const isActive = status?.toLowerCase() === 'active' || status?.toLowerCase() === 'активен';
  
  return (
    <div className={`glass-card rounded-2xl p-6 text-white flex flex-col justify-between h-full border ${isActive ? 'border-emerald-500/50 bg-emerald-900/20' : 'border-gray-600 bg-gray-900/20'}`}>
      <div className="flex items-center gap-2 mb-2">
        {isActive ? (
          <CheckCircle className="w-6 h-6 text-emerald-400" strokeWidth={2.5} />
        ) : (
          <XCircle className="w-6 h-6 text-gray-400" strokeWidth={2.5} />
        )}
        <h4 className="font-semibold">Статус</h4>
      </div>
      <p className="flex-grow">{status || '—'}</p>
    </div>
  );
}
