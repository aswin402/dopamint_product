export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  timeRemaining: string;
  category: 'Unlock' | 'Macro' | 'Mainnet' | 'Governance';
  impact: 'High' | 'Medium' | 'Low';
  amount?: string;
}

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal-1',
    title: 'Base Network v2.4 Fault Proofs Upgrade',
    date: 'Sep 3, 2026',
    timeRemaining: 'Tomorrow · 14:00 UTC',
    category: 'Mainnet',
    impact: 'High',
  },
  {
    id: 'cal-2',
    title: 'US Federal Reserve FOMC Rate Decision',
    date: 'Sep 5, 2026',
    timeRemaining: 'In 3 days · 18:30 UTC',
    category: 'Macro',
    impact: 'High',
  },
  {
    id: 'cal-3',
    title: 'Aerodrome & Degen Ecosystem Token Unlock',
    date: 'Sep 7, 2026',
    timeRemaining: 'In 5 days',
    category: 'Unlock',
    impact: 'Medium',
    amount: '$14.8M (3.2% supply)',
  },
  {
    id: 'cal-4',
    title: 'US CPI Headline Inflation Release',
    date: 'Sep 11, 2026',
    timeRemaining: 'In 9 days',
    category: 'Macro',
    impact: 'High',
  },
  {
    id: 'cal-5',
    title: 'Optimism Superchain Interop Protocol Launch',
    date: 'Sep 16, 2026',
    timeRemaining: 'In 14 days',
    category: 'Governance',
    impact: 'Medium',
  },
];
