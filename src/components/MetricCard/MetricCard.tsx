import React, { FC, useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { useStyles } from './MetricCard.styles';
import { timeToStringSingle, formatUnits } from '../../utils/utils';
import { IMeasurement } from '../../types/interfaces';
import { MEASURE_FIELDS } from '../../grapql/fragments';

const GET_LAST_KNOWN_MEASUREMENT = gql`
  ${MEASURE_FIELDS}

  query lastKnownMeasurement($metricName: String!) {
    lastKnown: getLastKnownMeasurement(metricName: $metricName) {
      ...measureFields
    }
  }
`;

const MetricCard: FC<{ metricName: string, measure?: IMeasurement | null }> = ({
  metricName,
  measure = null,
}) => {
  const classes = useStyles();
  const [metric] = useState(metricName);
  const [measurement, setMeasurement] = useState<IMeasurement | null>(null);
  const { loading, data } = useQuery(GET_LAST_KNOWN_MEASUREMENT, {
    fetchPolicy: !measure ? 'network-only' : 'standby',
    nextFetchPolicy: 'standby',
    variables: { metricName: metric },
  });

  if (!loading && !measurement) {
    setMeasurement(data.lastKnown);
  }

  useEffect(() => {
    setMeasurement(measure);
  }, [measure]);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {metric}
        </Typography>
        {measurement && (
          <>
            <Typography variant="h4" component="h2" align='center' className={classes.title}>
              {measurement.value}
              <span color='textSecondary' className={classes.units}>{formatUnits(measurement.unit)}</span>
            </Typography>
            <Divider className={classes.divider} />
            <Typography color='textSecondary' variant="overline" display="block" align='right'>
              {timeToStringSingle(measurement.at)}
            </Typography>
          </>
        )}
        {!measurement && <LinearProgress className={classes.linear} />}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
