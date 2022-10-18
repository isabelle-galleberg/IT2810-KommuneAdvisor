import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface KommuneState {
  kommune: string;
}

const initialState: KommuneState = {
  kommune: '',
};

export const kommuneSlice = createSlice({
  name: 'kommuneInput',
  initialState,
  reducers: {
    updateKommune: (state, action: PayloadAction<string>) => {
      state.kommune = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateKommune } = kommuneSlice.actions;

// Brukes denne?
export const selectKommune = (state: RootState) => state.kommuneInput.kommune;

export default kommuneSlice.reducer;
