export interface Tier {
  key: string;
  name: string;
  stars: number;
  sub: string;
  desc: string;
  perks: string[];
}

export interface Reward {
  id: string;
  title: string;
  sub: string;
  stars: number;
  category: string;
  tag?: string;
}

export interface Agent {
  name: string;
  id: string;
  region: string;
  avatar: string;
  stars: number;
  lifetimeStars: number;
  currentTierIndex: number;
  monthGain: number;
  joined: string;
  ytdSales: string;
  ytdTonnage: string;
  ytdOrders: number;
  rank: number;
  totalAgents: number;
}

export interface ActivityItem {
  id: number;
  type: 'order' | 'bonus' | 'claim' | 'tier';
  title: string;
  meta: string;
  stars: number;
  when: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  region: string;
  stars: number;
  me?: boolean;
}

export const TIERS: Tier[] = [
  { key: 'bronze',   name: 'Bronze',   stars: 0,    sub: 'Foundry',
    desc: 'Entry tier for all newly onboarded agents. Build your foundation.',
    perks: ['Welcome kit', 'Basic rewards', 'Digital badge'] },
  { key: 'silver',   name: 'Silver',   stars: 250,  sub: 'Forge',
    desc: 'Proven performers. Unlocks priority support and a broader reward catalog.',
    perks: ['Priority support', 'Extended catalog', 'Team shout-out'] },
  { key: 'gold',     name: 'Gold',     stars: 600,  sub: 'Kiln',
    desc: 'Recognized top performers. Travel rewards, exclusive gear, double-star month.',
    perks: ['Travel rewards', 'Exclusive gear', '2× bonus month'] },
  { key: 'platinum', name: 'Platinum', stars: 1200, sub: 'Crucible',
    desc: 'Elite tier. Annual retreats, premium training, a dedicated account manager.',
    perks: ['Annual retreat', 'Premium training', 'Dedicated manager'] },
  { key: 'diamond',  name: 'Diamond',  stars: 2500, sub: 'Master',
    desc: 'The pinnacle. Global incentive trips, custom rewards, executive mentorship, lifetime status.',
    perks: ['Global incentive trip', 'Custom rewards', 'Executive mentor', 'Lifetime status'] },
];

export const REWARDS: Reward[] = [
  { id: 'gc500',   title: 'Gift Voucher',      sub: '฿5,000 Central Mall',  stars: 250,  category: 'Vouchers', tag: 'Popular' },
  { id: 'gc1k',    title: 'Gift Voucher',      sub: '฿10,000 Central Mall', stars: 500,  category: 'Vouchers' },
  { id: 'airpods', title: 'Wireless Buds',     sub: 'Premium audio',         stars: 450,  category: 'Gadgets' },
  { id: 'tablet',  title: 'Tablet 11"',        sub: 'Field sales kit',       stars: 900,  category: 'Gadgets', tag: 'New' },
  { id: 'hotel',   title: 'Hotel Stay',        sub: '2 nights, Hua Hin',     stars: 800,  category: 'Travel' },
  { id: 'flight',  title: 'Flight Voucher',    sub: 'Domestic, any route',   stars: 650,  category: 'Travel' },
  { id: 'course',  title: 'Training Course',   sub: 'Ceramic Engineering',   stars: 350,  category: 'Learning' },
  { id: 'cert',    title: 'Pro Certification', sub: 'Refractory Specialist', stars: 550,  category: 'Learning' },
  { id: 'jacket',  title: 'Field Jacket',      sub: 'Branded, insulated',    stars: 180,  category: 'Gear' },
  { id: 'tools',   title: 'Tool Kit',          sub: 'Professional grade',    stars: 320,  category: 'Gear' },
  { id: 'dinner',  title: 'Dinner for Two',    sub: 'Fine dining, BKK',      stars: 400,  category: 'Experiences' },
  { id: 'car',     title: 'Weekend Car',       sub: '3-day luxury rental',   stars: 1100, category: 'Experiences', tag: 'Limited' },
];

export const INITIAL_AGENT: Agent = {
  name: 'Siriwan Thongchai', id: 'SR-2847', region: 'Central Thailand',
  avatar: 'ST', stars: 847, lifetimeStars: 2140, currentTierIndex: 2,
  monthGain: 102, joined: 'Mar 2023',
  ytdSales: '฿18.4M', ytdTonnage: '142.8 t', ytdOrders: 87,
  rank: 12, totalAgents: 184,
};

export const ACTIVITY: ActivityItem[] = [
  { id: 1, type: 'order', title: 'Order #4821 delivered',    meta: 'Thai Ceramic Co. · 24.5 t', stars: 45,   when: '2h ago' },
  { id: 2, type: 'bonus', title: 'Monthly performance bonus', meta: 'Top 15 nationwide',         stars: 25,   when: 'Yesterday' },
  { id: 3, type: 'order', title: 'Order #4817 delivered',    meta: 'Siam Steel Works · 18 t',   stars: 32,   when: '3d ago' },
  { id: 4, type: 'claim', title: 'Claimed: Training Course',  meta: 'Ceramic Engineering',       stars: -350, when: '1w ago' },
  { id: 5, type: 'order', title: 'Order #4802 delivered',    meta: 'Chonburi Glass Ltd. · 31 t', stars: 58,  when: '1w ago' },
  { id: 6, type: 'tier',  title: 'Reached Gold tier',         meta: 'Kiln rank unlocked',        stars: 0,    when: '3w ago' },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1,  name: 'Anusorn Wattana',   region: 'North',   stars: 1842 },
  { rank: 2,  name: 'Preecha Ruangsri',  region: 'East',    stars: 1721 },
  { rank: 3,  name: 'Malee Srisuwan',    region: 'South',   stars: 1556 },
  { rank: 4,  name: 'Chaiwat Phum',      region: 'Central', stars: 1289 },
  { rank: 5,  name: 'Nuttakit Somsak',   region: 'North',   stars: 1104 },
  { rank: 12, name: 'Siriwan Thongchai', region: 'Central', stars: 847, me: true },
];

export const NAV = [
  { key: 'dashboard',   label: 'Dashboard',    short: 'Home',     icon: 'home' },
  { key: 'roadmap',     label: 'Tier Roadmap', short: 'Tiers',    icon: 'map' },
  { key: 'redeem',      label: 'Redemption',   short: 'Rewards',  icon: 'gift' },
  { key: 'history',     label: 'Activity',     short: 'Activity', icon: 'history' },
  { key: 'leaderboard', label: 'Leaderboard',  short: 'Ranks',    icon: 'trophy' },
  { key: 'profile',     label: 'Profile',      short: 'Profile',  icon: 'user' },
] as const;

export type NavKey = typeof NAV[number]['key'];
