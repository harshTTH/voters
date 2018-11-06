import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminForm from "./Components/AdminForm";
import NewPoll from "./Components/NewPoll";

const Routes = props => (
  <Switch>
    <Route
      exact
      path="/"
      render={innerProps => (
        <AdminForm {...innerProps} handleLogin={props.handleLogin} />
      )}
    />
    <Route path="/addNewPoll" component={NewPoll} />
  </Switch>
);

export default Routes;
