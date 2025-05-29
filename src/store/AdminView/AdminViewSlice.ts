import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AdminSection = 'todo' | 'profile' | 'settings' | 'users';

interface AdminViewState {
  activeSection: AdminSection;
}

const initialState: AdminViewState = {
  activeSection: 'users',
};

const adminViewSlice = createSlice({
  name: 'adminView',
  initialState,
  reducers: {
    setActiveSection(state, action: PayloadAction<AdminSection>) {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveSection } = adminViewSlice.actions;
export default adminViewSlice.reducer;
