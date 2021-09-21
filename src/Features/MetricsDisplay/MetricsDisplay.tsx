import React, {
  FC,
  useReducer,
} from 'react';
import { useSubscription, gql } from '@apollo/client';
import { Box } from '@material-ui/core';
import { useStyles } from './MetricsDisplay.styles';
import MetricCard from '../../components/MetricCard';
import { IMeasurement, ISelectedMetrics } from '../../types/interfaces';
import { getSelected } from '../../redux/metrics/selector';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { MEASURE_FIELDS } from '../../grapql/fragments';
import { setNewValue } from '../../redux/measurements/reducer';

const NEW_MEAUSUREMENT_SUBSCRIPTION = gql`
  ${MEASURE_FIELDS}
  subscription newMeasurement {
    newMeasurement {
      ...measureFields
    }
  }
`;

type Action =
| { type: 'push', data: ISelectedMetrics };

function reducer(state: ISelectedMetrics[], action: Action): ISelectedMetrics[] {
  switch (action.type) {
    case 'push': {
      const index = state.findIndex((element) => element.name === action.data.name);

      if (index !== -1) {
        state[index] = action.data;
      } else {
        state.push(action.data);
      }

      return state;
    }
    default:
      throw new Error();
  }
}

const initialState: ISelectedMetrics[] = [];

const MetricsDisplay: FC<{ beat: number }> = ({ beat }) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  // const [beat, setBeat] = useState(-1);ß
  const selectedMetrics = useAppSelector(getSelected);
  const [metricsDisplayed, dispatchDisplayed] = useReducer(reducer, initialState);

  const updateSubscribedData = ({ newMeasurement }: { newMeasurement: IMeasurement }) => {
    if (selectedMetrics.indexOf(newMeasurement.metric) !== -1) {
      const newValue = {
        name: newMeasurement.metric,
        point: {
          at: newMeasurement.at,
          value: newMeasurement.value,
          unit: newMeasurement.unit,
        },
      };

      dispatch(setNewValue(newValue));
      dispatchDisplayed({
        type: 'push',
        data: {
          name: newMeasurement.metric,
          measure: newMeasurement,
        },
      });
    }
  };

  useSubscription(NEW_MEAUSUREMENT_SUBSCRIPTION, {
    onSubscriptionData: (subscriptionInfo) => {
      updateSubscribedData(subscriptionInfo.subscriptionData.data);
    },
  });

  const metricsDisplayedMeasure = (name: string): IMeasurement | null => {
    const element = metricsDisplayed.find((el) => el.name === name);

    return typeof element !== 'undefined' ? element.measure : null;
  };

  return (
    <Box
      display='flex'
      p={0}
      className={classes.container}
      flexWrap='wrap'
      justifyContent='flex-start'
    >
      {selectedMetrics.map((metric) => (
        <MetricCard
          key={`check-${metric}`}
          metricName={metric}
          beat={beat}
          measure={metricsDisplayedMeasure(metric)}
        />
      ))}
    </Box>
  );
};

export default MetricsDisplay;
