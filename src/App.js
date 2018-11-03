import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import Header from "./Components/Header";
import AdminForm from "./Components/AdminForm";
import "./App.css";

const styles = theme => ({
	root: {
		flexGrow: 1
	}
});

class App extends Component {
	render() {
		const {classes} = this.props;
		return (<div className={classes.root}>
			<Grid spacing={24} container alignItems="center" direction="column">
				<Grid item xs={12}>
					<Header/>
				</Grid>
				<Grid item xs={6}>
					<AdminForm/>
				</Grid>
			</Grid>
		</div>);
	}
}

export default withStyles(styles)(App);
