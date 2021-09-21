import React from 'react';
import {
  Card,
  CardContent,
} from '@material-ui/core';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import CardHeader from '../CardHeaderTooltip';
import {
  timeToMins,
  formatUnits,
  // timeToStringSingle,
  getColor,
  formatDT,
} from '../../utils/utils';
import { IChartData } from '../../types/interfaces';
import { useStyles } from './LineChart.styles';

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

const CustomTooltip = (props: any) => {
  const classes = useStyles();
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    return (
      <Card variant="outlined" className={classes.root}>
        <CardHeader title={formatDT(label)} className={classes.header} />
        <CardContent className={classes.content}>
          {payload.map((line: any) => (
            <p className={classes.infoLine} key={`tool-info-${line.name}`}>
              &nbsp;<i>{line.name}:&nbsp;</i>
              <span className='value'>{line.payload.value}</span>
              <span className='unit'>&nbsp;{formatUnits(line.payload.unit)}</span>
            </p>
          ))}
        </CardContent>
      </Card>
    );
  }

  return null;
};

const RenderLineChart = (chartData: { series: IChartData[], units: string[] }) => {
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
        content={<CustomTooltip />}
        isAnimationActive={false}
      />
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

export default RenderLineChart;
