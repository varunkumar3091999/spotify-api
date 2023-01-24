import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/artist.css";

const Artist = (props) => {
  const [albums, setAlbums] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const artistId = location.state.id;
    fetchAlbums(artistId);
  }, []);

  const fetchAlbums = async (id) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums`
    );

    console.log(response);
    setAlbums(response.data.items);
  };

  return (
    <div>
      <h1>{location.state.name}</h1>
      <div className="album-list">
        {albums.map((elem) => (
          <div>
            <>{elem.name}</>
            <img src={elem.images[0]?.url} alt="album cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artist;
