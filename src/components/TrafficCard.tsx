import React from 'react';
import { Download } from 'lucide-react';

type Props = {
  trafficUsedGB: number;
  trafficTotalGB: number;
  speedLimit?: string;
};

export default function TrafficCard({
  trafficUsedGB,
  trafficTotalGB,
  speedLimit,
}: Props) {
  const trafficLeft = Math.max(0, trafficTotalGB - trafficUsedGB);
  const usedPercent = Math.min(100, Math.round((trafficUsedGB / trafficTotalGB) * 100));
  const isHighUsage = usedPercent >= 80;

  return (
    <div className={`glass-card rounded-2xl p-6 text-white flex flex-col justify-between h-full border ${isHighUsage ? 'border-amber-500/50 bg-amber-900/20' : 'border-gray-600'}`}>
      <div className="flex items-center gap-2 mb-2">
        <Download className="w-6 h-6 text-amber-400" strokeWidth={2.5} />
        <h4 className="font-semibold">Трафик</h4>
      </div>
      <div className="flex-grow">
        <p>
          {trafficUsedGB} / {trafficTotalGB} GB
        </p>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-purple-500" style={{ width: `${usedPercent}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{usedPercent}%</span>
          <span>{trafficLeft} GB</span>
        </div>
        {speedLimit && (
          <div className="mt-2 text-sm text-gray-300">Скорость: {speedLimit}</div>
        )}
      </div>
    </div>
  );
}
