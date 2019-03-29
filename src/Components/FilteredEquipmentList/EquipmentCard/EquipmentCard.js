import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { storage } from '../../../Database/firebase';
import { styles } from './EquipementCard.style';

class EquipmentCard extends Component {

  state = {
    photo: 'http://vyfhealth.com/wp-content/uploads/2015/10/yoga-placeholder1.jpg'
  };

  componentWillReceiveProps(){
    if(this.props.equip.nomPhotoEquipement.length !== 0) {
      storage.ref('photos/').child(this.props.equip.nomPhotoEquipement).getDownloadURL().then((url) => {
        this.setState({photo: url});
      }).catch(err => console.log(err));
    }
  }

  componentWillMount() {
    if(this.props.equip.nomPhotoEquipement.length !== 0) {
      storage.ref('photos/').child(this.props.equip.nomPhotoEquipement).getDownloadURL().then((url) => {
        this.setState({photo: url});
      }).catch(err => console.log(err));
    }
  }

  render() {
    const {classes} = this.props;
    const {equip} = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea onClick={() => this.props.redirect(equip, this.state.photo)}>
          <CardMedia
            className={classes.media}
            image={this.state.photo}
            component="img"
            height="224"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {equip.nom}
            </Typography>
            <Typography component="p">
              {equip.info_domaine}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

EquipmentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EquipmentCard);
