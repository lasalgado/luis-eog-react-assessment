import React, { FC } from 'react';
import { Paper } from '@material-ui/core';
import { ResponsiveContainer } from 'recharts';
import { useStyles } from './MeasuresChart.styles';
import { getChartData } from '../../redux/measurements/selector';
import { useAppSelector } from '../../redux/hooks';
import RenderLineChart from '../../components/LineChart';

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
          {RenderLineChart(chartData)}
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default MeasuresChart;
