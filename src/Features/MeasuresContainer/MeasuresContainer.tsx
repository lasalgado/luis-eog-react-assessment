import React, { FC } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useStyles } from './MeasuresContainer.styles';
import MetricsDisplay from '../MetricsDisplay';

const MeasuresContainer: FC = () => {
  const classes = useStyles();

  return (
    <Box display="flex" p={0} className={classes.container}>
      <Grid container>
        <Grid item xs={12}><MetricsDisplay /></Grid>
        <Grid item xs={12}><h1>Hola</h1></Grid>
      </Grid>
    </Box>
  );
};

export default MeasuresContainer;
