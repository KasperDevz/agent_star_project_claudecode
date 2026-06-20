/* data.js — all program data + copy. Single source of truth for the app. */
window.DATA = (function () {
  const TIERS = [
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

  const REWARDS = [
    { id: 'gc500',  title: 'Gift Voucher',      sub: '฿5,000 Central Mall',  stars: 250,  category: 'Vouchers', tag: 'Popular' },
    { id: 'gc1k',   title: 'Gift Voucher',      sub: '฿10,000 Central Mall', stars: 500,  category: 'Vouchers' },
    { id: 'airpods',title: 'Wireless Buds',     sub: 'Premium audio',         stars: 450,  category: 'Gadgets' },
    { id: 'tablet', title: 'Tablet 11"',        sub: 'Field sales kit',       stars: 900,  category: 'Gadgets', tag: 'New' },
    { id: 'hotel',  title: 'Hotel Stay',        sub: '2 nights, Hua Hin',     stars: 800,  category: 'Travel' },
    { id: 'flight', title: 'Flight Voucher',    sub: 'Domestic, any route',   stars: 650,  category: 'Travel' },
    { id: 'course', title: 'Training Course',   sub: 'Ceramic Engineering',   stars: 350,  category: 'Learning' },
    { id: 'cert',   title: 'Pro Certification', sub: 'Refractory Specialist', stars: 550,  category: 'Learning' },
    { id: 'jacket', title: 'Field Jacket',      sub: 'Branded, insulated',    stars: 180,  category: 'Gear' },
    { id: 'tools',  title: 'Tool Kit',          sub: 'Professional grade',    stars: 320,  category: 'Gear' },
    { id: 'dinner', title: 'Dinner for Two',    sub: 'Fine dining, BKK',      stars: 400,  category: 'Experiences' },
    { id: 'car',    title: 'Weekend Car',       sub: '3-day luxury rental',   stars: 1100, category: 'Experiences', tag: 'Limited' },
  ];

  const AGENT = {
    name: 'Siriwan Thongchai', id: 'SR-2847', region: 'Central Thailand',
    avatar: 'ST', stars: 847, lifetimeStars: 2140, currentTierIndex: 2,
    monthGain: 102, joined: 'Mar 2023',
    ytdSales: '฿18.4M', ytdTonnage: '142.8 t', ytdOrders: 87,
    rank: 12, totalAgents: 184,
  };

  const ACTIVITY = [
    { id: 1, type: 'order', title: 'Order #4821 delivered',    meta: 'Thai Ceramic Co. · 24.5 t', stars: 45,   when: '2h ago' },
    { id: 2, type: 'bonus', title: 'Monthly performance bonus', meta: 'Top 15 nationwide',         stars: 25,   when: 'Yesterday' },
    { id: 3, type: 'order', title: 'Order #4817 delivered',    meta: 'Siam Steel Works · 18 t',   stars: 32,   when: '3d ago' },
    { id: 4, type: 'claim', title: 'Claimed: Training Course',  meta: 'Ceramic Engineering',       stars: -350, when: '1w ago' },
    { id: 5, type: 'order', title: 'Order #4802 delivered',    meta: 'Chonburi Glass Ltd. · 31 t',stars: 58,   when: '1w ago' },
    { id: 6, type: 'tier',  title: 'Reached Gold tier',         meta: 'Kiln rank unlocked',        stars: 0,    when: '3w ago' },
  ];

  const LEADERBOARD = [
    { rank: 1,  name: 'Anusorn Wattana',   region: 'North',   stars: 1842 },
    { rank: 2,  name: 'Preecha Ruangsri',  region: 'East',    stars: 1721 },
    { rank: 3,  name: 'Malee Srisuwan',    region: 'South',   stars: 1556 },
    { rank: 4,  name: 'Chaiwat Phum',      region: 'Central', stars: 1289 },
    { rank: 5,  name: 'Nuttakit Somsak',   region: 'North',   stars: 1104 },
    { rank: 12, name: 'Siriwan Thongchai', region: 'Central', stars: 847, me: true },
  ];

  return { TIERS, REWARDS, AGENT, ACTIVITY, LEADERBOARD };
})();
