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

const createOtpRequest = data => {
  const query =
    "http://control.msg91.com/api/sendotp.php?authkey=247358Ab938XcaE5bebfc1b&message=%23%23OTP%23%23&sender=VOTEMNG&mobile=91" +
    data.number;
  return axios.post(query).then(response => {
    if (response.data.type === "success") return true;
    return false;
  });
};

const verifyOTP = data => {
  const query = `https://control.msg91.com/api/verifyRequestOTP.php?authkey=247358Ab938XcaE5bebfc1b&mobile=91${
    data.number
  }&otp=${data.otp}`;

  return axios.post(query).then(response => {
    if (response.data.type === "success") return true;
    return false;
  });
};
export {
  loginRequest,
  addPollRequest,
  fetchPolls,
  fetchPollData,
  verifyVoter,
  createOtpRequest,
  verifyOTP
};
