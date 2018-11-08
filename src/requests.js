import axios from "axios";

const loginRequest = (email, password) =>
  axios
    .post("/adminLogin", {
      email,
      password
    })
    .then(response => true)
    .catch(error => {});

const addPollRequest = data =>
  axios.post("/addNewPoll", data).then(response => true);

export { loginRequest, addPollRequest };
