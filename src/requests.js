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

const fetchPollData = data => {
  axios.post("/pollData", data).then(response => {});
};

const createOtpRequest = data => {};
export { loginRequest, addPollRequest, fetchPolls, fetchPollData };
