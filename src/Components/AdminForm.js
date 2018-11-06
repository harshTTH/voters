import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { loginRequest } from "../requests";
import AdminPanel from "./AdminPanel";

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
    loggedIn: false
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
          loggedIn: true
        });
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.loggedIn ? (
          <AdminPanel />
        ) : (
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
        )}
      </div>
    );
  }
}

export default withStyles(styles)(AdminForm);
