import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut } from 'lucide-react';
import { selectUser, logout } from '@/features/auth/authSlice';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Seo } from '@/components/common/Seo';
import { cn } from '@/utils/cn';

const TABS = [
  { to: '/account/orders',    label: 'Orders' },
  { to: '/account/wishlist',  label: 'Wishlist' },
  { to: '/account/addresses', label: 'Addresses' },
  { to: '/account/profile',   label: 'Profile' },
];

export default function AccountLayout() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <div className="container-x py-6 md:py-10">
      <Seo title="My Account" />
      <Breadcrumbs items={[{ label: 'Account' }]} />

      <div className="grid md:grid-cols-[260px_1fr] gap-10 mt-6">
        <aside>
          <div className="mb-6">
            <p className="text-sm text-brand-muted">Signed in as</p>
            <p className="font-serif text-xl">{user?.name || 'Guest'}</p>
            <p className="text-sm text-brand-muted">{user?.email}</p>
          </div>
          <nav className="flex flex-col">
            {TABS.map((t) => (
              <NavLink
                key={t.to} to={t.to} end
                className={({ isActive }) => cn(
                  'py-3 border-b border-brand-cream text-sm tracking-wide',
                  isActive ? 'text-brand-maroon font-medium' : 'text-brand-charcoal hover:text-brand-maroon'
                )}
              >{t.label}</NavLink>
            ))}
            <button onClick={doLogout} className="flex items-center gap-2 py-3 text-sm text-brand-muted hover:text-brand-maroon mt-2">
              <LogOut size={14} /> Sign out
            </button>
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
