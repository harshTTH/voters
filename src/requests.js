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
  axios.post("/addNewPoll", data).then(response => {
    console.log(response.data);
  });

const fetchPolls = () =>
  axios.get("/fetchPolls").then(response => {
    console.log(response.data);
  });

const fetchPollData = data => {
  axios.post("/pollData", data).then(response => {});
};
export { loginRequest, addPollRequest, fetchPolls, fetchPollData };
