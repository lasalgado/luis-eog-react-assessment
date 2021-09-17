import React, { FC } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Card,
  CardContent,
  Container,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { useStyles } from './Metric.styles';
import CardHeader from '../CardHeader';

const GET_METRICS = gql`
  query metrics {
    getMetrics
  }
`;

const MetricSelector: FC = () => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_METRICS);

  console.log(data);

  return (
    <Container fixed className={classes.container}>
      <Card variant="outlined" className={classes.container}>
        <CardHeader title="Select metrics" />
        <CardContent>
          {loading && <LinearProgress />}
          {error && <Typography align='center' variant="h6" gutterBottom component="div">Information could not be loaded</Typography>}
        </CardContent>
      </Card>
    </Container>
  );
};

export default MetricSelector;
