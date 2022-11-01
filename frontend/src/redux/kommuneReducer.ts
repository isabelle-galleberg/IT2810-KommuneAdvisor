import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface KommuneState {
  kommune: string;
}

const initialState: KommuneState = {
  kommune: '',
};

// global state for kommune, can be updated with updateKommune
export const kommuneSlice = createSlice({
  name: 'kommuneInput',
  initialState,
  reducers: {
    updateKommune: (state, action: PayloadAction<string>) => {
      state.kommune = action.payload;
    },
  },
});

export const { updateKommune } = kommuneSlice.actions;

export default kommuneSlice.reducer;
