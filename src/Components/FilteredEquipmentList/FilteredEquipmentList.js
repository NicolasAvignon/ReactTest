import React from 'react';
import PropTypes  from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import EquipmentCard from './EquipmentCard/EquipmentCard';
import { styles } from './FilteredEquipmentList.style';
import Scrollbar from 'react-scrollbars-custom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

function getStyles(name, that) {
  return {
    fontWeight:
            that.state.name.indexOf(name) === -1
              ? that.props.theme.typography.fontWeightRegular
              : that.props.theme.typography.fontWeightMedium,
  };
}

function getDomains(domainsSent) {
  let domaines = [];
  domainsSent.forEach(domain => {
    domaines.push(domain);
  });
  return domaines;
}

class FilteredEquipmentList extends React.Component {

    state = {
      name: [],
      offset: 0,
      limit: 21
    };

    componentDidMount() {
      this.scrollBar.scrollToTop();
    }

  handleChange = event => {
      this.setState({
        name: event.target.value
      });
    };

    loadData = (scrollValues) => {
      // si on est en bas de la page
      const bottom = scrollValues.scrollHeight - scrollValues.scrollTop <= (scrollValues.clientHeight);
      if(bottom) {
        this.setState((state) => ({
          limit: state.limit + 21,
        }));
      }
    };

    getLabel = (domaines, value) => {
      let label = '';
      domaines.forEach((dom) => {
        if(dom.info === value) {
          label = dom.nom;
        }
      });
      return label;
    };

    render() {
      let filteredEquipments = this.props.data.equipements.filter(
        (equipement) => {
          return this.state.name.includes(equipement.info_domaine) === true;
        }
      );

      const { classes } = this.props;
      const domaines = getDomains(this.props.data.domaines);

      const equiList = this.state.name.length === 0
        ?
        this.props.data.equipements.slice(this.state.offset, this.state.limit).map((equipment) =>
          <EquipmentCard key={equipment.__equipementID} equip={equipment} redirect={this.props.redirect}/>
        )
        :
        filteredEquipments.slice(this.state.offset, this.state.limit).map((equipment) =>
          <EquipmentCard key={equipment.__equipementID} equip={equipment} redirect={this.props.redirect}/>
        );

      return (
        <div className={classes.root}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-chip">Domaines</InputLabel>
            <Select
              multiple
              value={this.state.name}
              onChange={this.handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={this.getLabel(domaines,value)} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {domaines.map(domain => (
                <MenuItem key={domain.info} value={domain.info} style={getStyles(domain.info, this)}>
                  {domain.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <Scrollbar onScroll={this.loadData} style={{ width: '90vw', height: '90vh' }}  ref={ e=> this.scrollBar = e }>
              {equiList}
            </Scrollbar>
          </div>
        </div>
      );
    }
}

FilteredEquipmentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FilteredEquipmentList);
