import React, { FC, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';
import { useStyles } from './MeasuresContainer.styles';
import MetricsDisplay from '../MetricsDisplay';
import MeasuresChart from '../MeasuresChart';
import { getSelected } from '../../redux/metrics/selector';
import { useAppSelector } from '../../redux/hooks';

const BEAT_SERVER = gql`
  query beat {
    heartBeat
  }
`;

const MeasuresContainer: FC = () => {
  const classes = useStyles();
  const [beat, setBeat] = useState(-1);
  const selectedMetrics = useAppSelector(getSelected);

  useQuery(BEAT_SERVER, {
    skip: beat > -1 || (!selectedMetrics || selectedMetrics.length <= 0),
    onCompleted: (dataCompleted) => {
      setBeat(dataCompleted.heartBeat);
    },
  });

  if (!selectedMetrics || selectedMetrics.length <= 0) return null;

  return (
    <Box display="flex" p={0} className={classes.container}>
      <Grid container>
        <Grid item xs={12}><MetricsDisplay beat={beat} /></Grid>
        <Grid item xs={12}><MeasuresChart beat={beat} /></Grid>
      </Grid>
    </Box>
  );
};

export default MeasuresContainer;
