import React, { Component } from 'react';
import { BrowserRouter, Route,Switch } from "react-router-dom";
import AdminForm from "./Components/AdminForm";
import NewPoll from "./Components/NewPoll";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path = "/" component = {AdminForm}/>
      <Route exact path = "/newPoll" component = {NewPoll}/>
    </Switch>
  </BrowserRouter>
)
 
export default Routes;