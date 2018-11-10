import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Components/Header";
import Routes from "./Routes";
import "./App.css";
import { getSession } from "./utils";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  custom: {
    marginTop: 100
  }
});

class App extends Component {
  state = {
    loggedIn: getSession()
  };

  handleLogin = login => {
    this.setState({
      loggedIn: login
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Grid spacing={24} container alignItems="center" direction="column">
            <Grid item xs={12}>
              <Header loggedIn={this.state.loggedIn} />
            </Grid>
            <Grid item xs={12} className={classes.custom}>
              <Routes handleLogin={this.handleLogin} />
            </Grid>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
