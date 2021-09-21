import { RootState } from '../store';

export const getSelected = (state: RootState) => state.metrics.selected;
