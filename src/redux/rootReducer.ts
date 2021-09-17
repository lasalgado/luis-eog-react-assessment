import { combineReducers } from '@reduxjs/toolkit';
import metricReducer from './metrics/reducer';

export const rootReducer = combineReducers({
  metrics: metricReducer,
});
