import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const base_url = "https://image.tmdb.org/t/p/original";
const base_image =
  "https://bashooka.com/wp-content/uploads/2013/01/movie-poster-mashups-19.jpg";

const Row = ({ title, fetchUrl, isLargeRow, isSearch, searchMovieUrl }) => {
  const [movies, setMovies] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl || searchMovieUrl);
      setMovies(request.data.results);
      setLoading(false);
      return request;
    }
    fetchData();
  }, [fetchUrl, searchMovieUrl]);

  const opts = {
    height: "390px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  console.log(movies);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function onFilmSelect(movie) {
    setIsOpen(true);
    setSelectedFilm(movie);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="row">
      {/* {loading ? (
        <h2>Loading...</h2>
      ) : (
        <> */}
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <>
            <img
              key={movie.id}
              onClick={
                isLargeRow
                  ? () => handleClick(movie)
                  : () => onFilmSelect(movie)
              }
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow || isSearch
                  ? movie.poster_path
                  : movie.backdrop_path || movie.poster_path
              }`}
              alt={movie.name}
            />
          </>
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal_container">
          <img
            key={selectedFilm.id}
            className="modal__poster"
            src={`${base_url}${
              selectedFilm.backdrop_path || selectedFilm.poster_path
            }`}
            alt={selectedFilm.name}
          />
          <div className="modal_detail">
            <h2 className="modal_title">
              {selectedFilm.title || selectedFilm.name}
            </h2>
            <p className="modal_info">{selectedFilm.overview}</p>
            <p className="modal_info">
              Avarage Vote: {selectedFilm.vote_average}
            </p>
            <p className="modal_info">
              Release Date: {selectedFilm.release_date}
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Row;
