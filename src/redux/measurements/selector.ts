import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const getMeasurements = (state: RootState) => state.measurements;

export const getExistingMetrics = createSelector(
  getMeasurements,
  (measurements) => Object.keys(measurements),
);
