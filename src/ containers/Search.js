import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Search = () => {
  const [searchText, setSearchText] = useState("");

  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [audioBooks, setAudioBooks] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [shows, setShows] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!!searchText) {
      const debounse = setTimeout(() => {
        searchArtists();
      }, 1000);

      return () => clearTimeout(debounse);
    } else {
      setArtists([]);
      return;
    }
  }, [searchText]);

  const searchArtists = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchText,
        type: "album,artist,playlist,track,show,episode,audiobook",
      },
    });

    setArtists(response.data.artists.items);
    setAlbums(response.data.albums.items);
    setAudioBooks(response.data.audiobooks.items);
    setEpisodes(response.data.episodes.items);
    setPlaylists(response.data.playlists.items);
    setShows(response.data.shows.items);
    setTracks(response.data.tracks.items);
  };

  return (
    <div>
      <input onChange={(e) => setSearchText(e.target.value)} />
      <Link to="/">Home</Link>

      {artists.length > 0 && <h2>Artists</h2>}
      <div className="artist-list">
        {artists.map((elem) => (
          <div>
            <div>{elem.name}</div>
            <Link
              to={`/artist/${elem.name.replace(" ", "_")}`}
              state={{ id: elem.id, name: elem.name }}
            >
              <img src={elem.images[0]?.url} alt="artist-foto" />
            </Link>
          </div>
        ))}
      </div>

      {albums.length > 0 && <h2>Albums</h2>}
      <div className="artist-list">
        {albums.map((elem) => (
          <div>
            <div>{elem.name}</div>
            <Link
              // to={`/album/${elem.name.replace(" ", "_")}`}
              state={{ id: elem.id, name: elem.name }}
            >
              <img src={elem.images[0]?.url} alt="artist-foto" />
            </Link>
          </div>
        ))}
      </div>

      {audioBooks.length > 0 && <h2>Audio Books</h2>}
      <div className="artist-list">
        {audioBooks.map((elem) => (
          <div>
            <div>{elem.name}</div>
            <Link
              // to={`/album/${elem.name.replace(" ", "_")}`}
              state={{ id: elem.id, name: elem.name }}
            >
              <img src={elem.images[0]?.url} alt="artist-foto" />
            </Link>
          </div>
        ))}
      </div>
      {episodes.length > 0 && <h2>Episodes</h2>}
      <div className="artist-list">
        {episodes.map((elem) => (
          <div>
            <div>{elem.name}</div>
            <Link
              // to={`/album/${elem.name.replace(" ", "_")}`}
              state={{ id: elem.id, name: elem.name }}
            >
              <img src={elem.images[0]?.url} alt="artist-foto" />
            </Link>
          </div>
        ))}
      </div>
      {playlists.length > 0 && <h2>Playlists</h2>}
      <div className="artist-list">
        {playlists.map((elem) => (
          <div>
            <div>{elem.name}</div>
            <Link
              // to={`/album/${elem.name.replace(" ", "_")}`}
              state={{ id: elem.id, name: elem.name }}
            >
              <img src={elem.images[0]?.url} alt="artist-foto" />
            </Link>
          </div>
        ))}
      </div>
      {shows.length > 0 && <h2>Shows</h2>}
      <div className="artist-list">
        {shows.map((elem) => (
          <div>
            <div>{elem.name}</div>
            <Link
              // to={`/album/${elem.name.replace(" ", "_")}`}
              state={{ id: elem.id, name: elem.name }}
            >
              <img src={elem.images[0]?.url} alt="artist-foto" />
            </Link>
          </div>
        ))}
      </div>
      {tracks.length > 0 && <h2>Tracks</h2>}
      <div className="artist-list">
        {tracks.map((elem) => (
          <div>
            <div>{elem.name}</div>
            {/* <Link
              // to={`/album/${elem.name.replace(" ", "_")}`}
              state={{ id: elem.id, name: elem.name }}
            > */}
            <img src={elem.album.images[0]?.url} alt="artist-foto" />
            {/* </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
