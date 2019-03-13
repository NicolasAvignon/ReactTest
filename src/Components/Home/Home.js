import React, { Component } from 'react';
import SearchAppBar from '../AppBar/AppTopBar';
import {withStyles} from '@material-ui/core';
import LinearIndeterminate from '../Utils/LinearLoading';
import SelectChips from '../FilteredEquipmentList/FilteredEquipmentList';
import {database} from '../../Database/firebase';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  }
});

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      domaines: [],
      equipements: [],
    };
  }

  componentDidMount() {
    const refEquipement = database.ref('equipements');
    const refDomaine = database.ref('domaines');
    refDomaine.on('value', snapshot => {
      this.setState({
        domaines: snapshot.val()
      });
    });
    refEquipement.on('value', snapshot => {
      this.setState({
        equipements: snapshot.val(),
        loading: false
      });
    });
  }

    redirectToDetails = (equip, url) => {
      this.props.history.push({
        pathname: '/detail/'+ equip.__equipementID,
        state: {
          equip: equip,
          url: url
        }
      });
    };



    render() {
      const { classes } = this.props;

      if (this.state.loading) {
        return <LinearIndeterminate/>;
      }
      return(
            <>
                <SearchAppBar history={this.props.history}/>
                <main className={classes.main}>
                  <SelectChips data={this.state} redirect={this.redirectToDetails}/>
                </main>
            </>
      );
    }
}

export default withStyles(styles) (Home);