import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ChevronDown, LogOut, User, Settings, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/startups', label: 'Startups' },
  { to: '/submit', label: 'Submit' },
];

export default function Navbar() {
  const { user, logout, isAdmin, isReviewer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isTransparent ? 'transparent' : '#fff',
        boxShadow: isTransparent ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield size={24} style={{ color: '#1A6B3A' }} />
            <span style={{ color: isTransparent ? '#fff' : '#1A6B3A' }}>Formidable</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? isTransparent
                        ? 'text-white bg-white/10'
                        : 'text-green-700 bg-green-50'
                      : isTransparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  style={isTransparent ? { color: '#fff' } : {}}
                >
                  <Avatar src={user.avatar} name={user.name} size="sm" />
                  <span className="text-sm font-medium max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown size={14} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block"
                        style={{ backgroundColor: '#F0FDF4', color: '#1A6B3A' }}
                      >
                        {user.role}
                      </span>
                    </div>
                    {(isAdmin || isReviewer) && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LayoutDashboard size={15} /> Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/submit"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={15} /> Submit Startup
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                  style={
                    isTransparent
                      ? { color: '#fff' }
                      : { color: '#1A6B3A' }
                  }
                >
                  Sign In
                </Link>
                <Link
                  to="/submit"
                  className="px-4 py-2 text-sm font-medium rounded-lg text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#1A6B3A' }}
                >
                  Submit Startup
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: isTransparent ? '#fff' : '#374151' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <div className="px-4 py-2 border-t border-gray-100 mt-2">
                  <div className="flex items-center gap-2">
                    <Avatar src={user.avatar} name={user.name} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>
                </div>
                {(isAdmin || isReviewer) && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <LayoutDashboard size={15} /> Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50"
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2">
                <Link
                  to="/login"
                  className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/submit"
                  className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium text-white"
                  style={{ backgroundColor: '#1A6B3A' }}
                >
                  Submit
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
