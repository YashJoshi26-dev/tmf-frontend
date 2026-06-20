import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartCount } from '@/features/cart/cartSlice';
import { selectIsAuthed } from '@/features/auth/authSlice';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { Drawer } from '@/components/ui/Drawer';
import { cn } from '@/utils/cn';

const NAV = [
  { to: '/category/Sarees', label: 'Sarees' },
  // { to: '/category/Sarees/banarasi', label: 'Banarasi' },
  { to: '/category/Sarees/pashmina', label: 'Pashmina' },
  {
    to: '/category/Lehengas',
    label: 'Lehengas',
    sub: [
      { to: '/category/Lehengas/Sidel Lehenga', label: 'Sidel Lehenga' },
      { to: '/category/Lehengas/Bridal Lehenga', label: 'Bridal Lehenga' },
    ],
  },
  { to: '/bridal', label: 'Bridal Sarees' },
  { to: '/category/rajputani', label: 'Rajputani' },
];

const POPULAR = ['Banarasi Silk', 'Bridal Sarees', 'Lehenga', 'Cotton Sarees', 'Party Wear'];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [mobileLehenga, setMobileLehenga] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const authed = useSelector(selectIsAuthed);
  const dir = useScrollDirection();
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      setSearchOpen(false);
      setQ('');
    }
  };

  const handleTag = (tag) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
    setSearchOpen(false);
    setQ('');
  };

  return (
    <>
      <header className={cn(
        'sticky top-0 z-30 bg-[#3D0C11] border-b border-white/10 transition-transform duration-300 shadow-lg',
        dir === 'down' ? '-translate-y-full md:translate-y-0' : 'translate-y-0',
      )}>
        <div className="container-x flex items-center justify-between h-14 md:h-16">

          {/* Mobile menu */}
          <button className="md:hidden text-white" onClick={() => setMobileOpen(true)} aria-label="Menu">
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/tmf_logo.png" alt="The Maharaja Fashion" className="h-10 md:h-12 w-auto object-contain" />
          </Link>

          {/* Desktop nav */}
          <nav ref={navRef} className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              n.sub ? (
                // Dropdown item
                <div
                  key={n.to}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => setDropdown(dropdown === n.to ? null : n.to)}
                    className={cn(
                      'text-sm tracking-wide text-white/80 hover:text-brand-gold transition-colors flex items-center gap-1'
                    )}
                  >
                    {n.label}
                    <ChevronDown size={13} className={cn('transition-transform', dropdown === n.to && 'rotate-180')} />
                  </button>

                  {/* Dropdown menu */}
                  {dropdown === n.to && (
                    <div className="absolute top-full left-0 mt-1 bg-white shadow-lg border border-brand-cream rounded-lg overflow-hidden min-w-[180px] z-50">
                      <Link
                        to={n.to}
                        className="block px-4 py-2.5 text-sm text-brand-charcoal hover:bg-brand-cream hover:text-brand-maroon transition-colors border-b border-brand-cream"
                        onClick={() => setDropdown(null)}
                      >
                        All Lehengas
                      </Link>
                      {n.sub.map((s) => (
                        <Link
                          key={s.to}
                          to={s.to}
                          className="block px-4 py-2.5 text-sm text-brand-charcoal hover:bg-brand-cream hover:text-brand-maroon transition-colors"
                          onClick={() => setDropdown(null)}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink key={n.to} to={n.to}
                  className={({ isActive }) => cn(
                    'text-sm tracking-wide text-white/80 hover:text-brand-gold transition-colors',
                    isActive && 'text-brand-gold'
                  )}
                >{n.label}</NavLink>
              )
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-5 text-white">
            <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            <Link to={authed ? '/account' : '/auth/login'} aria-label="Account" className="hidden sm:inline">
              <User size={20} />
            </Link>
            <Link to="/account/wishlist" aria-label="Wishlist" className="hidden sm:inline">
              <Heart size={20} />
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Inline Search Bar */}
        {searchOpen && (
          <div className="border-t border-white/10 bg-[#3D0C11] px-4 py-4">
            <form onSubmit={submitSearch} className="container-x">
              <div className="relative max-w-2xl mx-auto">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search sarees, lehengas, bridal…"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-brand-gold rounded-lg"
                />
                {q && (
                  <button type="button" onClick={() => setQ('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3 max-w-2xl mx-auto">
                {POPULAR.map((tag) => (
                  <button key={tag} type="button" onClick={() => handleTag(tag)}
                    className="px-3 py-1 text-xs border border-white/20 rounded-full text-white/60 hover:border-brand-gold hover:text-brand-gold transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </div>
        )}
      </header>

      {/* Mobile nav drawer */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} title="Menu" side="left">
        <nav className="flex flex-col">
          {NAV.map((n) => (
            n.sub ? (
              <div key={n.to}>
                <button
                  onClick={() => setMobileLehenga(!mobileLehenga)}
                  className="w-full flex items-center justify-between px-6 py-4 border-b border-brand-cream text-lg"
                >
                  {n.label}
                  <ChevronDown size={16} className={cn('transition-transform', mobileLehenga && 'rotate-180')} />
                </button>
                {mobileLehenga && (
                  <div className="bg-brand-cream/30">
                    <Link to={n.to} onClick={() => setMobileOpen(false)}
                      className="block px-10 py-3 border-b border-brand-cream text-sm">
                      All Lehengas
                    </Link>
                    {n.sub.map((s) => (
                      <Link key={s.to} to={s.to} onClick={() => setMobileOpen(false)}
                        className="block px-10 py-3 border-b border-brand-cream text-sm">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink key={n.to} to={n.to} onClick={() => setMobileOpen(false)}
                className="px-6 py-4 border-b border-brand-cream text-lg">
                {n.label}
              </NavLink>
            )
          ))}
          <NavLink to="/wholesale" onClick={() => setMobileOpen(false)} className="px-6 py-4 border-b border-brand-cream text-lg">Wholesale</NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)} className="px-6 py-4 border-b border-brand-cream text-lg">About</NavLink>
          <NavLink to="/contact" onClick={() => setMobileOpen(false)} className="px-6 py-4 text-lg">Contact</NavLink>
        </nav>
      </Drawer>
    </>
  );
};