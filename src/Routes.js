import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminForm from "./Components/AdminForm";
import NewPoll from "./Components/NewPoll";
import AdminPanel from "./Components/AdminPanel";

const Routes = props => (
  <Switch>
    <Route
      exact
      path="/"
      render={innerProps => (
        <AdminForm {...innerProps} handleLogin={props.handleLogin} />
      )}
    />
    <Route path="/adminPanel/addNewPoll" component={NewPoll} />
    <Route path="/adminPanel" component={AdminPanel} />
  </Switch>
);

export default Routes;
