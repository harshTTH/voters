import axios from "axios";

const loginRequest = (email, password) => {
  axios
    .post("/adminLogin", {
      email,
      password
    })
    .then(response => {})
    .catch(error => {});
};

export { loginRequest };
