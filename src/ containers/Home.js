import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const [recentlyPlayedTracks, setDecentlyPlayedTracks] = useState([]);
  const [recentPlalists, setRecentPlaylists] = useState([]);
  const [myShows, setMyShows] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchrecentlyPlayedTracks();
    fetchRecentPlaylists();
    fetchMyShows();
  }, []);

  const fetchrecentlyPlayedTracks = async () => {
    var end = new Date().getTime();

    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=30",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    setDecentlyPlayedTracks(response.data.items);
  };

  const fetchRecentPlaylists = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRecentPlaylists(response.data.items);
  };

  const fetchMyShows = async () => {
    const response = await axios.get("https://api.spotify.com/v1/me/shows", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    setMyShows(response.data.items);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <Link to="/search">Find</Link>
      <button onClick={logout}>Logout</button>

      <h1>Greeting</h1>
      <div className="artist-list">
        {recentPlalists.map((elem) => (
          <div>
            <div>{elem.name}</div>
            <img src={elem.images[0].url} />
          </div>
        ))}
      </div>

      <h2>Recently Played</h2>

      <div className="artist-list">
        {recentlyPlayedTracks.map((elem) => (
          <div>
            <div>{elem.track.name}</div>
            <img src={elem.track.album.images[0].url} />
          </div>
        ))}
      </div>
      <h2>My Shows</h2>

      <div className="artist-list">
        {myShows.map((elem) => (
          <div>
            <div>{elem.show.name}</div>
            <img src={elem.show.images[0].url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
