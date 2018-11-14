import axios from "axios";

const loginRequest = (email, password) =>
  axios
    .post("/adminLogin", {
      email,
      password
    })
    .then(response => response.data)
    .catch(error => {});

const addPollRequest = data =>
  axios.post("/adminPanel/addNewPoll", data).then(response => response.data);

const fetchPolls = () =>
  axios.get("/fetchPolls").then(response => response.data);

const fetchPollData = data =>
  axios.post("/pollData", data).then(response => {});

const verifyVoter = data =>
  axios.post("/verifyVoter", data).then(response => response.data);

const createOtpRequest = data => {};

const fetchCandidates = data =>
  axios.post("/fetchCandidates", data).then(response => response.data);

export {
  loginRequest,
  addPollRequest,
  fetchPolls,
  fetchPollData,
  verifyVoter,
  createOtpRequest,
  fetchCandidates
};
