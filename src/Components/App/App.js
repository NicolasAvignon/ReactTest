import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../Home/Home';
import Detail from '../EquipmentDetail/EquipmentDetail';
import { Routes } from '../../Utils/Routes';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={Routes.HOME} component={Home}/>
          <Route path={Routes.DETAIL} component={Detail}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
