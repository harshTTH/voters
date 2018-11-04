import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

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

class VotingForm extends Component {
  state = {  
    title: "",
    noOfCandidates: "",
    candidates: []
  };

	handleChange = event => {
		if(event.target.name === "title") {
			this.setState({
				title:event.target.value
			})
		}else if(event.target.name.match(/candidate/g)) {
      let txt = event.target.name;
      let index = txt.match(/\d/g);
      index = index.join("");
      let candidates = [...this.state.candidates];
      candidates[index] = { ...candidates[index], key: event.target.value };
      // console.log(candidates);
			this.setState({
				candidates
			})
		}else if(event.target.name === "noOfCandidate") {
      this.setState({
        noOfCandidates:event.target.value
      })
    }
	}

	handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.candidates);
    
		console.log("FUCK Happened");
	}

  makeCandidates = (noOfCandidates) => {
    let array = [], inputs = []
    for (let i = 0; i < noOfCandidates; i++) {
      array.push(i);
    }    
    inputs = array.map((number) =>     
      <Input placeholder={`Candidate ${number}`} type="text" inputProps={{
        "aria-label" : "Description"
      }} name={`candidate ${number}`} onChange={this.handleChange} key={number} required/>
    );
    return inputs
  }

  render() { 
    const {classes} = this.props;     
    return (
      <Card className={classes.root} raised>
        <CardHeader title="New Poll"/>
        <form  autoComplete="off" className={classes.container} onSubmit={this.handleSubmit}>
          <CardContent>
            <Input className={classes.input} placeholder="Title of Poll" name="title" type="text" inputProps={{
                "aria-label" : "Description"
              }} onChange={this.handleChange} value={this.state.title} required/>
            <Input className={classes.input} placeholder="No. of candidates" type="number" inputProps={{
                "aria-label" : "Description"
              }} name="noOfCandidate" onChange={this.handleChange} value={this.state.noOfCandidates}  required/>
            <br/>
            {this.makeCandidates(this.state.noOfCandidates)}
          </CardContent>
          <CardActions>
            <Button className={classes.button} variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}
 
export default withStyles(styles)(VotingForm);