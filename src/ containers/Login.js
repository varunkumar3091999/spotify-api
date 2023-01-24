import {
  AUTH_ENDPOINT,
  CLIENTID,
  REDIRECT_URI,
  RESPONSE_TYPE,
} from "../constants";

const Login = () => {
  // const logout = () => {
  //   setToken("");
  //   window.localStorage.removeItem("token");
  // };

  return (
    <a
      href={`${AUTH_ENDPOINT}?client_id=${CLIENTID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
    >
      Login to Spotify
    </a>
  );
};

export default Login;
