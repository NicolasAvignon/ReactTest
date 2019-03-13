import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import { styles } from './Checkpoint.style';

class Checkpoint extends React.Component {
  render() {
    const { checkpoint } = this.props;
    const { classes } = this.props;

    const noImageSrc = 'http://vyfhealth.com/wp-content/uploads/2015/10/yoga-placeholder1.jpg';

    //const checkpointPhoto = checkpoint.nomPhoto ?

    return (
      <div className={classes.checkpoint}>
        {
          checkpoint.nomPhoto ?
            <img src={checkpoint.nomPhoto} className={classes.picture} alt={'photo_checkpoint'}/>
            :
            <img src={noImageSrc} className={classes.picture} alt={'photo_checkpoint'}/>
        }
        <div className={classes.infos}>
          <Typography variant={'subtitle1'}>Type de contrôle : {checkpoint.typeControle}</Typography>
          <Typography variant={'subtitle1'}>Point de contrôle : {checkpoint.pointDeControle}</Typography>
          <Typography variant={'subtitle1'}>Défaut : {checkpoint.defautTexte}</Typography>
          <Typography variant={'subtitle1'}>Préconisation : {checkpoint.preconisation}</Typography>
        </div>
      </div>
    );
  }
}

Checkpoint.propTypes = {
  checkpoint: PropTypes.shape({
    nomPhoto: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(Checkpoint);