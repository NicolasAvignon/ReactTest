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

function getNames(domains) {
  let names = [];
  domains.forEach(name => {
    names.push(name.info);
  });
  return names;
}

class FilteredEquipmentList extends React.Component {

    state = {
      name: []
    };

    handleChange = event => {
      this.setState({
        name: event.target.value
      });
    };

    render() {
      let filteredEquipments = this.props.data.equipements.filter(
        (equipement) => {
          return this.state.name.includes(equipement.info_domaine) === true;
        }
      );

      const { classes } = this.props;
      const names = getNames(this.props.data.domaines);

      const equiList = this.state.name.length === 0
        ?
        this.props.data.equipements.map((equipment, i) =>
          <EquipmentCard key={i} equip={equipment} redirect={this.props.redirect}/>
        )
        :
        filteredEquipments.map((equipment, i) =>
          <EquipmentCard key={i} equip={equipment} redirect={this.props.redirect}/>
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
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {names.map(name => (
                <MenuItem key={name} value={name} style={getStyles(name, this)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            {equiList}
          </div>
        </div>
      );
    }
}

FilteredEquipmentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FilteredEquipmentList);
