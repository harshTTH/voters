import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router";
import { getSession } from "../utils";
import { fetchPolls } from "../requests";
import { Card, CardContent } from "@material-ui/core";


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  gridRoot: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
});

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    let polls;
    if (this.props.location.state && this.props.location.state.parentData)
      polls = this.props.location.state.parentData;
    this.state = {
      polls
    };
  }

  componentDidMount() {
    if (!this.state.polls) {
      fetchPolls().then(response => this.setState({ polls: response.all }));
    }
  }

  renderPolls = () => {
    let { classes } = this.props;
    let currentDate = new Date().toISOString().substr(0, 10);

    console.log(this.state.polls.all);
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={Number(16)}>  
            {
              this.state.polls.all
              .sort((x, y) => x.poll_date > y.poll_date)
              .map(poll => (
                poll.poll_date > currentDate ? (
                  <Grid key={poll.id_no} item>            
                    <Paper className={classes.paper} align='center'>
                      <Typography paragraph variant='h6'>
                        {poll.title}
                      </Typography>
                    </Paper>
                  </Grid> 
                ) : (
                  <Grid key={poll.id_no} item>            
                    <Paper className={classes.paper} align='center' style={{backgroundColor: "#ff5a44"}}>
                      <Typography paragraph variant='h6' style={{color: 'white'}}>
                        Poll Expired
                      </Typography>
                    </Paper>
                  </Grid> 
                )
              ))
            }              
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <div>{getSession() ? <div>Admin Panel</div> : <Redirect to="/" />}
      <br/>
      {this.state.polls ? this.renderPolls() : ""}
      </div>
    );
  }
}

export default withStyles(styles)(AdminPanel);
