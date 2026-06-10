import { createSlice } from '@reduxjs/toolkit';
import { storage } from '@/utils/storage';

const CART_KEY = 'cart_v1';

// Cart line shape:
// { product, name, image, size, qty, price, mrp, color: {color,image}, style, productSubId }

const persisted = storage.get(CART_KEY, { items: [], couponCode: '', totalAfterDiscount: 0 });

const cartKey = (i) => `${i.product}::${i.productSubId || i.style || 0}::${i.size}`;

const recompute = (state) => {
  state.subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);
  state.itemCount = state.items.reduce((s, i) => s + i.qty, 0);
};

const slice = createSlice({
  name: 'cart',
  initialState: {
    items:      persisted.items || [],
    subtotal:   0,
    itemCount:  0,
    couponCode: persisted.couponCode || '',
    totalAfterDiscount: persisted.totalAfterDiscount || 0,
  },
  reducers: {
    addItem(state, { payload }) {
      const key = cartKey(payload);
      const existing = state.items.find((i) => cartKey(i) === key);
      if (existing) existing.qty += payload.qty || 1;
      else state.items.push({ ...payload, qty: payload.qty || 1 });
      recompute(state);
      persist(state);
    },
    removeItem(state, { payload }) {
      state.items = state.items.filter((i) => cartKey(i) !== payload);
      recompute(state);
      persist(state);
    },
    setQty(state, { payload }) {
      const item = state.items.find((i) => cartKey(i) === payload.key);
      if (item) item.qty = Math.max(1, payload.qty);
      recompute(state);
      persist(state);
    },
    clearCart(state) {
      state.items = []; state.couponCode = ''; state.totalAfterDiscount = 0;
      recompute(state);
      persist(state);
    },
    setCoupon(state, { payload }) {
      state.couponCode = payload.code;
      state.totalAfterDiscount = payload.totalAfterDiscount;
      persist(state);
    },
    /** Replace the cart wholesale — used after server reconciles prices on saveCart. */
    hydrateFromServer(state, { payload }) {
      state.items = (payload?.products || []).map((p) => ({
        product: p.product,
        name: p.name,
        image: p.image,
        size: p.size,
        qty: p.qty,
        price: p.price,
        mrp: p.priceBefore,
        color: p.color,
        style: p.style,
        productSubId: p.productSubId,
      }));
      recompute(state);
      persist(state);
    },
  },
});

const persist = (state) => storage.set(CART_KEY, {
  items: state.items, couponCode: state.couponCode, totalAfterDiscount: state.totalAfterDiscount,
});

// initial recompute
recompute({ items: persisted.items || [] });

export const { addItem, removeItem, setQty, clearCart, setCoupon, hydrateFromServer } = slice.actions;
export default slice.reducer;

export const selectCart       = (s) => s.cart;
export const selectCartCount  = (s) => s.cart.itemCount;
export const selectCartItems  = (s) => s.cart.items;
export { cartKey };
