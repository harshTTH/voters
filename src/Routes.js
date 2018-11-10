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
    <Route exact path="/adminPanel/addNewPoll" component={NewPoll} />
    <Route exact path="/adminPanel" component={AdminPanel} />
    <Route exact path="/voter" component={SelectPoll} />
  </Switch>
);

export default Routes;
