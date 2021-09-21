import React, {
  FC,
} from 'react';
import { Paper } from '@material-ui/core';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useStyles } from './MeasuresChart.styles';
import { getMeasurements } from '../../redux/measurements/selector';
import { useAppSelector } from '../../redux/hooks';
import { IMeasurements } from '../../types/interfaces';
import { timeToMins, formatUnits, timeToStringSingle } from '../../utils/utils';

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

const renderLineChart = (info: IMeasurements) => {
  const refactor = 'oilTemp' in info ? info.oilTemp.data : [];

  console.log(Object.keys(info));

  return (
    <LineChart
      width={400}
      height={250}
      data={refactor}
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
      <YAxis label={{ value: '°F', angle: -90, position: 'insideLeft' }} />
      <Tooltip
        labelFormatter={
          (timestamp: number): string => timeToStringSingle(timestamp)
        }
        isAnimationActive={false}
        formatter={(value: any, name: any, props: any) => `${value} ${formatUnits(props.payload.unit)}`}
      />
      <Line
        type='monotone'
        dataKey='value'
        stroke='#8884d8'
        dot={false}
        activeDot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );
};

const MeasuresChart: FC<{
  beat: number
}> = ({ beat }) => {
  const classes = useStyles();
  const measurements = useAppSelector(getMeasurements);

  if (beat < -1) return null;

  return (
    <Paper className={classes.paper}>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          {renderLineChart(measurements)}
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default MeasuresChart;
