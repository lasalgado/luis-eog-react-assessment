import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    minWidth: 250,
    '& :last-child': {
      paddingBottom: '0',
    },
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: '1px',
  },
  title: {
    fontFamily: 'Courier Prime',
  },
  units: {
    fontSize: '75%',
    color: grey[500],
    paddingLeft: theme.spacing(0.25),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.3),
  },
  linear: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));
