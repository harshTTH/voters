import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminForm from "./Components/AdminForm";
import NewPoll from "./Components/NewPoll";
import AdminPanel from "./Components/AdminPanel";
import SelectPoll from "./Components/SelectPoll";
import CastVote from "./Components/CastVote";

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
    <Route exact path="/castVote" component={CastVote} />
  </Switch>
);

export default Routes;
