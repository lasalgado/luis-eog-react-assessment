import React, { FC } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useStyles } from './MeasuresContainer.styles';
import MetricsDisplay from '../MetricsDisplay';
import { getSelected } from '../../redux/metrics/selector';
import { useAppSelector } from '../../redux/hooks';

const MeasuresContainer: FC = () => {
  const classes = useStyles();
  const selectedMetrics = useAppSelector(getSelected);

  if (!selectedMetrics || selectedMetrics.length <= 0) return null;

  return (
    <Box display="flex" p={0} className={classes.container}>
      <Grid container>
        <Grid item xs={12}><MetricsDisplay /></Grid>
        <Grid item xs={12}><h1>Chart</h1></Grid>
      </Grid>
    </Box>
  );
};

export default MeasuresContainer;
