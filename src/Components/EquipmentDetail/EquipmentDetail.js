import React, { Component } from 'react';
import SearchAppBar from '../AppBar/AppTopBar';
import { database } from '../../Database/firebase';
import LinearIndeterminate from '../Utils/LinearLoading';
import { withStyles } from '@material-ui/core';
import CheckpointsList from './CheckpointsList';
import Typography from '@material-ui/core/Typography';
import Scrollbar from 'react-scrollbars-custom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const styles = theme => ({
  picture: {
    flex: '0 1 auto',
    maxWidth: '50vh',
    height: 345,
    margin: '1rem',
    border: 'solid 3px #3f51b5',
    borderRadius: 16,
    objectFit: 'contain',
    backgroundColor: '#e8eaf6'
  },
  section: {
    backgroundColor: '#fafafa'
  },
  equip: {
    display: 'flex!important',
    flexDirection: 'row!important',
    justifyContent: 'space-evenly'
  },
  titles: {
    flexDirection: 'column',
    margin: 16,
    color: '#1d1d1d',
    flex: '1 0 auto'
  },
  scrollArea: {
    margin: 16,
    padding: 8,
    [theme.breakpoints.up('xs')]: {
      minHeight: 400
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 480,
    },
    overflowY: 'visible'
  },
  fieldset: {
    flex: 1,
    margin: 24,
    marginTop: 'initial',
    marginBottom: 'initial',
    borderRadius: '8px',
    borderColor: '#3f51b5',
  },
  infos: {
    flex: 'initial',
    margin: 'auto',
    marginTop: 'inherit',
  },
  datas:{
    fontSize: 'initial',
  },
  header: {
    backgroundColor: '#3f51b5'
  },
  card: {
    borderRadius: 16,
    margin: 24
  },
  headerTitle: {
    color: '#fff'
  },
  legend: {
    fontSize: '20px',
    color: '#3f51b5',
    fontWeight: '500',
  },
  labels: {
    fontSize: '19px',
  },
  main: {
    display: 'inline-flex'
  }
});

class EquipmentDetail extends Component {

  state = {
    loading: true,
    checkpoints: [],
  };

  componentDidMount() {
    const refCheckpoint = database.ref('checkpoints');

    refCheckpoint.orderByChild('_EquipementID').equalTo(this.props.location.state.equip.__equipementID).on('value', snapshot => {
      this.setState({
        checkpoints: Object.values(snapshot.val()),
        loading:false
      });

    });

  }

  render() {
    const {classes} = this.props;
    const equip = this.props.location.state.equip;
    const urlPicture = this.props.location.state.url;

    if (this.state.loading) {
      return <LinearIndeterminate/>;
    }
    return(
      <div>
        <SearchAppBar history={this.props.history} />
        <div className={classes.section}>
          <div className={classes.main}>
            <img src={urlPicture} className={classes.picture} alt={'photo_équipement'}/>
            <div className={classes.titles}>
              <h3>Equipement : {equip.nom}</h3>
              <h3>Domaine : {equip.info_domaine}</h3>
              <h3>ID : {equip.__equipementID}</h3>
            </div>
          </div>
          <div className={classes.equip}>
            <fieldset className={classes.fieldset}>
              <legend className={classes.legend}>INFORMATIONS</legend>
              <Typography className={classes.labels}>Batiment : <span className={classes.datas}>{equip.info_batiment}</span></Typography>
              <Typography className={classes.labels}>Domaine : <span className={classes.datas}>{equip.info_domaine}</span></Typography>
              <Typography className={classes.labels}>Année de mise en service : <span className={classes.datas}>{equip.info_anneeMiseEnService}</span></Typography>
              <Typography className={classes.labels}>Marque : <span className={classes.datas}>{equip.info_marque}</span></Typography>
              <Typography className={classes.labels}>Modele : <span className={classes.datas}>{equip.info_modele}</span></Typography>
              <Typography className={classes.labels}>Niveau : <span className={classes.datas}>{equip.info_niveau}</span></Typography>
            </fieldset>

            <fieldset className={classes.fieldset}>
              <legend className={classes.legend}>TECHNIQUES</legend>
              <Typography className={classes.labels}>Notes : <span className={classes.datas}>{equip.tech_priseDeNotes}</span></Typography>
              <Typography className={classes.labels}>Quantité : <span className={classes.datas}>{equip.tech_quantite}</span></Typography>
              <Typography className={classes.labels}>Numéro de série : <span className={classes.datas}>{equip.tech_serialNumber}</span></Typography>
              <Typography className={classes.labels}>Statut : <span className={classes.datas}>{equip.tech_statut}</span></Typography>
            </fieldset>
          </div>
          <Card classes={{root: classes.card}}>
            <CardHeader
              title={'Points de contrôle de l\'équipement'}
              classes={{root: classes.header, title: classes.headerTitle}}
            />
            <CardContent>
              <Scrollbar className={classes.scrollArea}>
                <CheckpointsList checkpoints={this.state.checkpoints}/>
              </Scrollbar>
            </CardContent>
          </Card>

        </div>

      </div>
    );
  }
}

export default withStyles(styles)(EquipmentDetail);