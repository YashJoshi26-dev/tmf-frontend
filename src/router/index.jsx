import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FullPageLoader } from '@/components/common/Loader';
import { RequireAuth } from './RequireAuth';
import { Shipping, Privacy, Terms } from '@/pages/Static/Policy';

// ----- Lazy pages -----
const Home          = lazy(() => import('@/pages/Home'));
const Category      = lazy(() => import('@/pages/Category'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Cart          = lazy(() => import('@/pages/Cart'));
const Checkout      = lazy(() => import('@/pages/Checkout'));
const OrderSuccess  = lazy(() => import('@/pages/OrderSuccess'));
const OrderTrack    = lazy(() => import('@/pages/OrderTrack'));
const Search        = lazy(() => import('@/pages/Search'));
const Lookbook      = lazy(() => import('@/pages/Lookbook'));
const Wholesale     = lazy(() => import('@/pages/Wholesale'));
const NotFound      = lazy(() => import('@/pages/NotFound'));

// Auth
const Login    = lazy(() => import('@/pages/Auth/Login'));
const Register = lazy(() => import('@/pages/Auth/Register'));

// Account
const AccountLayout = lazy(() => import('@/pages/Account'));
const AccountOrders    = lazy(() => import('@/pages/Account/Orders'));
const AccountAddresses = lazy(() => import('@/pages/Account/Addresses'));
const AccountWishlist  = lazy(() => import('@/pages/Account/Wishlist'));
const AccountProfile   = lazy(() => import('@/pages/Account/Profile'));

// Static
const About    = lazy(() => import('@/pages/Static/About'));
const Contact  = lazy(() => import('@/pages/Static/Contact'));
const FAQ      = lazy(() => import('@/pages/Static/FAQ'));
const SizeGuide= lazy(() => import('@/pages/Static/SizeGuide'));

// Admin
// Admin
const AdminLayout     = lazy(() => import('@/pages/Admin'));
const AdminDashboard  = lazy(() => import('@/pages/Admin/Dashboard'));
const AdminOrders     = lazy(() => import('@/pages/Admin/Orders'));
const AdminProducts   = lazy(() => import('@/pages/Admin/Products'));
const AdminCategories = lazy(() => import('@/pages/Admin/Categories'));
const AdminSync       = lazy(() => import('@/pages/Admin/Sync'));
const AdminCoupons    = lazy(() => import('@/pages/Admin/Coupons'));
const AdminBanners    = lazy(() => import('@/pages/Admin/Banners'));
const AdminCustomers  = lazy(() => import('@/pages/Admin/Customers'));
export const AppRoutes = () => (
  <Suspense fallback={<FullPageLoader />}>
    <Routes>
      {/* Public */}
      <Route path="/"                       element={<Home />} />
      <Route path="/collections"            element={<Category />} />
      <Route path="/category/:cat"          element={<Category />} />
      <Route path="/category/:cat/:sub"     element={<Category />} />
      <Route path="/bridal"                 element={<Category />} /> {/* curated landing — same template */}
      <Route path="/product/:slug"          element={<ProductDetail />} />
      <Route path="/search"                 element={<Search />} />
      <Route path="/lookbook"               element={<Lookbook />} />
      <Route path="/cart"                   element={<Cart />} />
      <Route path="/wholesale"              element={<Wholesale />} />

      {/* Auth */}
      <Route path="/auth/login"             element={<Login />} />
      <Route path="/auth/register"          element={<Register />} />

      {/* Static */}
      <Route path="/about"                  element={<About />} />
      <Route path="/contact"                element={<Contact />} />
      <Route path="/faq"                    element={<FAQ />} />
      <Route path="/size-guide"             element={<SizeGuide />} />
      <Route path="/policy/shipping"        element={<Shipping />} />
     
      <Route path="/policy/privacy"         element={<Privacy />} />
      <Route path="/policy/terms"           element={<Terms />} />

      {/* Auth-required */}
      <Route path="/checkout"               element={<RequireAuth><Checkout /></RequireAuth>} />
      <Route path="/order/success/:orderId" element={<RequireAuth><OrderSuccess /></RequireAuth>} />
      <Route path="/order/track/:orderId"   element={<RequireAuth><OrderTrack /></RequireAuth>} />

      {/* Account */}
      <Route path="/account" element={<RequireAuth><AccountLayout /></RequireAuth>}>
        <Route index             element={<Navigate to="orders" replace />} />
        <Route path="orders"     element={<AccountOrders />} />
        <Route path="addresses"  element={<AccountAddresses />} />
        <Route path="wishlist"   element={<AccountWishlist />} />
        <Route path="profile"    element={<AccountProfile />} />
      </Route>

      {/* Admin */}
      {/* Admin */}
<Route path="/admin" element={<AdminLayout />}>
  <Route index               element={<AdminDashboard />} />
  <Route path="orders"       element={<AdminOrders />} />
  <Route path="products"     element={<AdminProducts />} />
  <Route path="categories"   element={<AdminCategories />} />
  <Route path="sync"         element={<AdminSync />} />
  <Route path="coupons"      element={<AdminCoupons />} />
  <Route path="banners"      element={<AdminBanners />} />
  <Route path="customers"    element={<AdminCustomers />} />
</Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);
