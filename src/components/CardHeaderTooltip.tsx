import CardHeader from '@material-ui/core/CardHeader';
import { withStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
    padding: theme.spacing(1),
  },
  title: {
    color: 'white',
    fontSize: '0.9rem',
  },
});
export default withStyles(styles)(CardHeader);
