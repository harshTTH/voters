import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import { getSession } from "../utils";
import { fetchPolls } from "../requests";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    let polls;
    if (this.props.location.state && this.props.location.state.parentData)
      polls = this.props.location.state.parentData;

    this.state = {
      polls
    };
  }

  componentDidMount() {
    if (!this.state.polls) {
      fetchPolls().then(response => this.setState({ polls: response.all }));
    }
  }
  render() {
    return (
      <div>{getSession() ? <div>Admin Panel</div> : <Redirect to="/" />}</div>
    );
  }
}

export default withStyles(styles)(AdminPanel);
