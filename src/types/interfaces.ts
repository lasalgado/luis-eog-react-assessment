export interface IMetricState {
  selected: Array<string>;
}

/**
 * Interface implemented to receive
 * and manipulate data inside measurements
 */
export interface IMeasurement {
  metric: string;
  at: number;
  value: number;
  unit: string;
}
