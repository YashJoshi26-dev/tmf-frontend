import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, Search, Heart, User } from 'lucide-react';
import { cn } from '@/utils/cn';

const items = [
  { to: '/',                    label: 'Home',     icon: Home },
  { to: '/collections',         label: 'Shop',     icon: LayoutGrid },
  { to: '/search',              label: 'Search',   icon: Search },
  { to: '/account/wishlist',    label: 'Wishlist', icon: Heart },
  { to: '/account',             label: 'Account',  icon: User },
];

export const MobileBottomNav = () => (
  <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-brand-cream pb-[env(safe-area-inset-bottom)]">
    <div className="grid grid-cols-5">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => cn(
            'flex flex-col items-center justify-center py-2.5 text-[10px] tracking-wider uppercase',
            isActive ? 'text-brand-maroon' : 'text-brand-muted'
          )}
        >
          <Icon size={20} strokeWidth={1.75} />
          <span className="mt-1">{label}</span>
        </NavLink>
      ))}
    </div>
  </nav>
);
