import { configureStore } from '@reduxjs/toolkit';
import auth from '@/features/auth/authSlice';
import cart from '@/features/cart/cartSlice';
import wishlist from '@/features/wishlist/wishlistSlice';

export const store = configureStore({
  reducer: { auth, cart, wishlist },
});
