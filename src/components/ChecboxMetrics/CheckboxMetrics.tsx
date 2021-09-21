import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel as FCLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@material-ui/core';
import { useAppDispatch } from '../../redux/hooks';
import { setSelected, clearSelected } from '../../redux/metrics/reducer';
import { useStyles } from './CheckboxMterics.styles';

interface BoolDict {
  [index: string]: boolean;
}

const CheckboxMetrics: FC<{ metrics: string[] }> = ({ metrics }) => {
  const [state, setState] = useState<BoolDict>({});
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selector = event.target.checked ? setSelected : clearSelected;

    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });

    dispatch(selector(event.target.name));
  };

  const getCheckbox = ({ name, checked } : { name: string, checked: boolean }) => (
    <Checkbox checked={checked} onChange={handleChange} name={name} color="primary" />
  );

  const renderComp = () => {
    const entries = Object.entries(state);

    const ret = entries.map((entry) => (
      <FCLabel key={`check-metric-${entry[0]}`} control={getCheckbox({ name: entry[0], checked: entry[1] })} label={entry[0]} />
    ));

    return ret;
  };

  useEffect(() => {
    const newState: BoolDict = {};

    metrics.forEach((metric) => { newState[metric] = false; });

    setState(newState);
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Available metrics</FormLabel>
        <FormGroup className={classes.group}>{renderComp()}</FormGroup>
        <Divider className={classes.divider} />
        <FormHelperText>
          Select one or more of the above metrics to visualize real time information
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default CheckboxMetrics;
