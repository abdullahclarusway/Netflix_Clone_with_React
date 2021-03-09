import React, { useState, useEffect } from "react";
import "./Search.css";
import axios from "axios";
import requests from "./requests";
import Row from "./Row";

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState("Matrix");
  //   const apiKey = "7fc8d00ab1302c6aa7da237d2810116e"; //temporary
  //   const baseUrl = "https://api.themoviedb.org/3/search/movie";
  //   const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const API_KEY = "c8015b69e437a68b1b37cfb3bd3f2b19";
  //   const API_KEY = process.env.API_KEY;

  const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&&language=en-US&query=${searchKeyword}&page=1&include_adult=false"`;

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search your movie..."
        className="search__input"
        onChange={(e) => {
          setSearchKeyword(e?.target?.value);
        }}
      />
      <div className="search__result">
        <Row title="Movies" searchMovieUrl={searchMovieUrl} isSearch />
      </div>
    </div>
  );
};

export default Search;
