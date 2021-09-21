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

export interface IPoint {
  value:number,
  at: number,
  unit:string
}

export interface IChartData {
  name: string,
  data: IPoint[],
};

export interface IMeasurements {
  [index: string]: IChartData,
};

export interface IDictIMeasurements {
  [index: string]: IMeasurement
}

export interface ISelectedMetrics {
  name: string,
  measure: IMeasurement,
}