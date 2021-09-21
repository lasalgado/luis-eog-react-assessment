import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontFamily: 'Courier Prime',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.3),
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    gap: '2vw 2vw',
  },
}));
