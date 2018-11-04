import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Components/Header";
import Routes from "./Routes";
import "./App.css";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class App extends Component {
<<<<<<< HEAD
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid spacing={24} container alignItems="center" direction="column">
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={6}>
            <AdminForm />
          </Grid>
        </Grid>
      </div>
    );
  }
=======
	render() {
		const {classes} = this.props;
		return (<div className={classes.root}>
			<Grid spacing={24} container alignItems="center" direction="column">
				<Grid item xs={12}>
					<Header/>
				</Grid>
				<Grid item xs={6}>
					<Routes/>
				</Grid>
			</Grid>
		</div>);
	}
>>>>>>> 894e9646836a3e973c86f1fbb3ccab084605db32
}

export default withStyles(styles)(App);
