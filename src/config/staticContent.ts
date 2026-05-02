export interface Plan {
  id: string;
  name: string;
  code: string;
  startPrice: number;
  currency: string;
  isPopular: boolean;
  features: string[];
}

export const STATIC_PLANS: Plan[] = [
  {
    id: 'BASIC-0',
    name: 'Базовый',
    code: 'BASIC',
    startPrice: 79,
    currency: 'RUB',
    isPopular: true,
    features: [
      'До 5 устройств',
      'Доступ ко всем сайтам',
      'Шифрование трафика',
      'Защита в публичных сетях',
      'Базовая поддержка',
    ],
  },
  {
    id: 'PREMIUM-1',
    name: 'Премиум',
    code: 'PREMIUM',
    startPrice: 179,
    currency: 'RUB',
    isPopular: false,
    features: [
      'До 6 устройств',
      'Доступ ко всем сайтам',
      'Защита в публичных сетях',
      'Усиленное шифрование',
      'Приоритетная поддержка',
    ],
  },
  {
    id: 'UNLIMITED-2',
    name: 'Безлимит',
    code: 'UNLIMITED',
    startPrice: 299,
    currency: 'RUB',
    isPopular: false,
    features: [
      'До 7 устройств',
      'Доступ ко всем сайтам',
      'Защита в публичных сетях',
      'VIP поддержка',
    ],
  },
];
