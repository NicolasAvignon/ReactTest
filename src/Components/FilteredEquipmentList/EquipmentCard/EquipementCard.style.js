export const styles = theme => ({
  card: {
    [theme.breakpoints.up('xs')]: {
      width: '90%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '45%'
    },
    [theme.breakpoints.up('md')]: {
      width: '30%'
    },
    height: '345px',
    margin: '1rem',
    display: 'inline-block'
  },
  media: {
    objectFit: 'contain',
    backgroundColor: '#e8eaf6'
  }
});