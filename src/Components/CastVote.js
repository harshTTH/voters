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
import { Redirect } from "react-router";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  progress: {
    margin: theme.spacing.unit * 2
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
      vote: "",
      submit: false,
      open: true,
      finalSubmit: false
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
      this.setState({ submit: true, open: true });
    }
  };

  handleClose = event => {
    event.preventDefault();
    let select = event.currentTarget.value;
    if (select === "disagree") {
      this.setState({ finalSubmit: false, vote: "", submit: false });
      console.log("IN DISAGREE");
    } else if (select === "agree") {
      this.setState({ finalSubmit: true });
      console.log("IN AGREE");

      //TEMP CODE
      // fetchCandidates({
      //   vote: this.state.vote,
      //   pollTitle: this.state.pollTitle
      // }).then(response => {
      //   if (response) {
      //     this.setState({ submit: true });
      //   }
      // });
    }
    this.setState({ open: false });
  };

  confirmVote = () => {
    return (
      <Dialog
        open={this.state.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you confirm your vote ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You confirm by clicking agree to vote "{this.state.vote}" .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose}
            value="disagree"
            color="secondary"
            type="submit"
            autoFocus
          >
            Disagree
          </Button>
          <Button
            onClick={this.handleClose}
            value="agree"
            color="primary"
            type="submit"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  render() {
    let { classes } = this.props;
    console.log("SUBMIT VALUE .. " + this.state.submit);
    return (
      <div>
        {this.state.candidates.length < 0 ? (
          <div>
            <CircularProgress
              className={classes.progress}
              color="secondary"
              size={60}
            />
          </div>
        ) : this.state.finalSubmit ? (
          <Redirect to="/voter" />
        ) : this.state.submit ? (
          this.confirmVote()
        ) : (
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
        )}
      </div>
    );
  }
}

export default withStyles(styles)(CastVote);
