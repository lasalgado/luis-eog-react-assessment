import React, { FC } from 'react';
import {
  Card,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';
import { useStyles } from './MetricCard.styles';
import { timeToStringSingle, formatUnits } from '../../utils/utils';
import { IMeasurement } from '../../types/interfaces';

const MetricCard: FC<{ measurement: IMeasurement }> = ({ measurement }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {measurement.metric}
        </Typography>
        <Typography variant="h4" component="h2" align='center' className={classes.title}>
          {measurement.value}
          <span color='textSecondary' className={classes.units}>{formatUnits(measurement.unit)}</span>
        </Typography>
        <Divider className={classes.divider} />
        <Typography color='textSecondary' variant="overline" display="block" align='right'>
          {timeToStringSingle(measurement.at)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
