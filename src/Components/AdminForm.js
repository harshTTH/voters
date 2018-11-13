import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Snackbar,
  SnackbarContent,
  IconButton
} from "@material-ui/core";
import classNames from "classnames";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import { loginRequest } from "../requests";
import AdminPanel from "./AdminPanel";
import { Redirect } from "react-router";
import { getSession } from "../utils";

const styles = theme => ({
  card: {
    maxWidth: 300
  },
  actions: {
    display: "flex"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  input: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  }
});

class AdminForm extends Component {
  state = {
    email: "",
    password: "",
    loggedIn: getSession(),
    open: false
  };

  handleChange = event => {
    if (event.target.name === "email") {
      this.setState({
        email: event.target.value
      });
    } else if (event.target.name === "password") {
      this.setState({
        password: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    loginRequest(this.state.email, this.state.password).then(res => {
      if (res) {
        this.props.handleLogin(true);
        this.setState({
          loggedIn: true,
          error: false
        });
      } else {
        this.setState({
          loggedIn: false,
          open: true
        });
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.loggedIn ? (
          <Redirect to="/adminPanel" />
        ) : (
          <div>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={() => this.setState({ open: false })}
            >
              <SnackbarContent
                className={classes.error}
                aria-describedby="client-snackbar"
                message={
                  <span id="client-snackbar" className={classes.message}>
                    <ErrorIcon
                      className={classNames(classes.icon, classes.iconVariant)}
                    />
                    Incorrect Details
                  </span>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={() => this.setState({ open: false })}
                  >
                    <CloseIcon className={classes.icon} />
                  </IconButton>
                ]}
              />
            </Snackbar>
            <Card raised>
              <CardHeader title="Admin Login" />
              <form className={classes.container} onSubmit={this.handleSubmit}>
                <CardContent>
                  <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    className={classes.input}
                    inputProps={{
                      "aria-label": "Description"
                    }}
                    onChange={this.handleChange}
                    value={this.state.email}
                    required
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    className={classes.input}
                    inputProps={{
                      "aria-label": "Description"
                    }}
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    LogIn
                  </Button>
                </CardActions>
              </form>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(AdminForm);
