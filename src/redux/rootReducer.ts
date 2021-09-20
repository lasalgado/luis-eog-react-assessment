import { combineReducers } from '@reduxjs/toolkit';
import metricReducer from './metrics/reducer';
import measurementsReducer from './measurements/reducer';

export const rootReducer = combineReducers({
  metrics: metricReducer,
  measurements: measurementsReducer,
});
