import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@/api/auth.api';
import { storage } from '@/utils/storage';

// ---------- Thunks ----------
export const login = createAsyncThunk('auth/login', async (creds, { rejectWithValue }) => {
  try {
    const res = await authApi.login(creds);
    if (res.data?.accessToken) storage.set('accessToken', res.data.accessToken);
    return res.data;
  } catch (err) { return rejectWithValue(err.message); }
});

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try { return (await authApi.register(payload)).data; }
  catch (err) { return rejectWithValue(err.message); }
});

export const fetchMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try { return (await authApi.me()).data; }
  catch (err) { return rejectWithValue(err.message); }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try { await authApi.logout(); } catch {}
  storage.remove('accessToken');
});

// ---------- Slice ----------
const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: storage.get('accessToken'),
    status: 'idle',    // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    sessionExpired(state) {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(login.pending,   (s) => { s.status = 'loading'; s.error = null; });
    b.addCase(login.fulfilled, (s, a) => { s.status = 'succeeded'; s.user = a.payload.user; s.accessToken = a.payload.accessToken; });
    b.addCase(login.rejected,  (s, a) => { s.status = 'failed'; s.error = a.payload; });

    b.addCase(fetchMe.fulfilled, (s, a) => { s.user = a.payload; });
    b.addCase(fetchMe.rejected,  (s) => { s.user = null; });

    b.addCase(logout.fulfilled, (s) => { s.user = null; s.accessToken = null; });
  },
});

export const { sessionExpired } = slice.actions;
export default slice.reducer;

// ---------- Selectors ----------
export const selectUser    = (s) => s.auth.user;
export const selectIsAuthed= (s) => !!s.auth.accessToken;
export const selectIsAdmin = (s) => s.auth.user?.role === 'admin';
