import { createSlice } from '@reduxjs/toolkit';
import { IMeasurements } from '../../types/interfaces';

const initialState: IMeasurements = {};

const measurementsSlice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    setMetricMeasurements(state, action) {
      const { name } = action.payload;

      if (name in state === false) {
        state[name] = action.payload;
      }
    },
    setNewValue(state, action) {
      const { name } = action.payload;

      if (name in state) {
        state[name].data.push(action.payload.point);
      }
    },
  },
});

export default measurementsSlice.reducer;
export const { setMetricMeasurements, setNewValue } = measurementsSlice.actions;
