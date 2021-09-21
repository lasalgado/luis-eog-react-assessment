import { createSlice } from '@reduxjs/toolkit';
import { IMetricState } from '../../types/interfaces';

const initialState: IMetricState = {
  selected: [],
};

const metricSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setSelected(state, action) {
      state.selected = [...state.selected, action.payload];
    },
    clearSelected(state, action) {
      state.selected = state.selected.filter((selected) => selected !== action.payload);
    },
  },
});

export default metricSlice.reducer;
export const {
  setSelected,
  clearSelected,
} = metricSlice.actions;
