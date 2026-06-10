import { createSlice } from '@reduxjs/toolkit';
import { storage } from '@/utils/storage';

const KEY = 'wishlist_v1';

const slice = createSlice({
  name: 'wishlist',
  initialState: { ids: storage.get(KEY, []) },
  reducers: {
    toggle(state, { payload }) {
      const i = state.ids.indexOf(payload);
      if (i >= 0) state.ids.splice(i, 1); else state.ids.push(payload);
      storage.set(KEY, state.ids);
    },
    setAll(state, { payload }) {
      state.ids = payload;
      storage.set(KEY, state.ids);
    },
  },
});

export const { toggle, setAll } = slice.actions;
export default slice.reducer;
export const selectWishlistIds = (s) => s.wishlist.ids;
export const selectIsWishlisted = (id) => (s) => s.wishlist.ids.includes(id);
