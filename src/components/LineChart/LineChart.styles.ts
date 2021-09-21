import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
  },
  content: {
    padding: theme.spacing(1),
  },
  header: {
    title: {
      fontSize: '10',
    },
  },
  infoLine: {
    padding: 0,
    margin: 0,
    '& .value': {
      fontFamily: 'Courier Prime',
      fontWeight: 600,
      fontSize: '1rem',
    },
    '& .unit': {
      fontFamily: 'Courier Prime',
      fontSize: '85%',
      fontWeight: 600,
      color: grey[500],
    },
  },
}));
