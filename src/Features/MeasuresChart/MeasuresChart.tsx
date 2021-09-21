import React, { FC } from 'react';
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
import { getChartData } from '../../redux/measurements/selector';
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

const customizedYAxisTick = (props: { x: any; y: any; payload: any }) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-10} y={0} dy={5} textAnchor="middle" fontSize={10} fill="#757575">
        {payload.value}
      </text>
    </g>
  );
};

const renderLineChart = (chartData: { series: IChartData[], units: string[] }) => {
  const { series, units } = chartData;

  return (
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
      {units.map((s) => (
        <YAxis
          yAxisId={`yAxis-${s}`}
          dataKey='value'
          key={`yAxis-${s}`}
          type='number'
          tick={customizedYAxisTick}
          unit={s}
          label={{
            value: formatUnits(s),
            angle: -90,
            position: 'insideTopLeft',
          }}
        />
      ))}
      <Tooltip
        labelFormatter={
          (timestamp: number): string => timeToStringSingle(timestamp)
        }
        isAnimationActive={false}
        formatter={(value: any, name: any, props: any) => `${value} ${formatUnits(props.payload.unit)}`}
      />
      <Legend verticalAlign="top" height={60} />
      {series.map((s, index) => {
        const unit = s.data.length > 0 ? s.data[0].unit : '';

        return (
          <Line
            dataKey="value"
            data={s.data}
            name={s.name}
            key={s.name}
            yAxisId={`yAxis-${unit}`}
            stroke={getColor(index)}
            type='monotone'
            dot={false}
            activeDot={false}
            isAnimationActive={false}
          />
        );
      })}
    </LineChart>
  );
};

const MeasuresChart: FC<{
  beat: number
}> = ({ beat }) => {
  const classes = useStyles();
  const chartData = useAppSelector(getChartData);

  if (beat < -1 || chartData.series.length < 1) return null;

  return (
    <Paper className={classes.paper}>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          {renderLineChart(chartData)}
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default MeasuresChart;
