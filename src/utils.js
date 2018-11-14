import Cookies from "js-cookie";
let webSocket;

const getSession = () => {
  const ss = Cookies.get("JSESSIONID");
  if (ss) return true;
  else return false;
};

const logout = () => {
  const ss = Cookies.get("JSESSIONID");
  console.log(ss);
  if (ss) {
    Cookies.remove("JSESSIONID");
    window.location.reload(true);
  }
};

const initiateSocketConnection = () => {
  // Create WebSocket connection.
  if (webSocket) return webSocket;
  const socket = new WebSocket("ws://localhost:8080");

  // Connection opened
  socket.addEventListener("open", function(event) {
    console.log("Socket Connection Established");
  });
  webSocket = socket;
  return socket;
};

export { getSession, logout, initiateSocketConnection };
