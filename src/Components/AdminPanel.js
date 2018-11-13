import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router";
import { getSession } from "../utils";
import { addPollRequest } from "../requests";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  CircularProgress
} from "@material-ui/core";

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
  }
});

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    let polls;
    if (this.props.location.state && this.props.location.state.parentData)
      polls = this.props.location.state.parentData;
    this.state = {
      polls: polls
    };
  }

  componentDidMount() {
    if (!this.state.polls && getSession()) {
      addPollRequest().then(response => {
        this.setState({ polls: response.all });
      });
    }
  }

  renderPolls = () => {
    let { classes } = this.props;
    let currentDate = new Date().toISOString().substr(0, 10);
    let expired, disabled;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={Number(16)}>
            {this.state.polls
              .sort((x, y) => x.poll_date[0] < y.poll_date[0])
              .map(poll => {
                if (poll.poll_date[0] >= currentDate) {
                  expired = { backgroundColor: "#FAFAFA" };
                  disabled = false;
                } else {
                  expired = {
                    backgroundColor: "#BDBDBD"
                  };
                  disabled = true;
                }
                return (
                  <Grid key={poll.id_no[0]} item>
                    <Card
                      className={classes.card}
                      align="center"
                      style={expired}
                      raised={!disabled}
                    >
                      <CardContent>
                        <Typography variant="h5" component="h2">
                          {poll.title[0]}
                        </Typography>
                        <Divider />
                        <Typography component="p">
                          Poll Date :-
                          {poll.poll_date[0]}
                          <br />
                          {disabled ? "(Poll Expired)" : ""}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" disabled={disabled}>
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    let { classes } = this.props;
    return (
      <div>
        {this.state.polls && getSession() ? (
          this.renderPolls()
        ) : getSession() ? (
          <CircularProgress className={classes.progress} />
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(AdminPanel);
