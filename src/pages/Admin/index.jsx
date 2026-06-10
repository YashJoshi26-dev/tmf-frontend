import { NavLink, Outlet, Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutDashboard, Package, ShoppingBag, Tag, RefreshCw, Users, FolderTree, ImageIcon, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { selectIsAdmin, selectIsAuthed, selectUser, logout } from '@/features/auth/authSlice';
import { cn } from '@/utils/cn';

// Simple inline brand mark — no external dependency.
// If you've installed the brand kit, replace this with: import { LogoMark } from '@/components/brand/Logo';
const LogoMark = ({ className }) => (
  <svg viewBox="0 0 240 280" fill="none" className={className} aria-hidden="true">
    <path d="M 120 30 C 165 35, 195 75, 200 125 C 203 165, 188 200, 168 225 C 158 240, 148 250, 138 258 C 132 252, 128 240, 130 225 C 135 195, 155 175, 170 155 C 180 140, 185 120, 178 100 C 170 80, 150 70, 130 75 C 122 77, 115 82, 110 88"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 138 258 C 135 252, 134 245, 136 238 C 138 230, 144 222, 152 215"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M 120 30 C 118 25, 122 22, 125 25 C 128 28, 126 32, 120 30 Z" fill="currentColor" />
    <circle cx="120" cy="29" r="1.8" fill="currentColor" />
  </svg>
);

const NAV = [
  { to: '/admin',           label: 'Dashboard',  icon: LayoutDashboard, end: true },
  { to: '/admin/orders',    label: 'Orders',     icon: ShoppingBag },
  { to: '/admin/products',  label: 'Products',   icon: Package },
  { to: '/admin/categories',label: 'Categories', icon: FolderTree },
  { to: '/admin/sync',      label: 'CSV / Sync', icon: RefreshCw },
  { to: '/admin/coupons',   label: 'Coupons',    icon: Tag },
  { to: '/admin/banners',   label: 'Banners',    icon: ImageIcon },
  { to: '/admin/customers', label: 'Customers',  icon: Users },
];

export default function AdminLayout() {
  const authed = useSelector(selectIsAuthed);
  const isAdmin = useSelector(selectIsAdmin);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  if (!authed)  return <Navigate to="/auth/login?next=/admin" replace />;
  if (!isAdmin) return (
    <div className="container-x py-20 text-center">
      <h2 className="font-serif text-2xl">Access denied</h2>
      <p className="text-brand-muted mt-2">This area is for store administrators only.</p>
      <Link to="/" className="btn-outline mt-6 inline-flex">Back to store</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-ivory">
      <div className="grid md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="bg-white md:border-r border-brand-cream md:min-h-screen p-5 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-2 mb-8">
            <LogoMark className="w-7 h-8 text-brand-gold" />
            <div className="leading-none">
              <div className="font-serif text-lg tracking-wider text-brand-maroon">MAHARAJA</div>
              <div className="text-[9px] tracking-[0.3em] text-brand-gold">A D M I N</div>
            </div>
          </Link>

          <nav className="flex flex-col space-y-1">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to} to={to} end={end}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-colors',
                  isActive
                    ? 'bg-brand-maroon text-white'
                    : 'text-brand-charcoal hover:bg-brand-cream'
                )}
              >
                <Icon size={16} /> {label}
              </NavLink>
            ))}
          </nav>

          {/* User footer */}
          <div className="absolute md:relative mt-10 pt-5 border-t border-brand-cream">
            <p className="text-xs text-brand-muted">Signed in as</p>
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-brand-muted truncate">{user?.email}</p>
            <div className="flex gap-2 mt-3">
              <Link to="/" className="flex-1 btn-ghost text-xs justify-center">Store</Link>
              <button
                onClick={() => dispatch(logout())}
                className="flex-1 btn-ghost text-xs justify-center"
              >
                <LogOut size={12} className="mr-1" /> Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
