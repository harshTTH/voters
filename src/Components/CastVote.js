import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  CircularProgress
} from "@material-ui/core";

import Radio from "@material-ui/core/Radio";
import green from "@material-ui/core/colors/green";
import { fetchCandidates } from "../requests";

const styles = theme => ({
  card: {
    minWidth: 275,
    minHeight: 150
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  gridRoot: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing.unit * 10
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  button: {
    margin: theme.spacing.unit * 4
  },
  radio: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {}
});

class CastVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollTitle: "New Poll",
      candidates: ["Candidate_1", "Candidate_2", "Candidate_3", "Candidate_4"],
      vote: ""
    };
  }

  componentDidMount = () => {
    console.log("Fetching Candidates");
    //Temp Code
    // fetchCandidates().then(response =>
    //   this.setState({ list: response.all, pollTitle: response.pollTitle })
    // );
  };

  handleVoteChange = event => {
    this.setState({ vote: event.target.value });
    console.log("Current Candidate :- " + event.target.value);
  };

  handleSubmit = event => {
    console.log("VOTED :- " + this.state.vote);
    event.preventDefault();
    if (this.state.vote) {
      fetchCandidates({
        vote: this.state.vote,
        pollTitle: this.state.pollTitle
      });
    }
  };

  render() {
    let { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={Number(16)}>
              {this.state.candidates.map(candidate => (
                <Grid key={candidate} item>
                  <Card className={classes.card} align="center" raised>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {candidate}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <Radio
                      checked={this.state.vote === candidate}
                      onChange={this.handleVoteChange}
                      value={candidate}
                      name="candidate"
                      aria-label="A"
                      classes={{
                        root: classes.radio,
                        checked: classes.checked
                      }}
                    />
                    <CardContent />
                  </Card>
                </Grid>
              ))}
              <CardActions>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                >
                  Cast Vote
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(CastVote);
