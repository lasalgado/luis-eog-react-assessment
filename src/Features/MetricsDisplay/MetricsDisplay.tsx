import React, { FC } from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './MetricsDisplay.styles';
import MetricCard from '../../components/MetricCard';
import { IMeasurement } from '../../types/interfaces';

const MetricsDisplay: FC = () => {
  const classes = useStyles();
  const measure: IMeasurement = {
    metric: 'casingPressure',
    at: 1631916538665,
    value: 483.77,
    unit: 'PSI',
  };
  const measure2: IMeasurement = {
    metric: 'flareTemp',
    at: 1631917057821,
    value: 90,
    unit: 'F',
  };

  return (
    <Box
      display='flex'
      p={0}
      className={classes.container}
      flexWrap='wrap'
      justifyContent='space-between'
    >
      <MetricCard measurement={measure} />
      <MetricCard measurement={measure2} />
      <MetricCard measurement={measure} />
      <MetricCard measurement={measure2} />
      <MetricCard measurement={measure} />
      <MetricCard measurement={measure2} />
      <MetricCard measurement={measure} />
      <MetricCard measurement={measure2} />
      <MetricCard measurement={measure} />
      <MetricCard measurement={measure2} />
      <MetricCard measurement={measure} />
      <MetricCard measurement={measure2} />
    </Box>
  );
};

export default MetricsDisplay;
