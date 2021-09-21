import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getSelected } from '../metrics/selector';

export const getMeasurements = (state: RootState) => state.measurements;

export const getExistingMetrics = createSelector(
  getMeasurements,
  (measurements) => Object.keys(measurements),
);

export const getChartData = createSelector(
  getMeasurements,
  getSelected,
  (measurements, selected) => {
    const entries = Object.entries(measurements);
    const filteredEntries = entries.filter(([key]) => selected.indexOf(key) !== -1);
    const series = filteredEntries.map(([, value]) => value);
    const uniqueSet = new Set(series.map((entry) => (entry.data.length > 0 ? entry.data[0].unit : '')));
    const units = Array.from(uniqueSet);

    return { series, units };
  },
);
