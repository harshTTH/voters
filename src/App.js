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
				  <Routes />
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
>>>>>>> b03238f4a7f0c513d958821cb59d687c859ca5eb
}

export default withStyles(styles)(App);
