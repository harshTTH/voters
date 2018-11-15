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
  CircularProgress,
  LinearProgress
} from "@material-ui/core";
import ErrorSnack from "./ErrorSnack";
import {
  fetchPolls,
  fetchPollData,
  verifyVoter,
  createOtpRequest,
  verifyOTP
} from "../requests";
import { logout } from "../utils";
import { Redirect } from "react-router";

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
      mobile: "",
      otp: false,
      otpVal: "",
      process: false,
      error: false,
      message: "",
      next: false
    };
  }

  componentDidMount() {
    console.log("fecthing polls");
    fetchPolls().then(response => this.setState({ list: response.all }));
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClose = () => this.setState({ error: false });

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ process: true });
    verifyVoter({
      poll_id: this.state.poll,
      number: this.state.mobile
    }).then(res => {
      if (res) {
        createOtpRequest({ number: this.state.mobile }).then(res => {
          this.setState({ process: false });
          if (res) {
            this.setState({ otp: true });
          } else {
            this.setState({ error: true, message: "Unable to Send OTP" });
          }
        });
      } else {
        this.setState({ error: true, message: "Invalid Voter" });
      }
    });
  };

  handleOTPSubmit = event => {
    event.preventDefault();
    this.setState({ process: true });
    verifyOTP({
      number: this.state.mobile,
      otp: this.state.otpVal
    }).then(response => {
      if (response) {
        this.setState({ next: true });
      } else {
        this.setState({ error: true, message: "Wrong OTP" });
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.error && (
          <ErrorSnack
            open={this.state.error}
            message={this.state.message}
            onClose={this.onClose}
          />
        )}
        {this.state.next && <Redirect to="/castVote" />}
        {this.state.process ? (
          <Card className={classes.card}>
            <CardContent>
              <LinearProgress color="secondary" />
            </CardContent>
          </Card>
        ) : (
          <div>
            {this.state.otp ? (
              <form onSubmit={this.handleOTPSubmit}>
                <Card className={classes.card}>
                  <CardContent>
                    <Input
                      placeholder="OTP"
                      name="otpVal"
                      type="text"
                      className={classes.input}
                      inputProps={{
                        "aria-label": "Description"
                      }}
                      onChange={this.handleChange}
                      value={this.state.otpVal}
                      required
                    />
                  </CardContent>
                  <CardActions>
                    <Button type="submit">Next</Button>
                  </CardActions>
                </Card>
              </form>
            ) : (
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
                              <MenuItem value={poll.id_no}>
                                {poll.title}
                              </MenuItem>
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
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SelectPoll);
