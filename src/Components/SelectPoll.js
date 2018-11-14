import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Button,
  Typography,
  CardActions,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Input,
  CircularProgress
} from "@material-ui/core";
import {
  fetchPolls,
  fetchPollData,
  verifyVoter,
  createOtpRequest
} from "../requests";
import { logout } from "../utils";

const styles = theme => ({
  card: {
    minWidth: 375
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  select: {
    minWidth: 200
  },
  input: {
    margin: theme.spacing.unit
  },
  title: {
    fontSize: 16
  },
  pos: {
    marginBottom: 12
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    display: "inline"
  }
});

class SelectPoll extends React.Component {
  constructor(props) {
    super();
    logout();
    this.state = {
      list: [],
      poll: "",
      mobile: ""
    };
  }

  componentDidMount() {
    console.log("fecthing polls");
    fetchPolls().then(response => this.setState({ list: response.all }));
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.prevetDefault();
    verifyVoter({
      poll: this.state.poll,
      mobile: this.state.mobile
    }).then(res => {
      if (res)
        createOtpRequest({ mobile: this.state.mobile }).then(res => {
          if (res)
            fetchPollData({
              poll: this.state.poll,
              mobile: this.state.mobile
            }).then(res => {
              /*Create Vote Page*/
            });
        });
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Select Poll
            </Typography>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="poll">Poll</InputLabel>
              <div className={classes.wrapper}>
                <Select
                  name="poll"
                  value={this.state.poll}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "poll",
                    id: "poll"
                  }}
                  className={classes.select}
                  variant="filled"
                  required
                  disabled={this.state.list.length === 0}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.state.list &&
                    this.state.list.map(poll => (
                      <MenuItem value={poll.id_no}>{poll.title}</MenuItem>
                    ))}
                </Select>
                {this.state.list.length === 0 && (
                  <div style={{ display: "inline" }}>
                    <CircularProgress
                      className={classes.progress}
                      color="secondary"
                      size={20}
                    />
                    Loading Polls
                  </div>
                )}
              </div>
            </FormControl>
            <br />
            <Input
              placeholder="Mobile Number"
              name="mobile"
              type="tel"
              className={classes.input}
              inputProps={{
                "aria-label": "Description"
              }}
              onChange={this.handleChange}
              value={this.state.mobile}
              required
            />
          </CardContent>
          <CardActions>
            <Button type="submit">Next</Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default withStyles(styles)(SelectPoll);
