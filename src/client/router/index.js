import React from "react";
import { HashRouter, Route, Switch } from 'react-router-dom';
// components
import Alerts from '../components/Alerts'

// pages
import HomePage from '../pages/home/Home'
import Room from '../pages/_room/Room'
import ErrorPage from '../pages/notfound/ErrorPage'

import SocketListener from '../listeners/SocketListener'
import { SocketContext } from "../context/SocketContext";
import { useEffect, useContext } from 'react';


export default () => {
  const { socketClient } = useContext(SocketContext);
  SocketListener(socketClient);
  return (
    <div>
      <HashRouter hashType="noslash">
        <Alerts />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/:uuidRoom[:login]" component={Room} />
          <Route component={ErrorPage} />
        </Switch>
      </HashRouter>
    </div>
  )
}
