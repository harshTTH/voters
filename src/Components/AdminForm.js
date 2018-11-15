import React, { Component } from "react";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { loginRequest } from "../requests";
import AdminPanel from "./AdminPanel";
import ErrorSnack from "./ErrorSnack";
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

  onClose = () => this.setState({ open: false });

  handleSubmit = event => {
    event.preventDefault();
    loginRequest(this.state.email, this.state.password).then(res => {
      if (res) {
        this.props.handleLogin(true);
        this.setState({
          loggedIn: true,
          open: false
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
            <ErrorSnack
              open={this.state.open}
              message="Incorrect Details"
              onClose={this.onClose}
            />
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
