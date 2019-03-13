import React from 'react';
import * as PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import { styles } from './AppTopBar.style';
import { APP_NAME } from '../../Utils/Localization';
import { Routes } from '../../Utils/Routes';

function AppTopBar(props) {
  const {classes} = props;
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {
            props.history.location.pathname !== Routes.HOME
            &&
            <IconButton className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={props.history.goBack}>
              <NavigateBefore/>
            </IconButton>
          }
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            {APP_NAME}
          </Typography>
          <div className={classes.grow}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppTopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(AppTopBar);
