import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/artist.css";

const Artist = (props) => {
  const [albums, setAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtist, setRelatedArtist] = useState([]);

  const location = useLocation();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const artistId = location.state.id;

    fetchAlbums(artistId);
    fetchTopTracks(artistId);
    fetchRelatedArtists(artistId);
  }, [location.state]);

  const fetchAlbums = async (id) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAlbums(response.data.items);
  };

  const fetchTopTracks = async (id) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTopTracks(response.data.tracks);
  };

  const fetchRelatedArtists = async (id) => {
    console.log(id);
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data.artists);
    setRelatedArtist(response.data.artists);
  };

  const playSong = (url) => {
    const song = new Audio(url);

    song.play();
  };

  const pauseSong = (url) => {
    const song = new Audio(url);

    song.pause();
  };

  return (
    <div>
      <h1>{location.state.name}</h1>
      <h2>Albums</h2>
      <div className="album-list">
        {albums.map((elem) => (
          <div>
            <>{elem.name}</>
            <img src={elem.images[0]?.url} alt="album cover" />
          </div>
        ))}
      </div>

      <h2>Top Tracks</h2>
      <div className="album-list">
        {topTracks.map((elem) => (
          <div>
            <>{elem.name}</>
            <img
              src={elem.album.images[0]?.url}
              alt="album cover"
              onClick={() => playSong(elem.preview_url)}
            />
            <button onClick={() => pauseSong(elem.preview_url)}>pause</button>
          </div>
        ))}
      </div>

      <h2>Related Artists</h2>
      <div className="album-list">
        {relatedArtist.map((elem) => (
          <div>
            <>{elem.name}</>
            <Link
              to={`/artist/${elem.name.replace(" ", "_")}`}
              state={{ id: elem.id, name: elem.name }}
            >
              <img src={elem.images[0]?.url} alt="artist-foto" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artist;
