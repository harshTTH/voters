import axios from "axios";

const loginRequest = (email, password) => (
  axios
    .post("/adminLogin", {
      email,
      password
    })
    .then(response => true)
    .catch(error => {})
);

export { loginRequest };
