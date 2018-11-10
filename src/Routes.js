import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminForm from "./Components/AdminForm";
import NewPoll from "./Components/NewPoll";
import AdminPanel from "./Components/AdminPanel";
import SelectPoll from "./Components/SelectPoll";

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
    <Route path="/voter" component={SelectPoll} />
  </Switch>
);

export default Routes;
