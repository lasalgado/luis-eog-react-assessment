import React, { FC, useState, useEffect } from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import {
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { getExistingMetrics } from '../../redux/measurements/selector';
import { setMetricMeasurements } from '../../redux/measurements/reducer';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useStyles } from './MetricCard.styles';
import { timeToStringSingle, formatUnits, updateTime } from '../../utils/utils';
import { IMeasurement, IPoint } from '../../types/interfaces';
import { MEASURE_FIELDS } from '../../grapql/fragments';

// Amount of time in minutes to get historical data starting
// from the beat timestamp from the server
const TIME_HISTORICAL_DATA = 30;

const GET_LAST_KNOWN_MEASUREMENT = gql`
  ${MEASURE_FIELDS}

  query lastKnownMeasurement($metricName: String!) {
    lastKnown: getLastKnownMeasurement(metricName: $metricName) {
      ...measureFields
    }
  }
`;

const GET_MEASUREMENTS = gql`
  ${MEASURE_FIELDS}

  query metricMeasurements($input: MeasurementQuery) {
    getMeasurements(input: $input) {
      ...measureFields
    }
  }
`;

const MetricCard: FC<{
  metricName: string,
  measure?: IMeasurement | null,
  beat?:number,
  measurements?:string[] }> = (
  {
    metricName,
    measure = null,
    beat = null,
  },
) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [metric] = useState(metricName);
  const [measurement, setMeasurement] = useState<IMeasurement | null>(null);
  const measurements = useAppSelector(getExistingMetrics);
  const { loading, data } = useQuery(GET_LAST_KNOWN_MEASUREMENT, {
    fetchPolicy: !measure ? 'network-only' : 'standby',
    nextFetchPolicy: 'standby',
    variables: { metricName: metric },
  });
  const [getMeasurements] = useLazyQuery(GET_MEASUREMENTS, {
    onCompleted: (lazyData) => {
      const { getMeasurements: historicalData } = lazyData;

      dispatch(setMetricMeasurements({
        name: metric,
        data: historicalData.map(({ at, unit, value }: IPoint) => ({
          at,
          unit,
          value,
        })),
      }));
    },
  });

  if (!loading && !measurement) {
    setMeasurement(data.lastKnown);
  }

  useEffect(() => {
    setMeasurement(measure);
  }, [measure]);

  useEffect(() => {
    if (beat && beat > -1 && measurements.indexOf(metric) === -1) {
      getMeasurements({
        variables: {
          input: {
            metricName: metric,
            before: beat,
            after: updateTime(beat, TIME_HISTORICAL_DATA),
          },
        },
      });
    }
  }, [beat]);

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
