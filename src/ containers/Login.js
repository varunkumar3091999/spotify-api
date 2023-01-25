import {
  AUTH_ENDPOINT,
  CLIENTID,
  REDIRECT_URI,
  RESPONSE_TYPE,
} from "../constants";

const Login = () => {
  const scopes =
    "user-read-playback-position user-top-read user-read-recently-played user-library-read user-read-private user-follow-read";
  return (
    <a
      href={`${AUTH_ENDPOINT}?client_id=${CLIENTID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`}
    >
      Login to Spotify
    </a>
  );
};

export default Login;
