import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import { getSession } from "../utils";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class AdminPanel extends React.Component {
  render() {
    return (
      <div>{getSession() ? <div>Admin Panel</div> : <Redirect to="/" />}</div>
    );
  }
}

export default withStyles(styles)(AdminPanel);
