import React, { FC } from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './MetricsDisplay.styles';
import MetricCard from '../../components/MetricCard';
// import { IMeasurement } from '../../types/interfaces';
import { getSelected } from '../../redux/metrics/selector';
import { useAppSelector } from '../../redux/hooks';

const MetricsDisplay: FC = () => {
  const classes = useStyles();
  // const [displayedMetrics, setDisplayedMetrics] = useState<{ [index:string]: IMeasurement }>({});
  const selectedMetrics = useAppSelector(getSelected);

  // const measure: IMeasurement = {
  //   metric: 'casingPressure',
  //   at: 1631916538665,
  //   value: 483.77,
  //   unit: 'PSI',
  // };
  // const measure2: IMeasurement = {
  //   metric: 'flareTemp',
  //   at: 1631917057821,
  //   value: 90,
  //   unit: 'F',
  // };

  // console.log(selectedMetrics);
  // console.log(loading);
  // console.log(data);

  return (
    <Box
      display='flex'
      p={0}
      className={classes.container}
      flexWrap='wrap'
      justifyContent='space-between'
    >
      {selectedMetrics.map((metric) => (
        <MetricCard key={`check-${metric}`} metricName={metric} />
      ))}
    </Box>
  );
};

export default MetricsDisplay;
