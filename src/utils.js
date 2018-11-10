import Cookies from "js-cookie";

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
export { getSession, logout };
