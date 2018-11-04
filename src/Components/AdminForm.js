import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { loginRequest } from "../requests";

const styles = theme => ({
  root: {
    marginTop: 100
  },
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
    password: ""
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
    loginRequest(this.state.email, this.state.password);
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root} raised>
        <CardHeader title="Admin Login" />
        <form
          className={classes.container}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
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
    );
  }
}

export default withStyles(styles)(AdminForm);
