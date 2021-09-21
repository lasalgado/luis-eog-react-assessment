import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import { Paper } from '@material-ui/core';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { useStyles } from './MeasuresChart.styles';
import { getSelected } from '../../redux/metrics/selector';
import { getMeasurements } from '../../redux/measurements/selector';
import { useAppSelector } from '../../redux/hooks';
import { IChartData } from '../../types/interfaces';
import {
  timeToMins,
  formatUnits,
  timeToStringSingle,
  getColor,
} from '../../utils/utils';

const customizedAxisTick = (props: { x: any; y: any; payload: any }) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fontSize={10} fill="#757575">
        {timeToMins(payload.value)}
      </text>
    </g>
  );
};

const renderLineChart = (series: IChartData[]) => (
  <LineChart
    width={400}
    height={250}
    margin={{
      top: 20,
      right: 30,
      left: 20,
      bottom: 0,
    }}
    style={{ backgroundColor: 'white' }}
  >
    <XAxis
      dataKey='at'
      interval='preserveEnd'
      scale='time'
      type="number"
      domain={['dataMin', 'dataMax']}
      tick={customizedAxisTick}
    />
    <YAxis dataKey='value' label={{ value: '°F', angle: -90, position: 'insideLeft' }} />
    <Tooltip
      labelFormatter={
        (timestamp: number): string => timeToStringSingle(timestamp)
      }
      isAnimationActive={false}
      formatter={(value: any, name: any, props: any) => `${value} ${formatUnits(props.payload.unit)}`}
    />
    <Legend />
    {series.map((s, index) => (
      <Line
        dataKey="value"
        data={s.data}
        name={s.name}
        key={s.name}
        stroke={getColor(index)}
        type='monotone'
        dot={false}
        activeDot={false}
        isAnimationActive={false}
      />
    ))}
  </LineChart>
);

const MeasuresChart: FC<{
  beat: number
}> = ({ beat }) => {
  const classes = useStyles();
  const [data, setData] = useState<IChartData[]>([]);
  const measurements = useAppSelector(getMeasurements);
  const selectedMetrics = useAppSelector(getSelected);

  useEffect(() => {
    const entries = Object.entries(measurements);
    const filteredEntries = entries.filter(([key]) => selectedMetrics.indexOf(key) !== -1);
    const series = filteredEntries.map(([, value]) => value);

    setData(series);
  }, [measurements, selectedMetrics]);

  if (beat < -1 || data.length < 1) return null;

  return (
    <Paper className={classes.paper}>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          {renderLineChart(data)}
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default MeasuresChart;
