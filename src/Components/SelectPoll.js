import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import { fetchPolls, fetchPollData } from "../requests";

const styles = theme => ({
  card: {
    minWidth: 375
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
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class SelectPoll extends React.Component {
  constructor(props) {
    super();
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
    fetchPollData({
      poll: this.state.poll,
      mobile: this.state.mobile
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
              <InputLabel htmlFor="age-simple">Poll</InputLabel>
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.state.list &&
                  this.state.list.map(poll => (
                    <MenuItem value={poll.id_no}>{poll.title}</MenuItem>
                  ))}
              </Select>
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
