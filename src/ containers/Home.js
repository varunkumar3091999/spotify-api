import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const [artists, setArtists] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!!searchText) {
      const debounse = setTimeout(() => {
        search();
      }, 1000);

      return () => clearTimeout(debounse);
    } else {
      setArtists([]);
      return;
    }
  }, [searchText]);

  const search = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchText,
        type: "artist",
      },
    });
    setArtists(response.data.artists.items);
  };

  return (
    <div>
      <input onChange={(e) => setSearchText(e.target.value)} />

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
    </div>
  );
};

export default Home;
