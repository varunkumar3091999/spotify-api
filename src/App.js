import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Artist from "./ containers/Artist";
import Home from "./ containers/Home";
import Login from "./ containers/Login";
import Search from "./ containers/Search";

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  // if (!token) {
  //   return <Login />;
  // }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/artist/:name" element={<Artist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
