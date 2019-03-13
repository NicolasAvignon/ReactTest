import React from 'react';
import { withStyles } from '@material-ui/core';
import Checkpoint from './Checkpoint';
import { styles } from './CheckpointsList.style';

class CheckpointsList extends React.Component {
  render() {
    const { classes } = this.props;

    return(
      this.props.checkpoints.map(function(checkpoint,i){
        return(
          <Checkpoint checkpoint={checkpoint} key={i}/>
        );
      })
    );
  }

}

export default withStyles(styles)(CheckpointsList);