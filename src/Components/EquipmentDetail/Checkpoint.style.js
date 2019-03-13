export const styles = theme => ({
  checkpoint: {
    backgroundColor: '#eeeeee',
    margin: 8,
    padding: 8,
    display: 'flex',
    height: 128,
    borderRadius: 8
  },
  picture: {
    [theme.breakpoints.up('xs')]: {
      width: '90%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '45%'
    },
    [theme.breakpoints.up('md')]: {
      width: 104,
      height: 104
    },
    margin: '1rem',
    flex: 'initial'
  },
  info: {
    flexDirection: 'column'
  }
});