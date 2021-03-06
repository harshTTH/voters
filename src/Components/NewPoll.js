import React, { Component } from "react";
import XLSX from "xlsx";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CircularProgress
} from "@material-ui/core";
import { addPollRequest } from "../requests";
import { getSession } from "../utils";
import { Redirect } from "react-router";
import ErrorSnack from "./ErrorSnack";

const styles = theme => ({
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
  },
  file: {
    paddingRight: 100,
    paddingBottom: 5,
    marginLeft: 10
  }
});

class VotingForm extends Component {
  state = {
    title: "",
    date: "",
    noOfCandidates: "",
    candidates: [],
    voters: [],
    next: false,
    onProcess: false,
    open: false,
    message: ""
  };

  handleChange = event => {
    if (event.target.name === "title") {
      this.setState({
        title: event.target.value
      });
    } else if (event.target.name.match(/candidate/g)) {
      let txt = event.target.name;
      let index = txt.match(/\d/g);
      let candidates = [...this.state.candidates];

      index = index.join("");
      candidates[index] = event.target.value;
      this.setState({
        candidates
      });
    } else if (event.target.name === "noOfCandidate") {
      this.setState({
        noOfCandidates: event.target.value
      });
    } else if (event.target.name === "date") {
      if (event.target.value >= new Date().toISOString().substr(0, 10)) {
        this.setState({
          date: event.target.value
        });
      }
    }
  };

  onClose = () => this.setState({ open: false });

  handleSubmit = event => {
    event.preventDefault();
    if (this.checkCandidates()) {
      this.setState({ onProcess: true });
      addPollRequest({
        title: this.state.title,
        candidates: this.state.candidates,
        voters: this.state.voters,
        date: this.state.date
      }).then(response => {
        this.setState({ next: response.all });
      });
    } else {
      this.setState({ open: true, message: "Same Candidate Names!" });
    }
  };

  checkCandidates = () => {
    const candidates = this.state.candidates;
    for (let i = 0; i < candidates.length; i++) {
      if (candidates.indexOf(candidates[i]) !== i) return false;
    }
    return true;
  };

  parseExcel = event => {
    event.persist();
    var files = event.target.files,
      f = files[0];
    if (f) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        data = new Uint8Array(data);
        var workbook = XLSX.read(data, { type: "array" });
        const parsedData = createVotersData(workbook.Sheets.Sheet1);
        if (parsedData) {
          this.setState({ voters: parsedData });
        } else {
          event.target.value = "";
          this.setState({
            open: true,
            message:
              "Invalid File (Possible Duplicate Data or Unstructured file)"
          });
        }
      }.bind(this);
      reader.readAsArrayBuffer(f);
    }
  };

  makeCandidates = noOfCandidates => {
    let array = [],
      inputs = [];
    const { classes } = this.props;

    for (let i = 0; i < noOfCandidates; i++) {
      array.push(i);
    }
    inputs = array.map(number => (
      <Input
        className={classes.input}
        placeholder={`Candidate ${number + 1}`}
        type="text"
        inputProps={{
          "aria-label": "Description"
        }}
        name={`candidate ${number}`}
        onChange={this.handleChange}
        key={number}
        required
      />
    ));
    return inputs;
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {getSession() ? (
          this.state.next ? (
            <Redirect
              to={{
                pathname: "/adminPanel",
                state: { parentData: this.state.next }
              }}
            />
          ) : this.state.onProcess ? (
            <CircularProgress className={classes.progress} />
          ) : (
            <div>
              <ErrorSnack
                open={this.state.open}
                message={this.state.message}
                onClose={this.onClose}
              />
              <Card raised>
                <CardHeader title="New Poll" />
                <form
                  autoComplete="off"
                  className={classes.container}
                  onSubmit={this.handleSubmit}
                >
                  <CardContent>
                    <Input
                      className={classes.input}
                      placeholder="Title of Poll"
                      name="title"
                      type="text"
                      inputProps={{
                        "aria-label": "Description"
                      }}
                      onChange={this.handleChange}
                      value={this.state.title}
                      required
                    />
                    <Input
                      className={classes.input}
                      placeholder="No. of candidates"
                      type="number"
                      inputProps={{
                        "aria-label": "Description"
                      }}
                      name="noOfCandidate"
                      onChange={this.handleChange}
                      value={this.state.noOfCandidates}
                      required
                    />
                    <Input
                      className={classes.input}
                      placeholder="Date"
                      type="date"
                      inputProps={{
                        "aria-label": "Description"
                      }}
                      name="date"
                      onChange={this.handleChange}
                      value={this.state.date}
                      required
                    />
                    <br />
                    <Input
                      type="file"
                      className={classes.file}
                      accept=".xls,.xlsx"
                      onChange={this.parseExcel}
                      display="none"
                      required
                    />
                    <br />
                    {this.makeCandidates(this.state.noOfCandidates)}
                  </CardContent>
                  <CardActions>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </CardActions>
                </form>
              </Card>
            </div>
          )
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

const createVotersData = data => {
  let voters = [];
  let keys = Object.keys(data);
  let boundary = data["!ref"].split(":");

  let start = 0;
  let end = keys.length - 1;
  while (start < keys.length) {
    if (keys[start] === boundary[0]) {
      break;
    } else start++;
  }

  while (end >= 0) {
    if (keys[end] === boundary[1]) {
      break;
    } else end--;
  }

  for (let i = start; i <= end; i += 2) {
    let matchedName = data[keys[i]].w.match(/[a-zA-Z ]+/g);
    let matchedMobile = data[keys[i + 1]].w.match(/[0-9]/g);
    if (
      matchedName &&
      matchedName.length === 1 &&
      matchedMobile &&
      matchedMobile.length === 10
    ) {
      voters.push([matchedName[0], matchedMobile.join("")]);
    } else {
      return null;
    }
  }

  var tempset = new Set();
  for (let i = 0; i < voters.length; i++) {
    tempset.add(voters[i][1]);
  }
  if (tempset.size !== voters.length) {
    return null;
  }
  console.log(voters);
  return voters;
};

export default withStyles(styles)(VotingForm);
