import { getUI } from '@/services/ui';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type AdminSection = 'todo' | 'profile' | 'settings' | 'users';

interface AdminViewState {
  activeSection: AdminSection;
  tittle: string;
  footer: string;
  loading: boolean;
  error: string | null;
}

const initialState: AdminViewState = {
  activeSection: 'todo',
  tittle: '',
  footer: '',
  loading: false,
  error: null,
};

export const fetchAdminUI = createAsyncThunk(
  'adminView/fetchAdminUI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUI();
      if (!response) {
        throw new Error('UI data not found');
      }
      return { tittle: response.tittle, footer: response.footer };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Unknown error');
    }
  }
);

const adminViewSlice = createSlice({
  name: 'adminView',
  initialState,
  reducers: {
    setActiveSection(state, action: PayloadAction<AdminSection>) {
      state.activeSection = action.payload;
    },
    setNewUI(state, action: PayloadAction<{ tittle: string; footer: string }>) {
      state.tittle = action.payload.tittle;
      state.footer = action.payload.footer;
    }
  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUI.fulfilled, (state, action: PayloadAction<{ tittle: string; footer: string }>) => {
        state.loading = false;
        state.tittle = action.payload.tittle;
        state.footer = action.payload.footer;
      })
      .addCase(fetchAdminUI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveSection, setNewUI } = adminViewSlice.actions;
export default adminViewSlice.reducer;
