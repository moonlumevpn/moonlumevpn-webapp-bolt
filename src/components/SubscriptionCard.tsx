import React from 'react';
import TariffCard from './TariffCard';
import StatusCard from './StatusCard';
import EndDateCard from './EndDateCard';
import TrafficCard from './TrafficCard';

// This component is kept for backwards compatibility. It simply renders
// the four individual cards inside a bordered container identical to the
// previous layout. You can still use the sub-components directly where
// needed.

type Props = {
  name: string;
  price: string | number;
  startDate?: string;
  status?: string;
  endDate?: string;
  trafficUsedGB: number;
  trafficTotalGB: number;
  speedLimit?: string;
};

export default function SubscriptionCard({
  name,
  price,
  startDate,
  status,
  endDate,
  trafficUsedGB,
  trafficTotalGB,
  speedLimit,
}: Props) {
  return (
    <div className="bg-dark/70 border border-gray-800 rounded-lg p-5 w-full max-w-2xl text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TariffCard
          name={name}
          price={price}
          startDate={startDate}
          endDate={endDate}
        />
        <StatusCard status={status} />
        <EndDateCard endDate={endDate} />
        <TrafficCard
          trafficUsedGB={trafficUsedGB}
          trafficTotalGB={trafficTotalGB}
          speedLimit={speedLimit}
        />
      </div>
    </div>
  );
}
