import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class AdminPanel extends React.Component {
  render() {
    return <div>Admin Panel</div>;
  }
}

export default withStyles(styles)(AdminPanel);
