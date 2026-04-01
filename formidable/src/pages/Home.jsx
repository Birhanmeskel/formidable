import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  DollarSign,
  Sprout,
  Heart,
  BookOpen,
  Truck,
  ShoppingCart,
  Leaf,
  Building,
  TrendingUp,
  Users,
  Globe,
  ChevronRight,
} from 'lucide-react';
import { STARTUPS } from '../data/startups';
import { SECTORS } from '../data/sectors';
import StartupCard from '../components/startup/StartupCard';
import { formatUSD, formatNumber } from '../utils/formatters';

const SECTOR_ICONS = {
  DollarSign,
  Sprout,
  Heart,
  BookOpen,
  Truck,
  ShoppingCart,
  Leaf,
  Building,
};

// Animated count-up hook
function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatsBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const totalStartups = useCountUp(STARTUPS.length, 1200, visible);
  const totalFunding = useCountUp(
    Math.round(STARTUPS.reduce((s, st) => s + (st.funding.totalRaised.amount || 0), 0) / 1_000_000),
    1500,
    visible
  );
  const sectors = useCountUp(SECTORS.length, 800, visible);

  const STATS = [
    { value: totalStartups, suffix: '+', label: 'Startups Tracked', icon: Building, color: '#1A6B3A', bg: '#F0FDF4' },
    { value: `$${totalFunding}M`, label: 'Total Funding Raised', icon: TrendingUp, color: '#D4A017', bg: '#FFFBEB' },
    { value: sectors, label: 'Sectors Covered', icon: Globe, color: '#2563EB', bg: '#EFF6FF' },
  ];

  return (
    <div ref={ref} className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon size={22} style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {typeof stat.value === 'string' ? stat.value : stat.value}
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectorGrid() {
  const sectorCounts = SECTORS.map((s) => ({
    ...s,
    count: STARTUPS.filter((st) => st.sector === s.value).length,
  }));

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Explore by Sector</h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            From FinTech to CleanTech — discover Ethiopia's innovation across 8 key industries.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sectorCounts.map((sector) => {
            const Icon = SECTOR_ICONS[sector.icon] || Globe;
            return (
              <Link
                key={sector.value}
                to={`/startups?sector=${sector.value}`}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: sector.color + '18' }}
                >
                  <Icon size={22} style={{ color: sector.color }} />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm group-hover:text-gray-900">
                    {sector.label}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{sector.count} startups</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const featured = STARTUPS.filter((s) => s.isFeatured).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#0F1923' }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-0 right-0 bottom-0 opacity-5"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, #1A6B3A 0%, transparent 50%), radial-gradient(circle at 75% 75%, #D4A017 0%, transparent 50%)',
            }}
          />
          <div
            className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: '#1A6B3A' }}
          />
          <div
            className="absolute bottom-20 left-20 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: '#D4A017' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          {/* Pill badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
            style={{ backgroundColor: '#1A6B3A22', color: '#4ADE80', border: '1px solid #1A6B3A44' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Ethiopia's Leading Startup Intelligence Platform
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Discover Ethiopia's Most
            <br />
            <span style={{ color: '#D4A017' }}>Promising Startups</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Formidable is the definitive database of Ethiopian startups — with verified traction data, founder profiles, funding history, and real-time insights for investors and ecosystem builders.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/startups"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#1A6B3A' }}
            >
              Explore Startups <ArrowRight size={18} />
            </Link>
            <Link
              to="/submit"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-base border-2 border-white/30 hover:border-white/50 transition-colors"
            >
              Submit Your Startup
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users size={15} />
              <span>20+ verified startups</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-2">
              <TrendingUp size={15} />
              <span>$72M+ ecosystem funding</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-2">
              <Globe size={15} />
              <span>8 sectors tracked</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <StatsBar />

      {/* Featured Startups */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: '#1A6B3A' }}>
                Spotlight
              </p>
              <h2 className="text-3xl font-bold text-gray-900">Featured Startups</h2>
            </div>
            <Link
              to="/startups"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium hover:gap-2.5 transition-all"
              style={{ color: '#1A6B3A' }}
            >
              View all <ChevronRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featured.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/startups"
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: '#1A6B3A' }}
            >
              View all startups <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Sector grid */}
      <SectorGrid />

      {/* CTA section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="rounded-2xl p-12"
            style={{ backgroundColor: '#0F1923' }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to join Ethiopia's startup ecosystem?
            </h2>
            <p className="text-gray-400 mb-8 text-base max-w-lg mx-auto">
              Whether you're a founder looking for visibility, an investor seeking opportunities, or an ecosystem builder driving change — Formidable is your home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/startups"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#1A6B3A' }}
              >
                Explore Directory <ArrowRight size={16} />
              </Link>
              <Link
                to="/submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 border-white/20 text-white hover:border-white/40 transition-colors"
              >
                Submit Your Startup
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
