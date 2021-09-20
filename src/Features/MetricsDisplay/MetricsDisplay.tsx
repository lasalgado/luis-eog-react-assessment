import React, { FC, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box } from '@material-ui/core';
import { useStyles } from './MetricsDisplay.styles';
import MetricCard from '../../components/MetricCard';
// import { IMeasurement } from '../../types/interfaces';
import { getSelected } from '../../redux/metrics/selector';
import { useAppSelector } from '../../redux/hooks';
// import { MEASURE_FIELDS } from '../../grapql/fragments';
import { updateTime } from '../../utils/utils';

// Amount of time in minutes to get historical data starting
// from the beat timestamp from the server
const TIME_HISTORICAL_DATA = 30;

const BEAT_SERVER = gql`
  query beat {
    heartBeat
  }
`;

// const GET_MULTIPLE_MEASUREMENTS = gql`
//   ${MEASURE_FIELDS}

//   query multipleMeasurements($multipleInput: [MeasurementQuery]) {
//     getMultipleMeasurements(input: $multipleInput) {
//       metric
//       measurements {
//         ...measureFields
//       }
//     }
//   }
// `;

// const NEW_MEAUSUREMENT_SUBSCRIPTION = gql`
//   ${MEASURE_FIELDS}
//   subscription newMeasurement {
//     newMeasurement {
//       ...measureFields
//     }
//   }
// `;

const MetricsDisplay: FC = () => {
  const classes = useStyles();
  const [beat, setBeat] = useState(-1);
  const selectedMetrics = useAppSelector(getSelected);
  useQuery(BEAT_SERVER, {
    skip: beat > -1,
    onCompleted: (dataCompleted) => {
      setBeat(dataCompleted.heartBeat);
      const prevTimestamp = updateTime(dataCompleted.heartBeat, TIME_HISTORICAL_DATA);
      console.log('Prev: ', prevTimestamp);
    },
  });

  console.log(beat);
  console.log(beat > -1);
  console.log('===========');
  // const [displayedMetrics, setDisplayedMetrics] = useState<{ [index:string]: IMeasurement }>({});

  // useSubscription(NEW_MEAUSUREMENT_SUBSCRIPTION, {
  //   fetchPolicy: 'standby',
  //   onSubscriptionData: (subscriptionInfo) => {
  //     // const { client, subscriptionData } = subscriptionInfo;
  //     // const { metric } = subscriptionData.data.newMeasurement;

  //     console.log(subscriptionInfo);
  //   },
  // });

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

  // console.log(selectedMetrics.length);
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
