import React, { createContext, useEffect, useState } from "react";
import * as api from "../api/moviesapi";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [watchedMovies, setWatchedMovies] = useState([]);

  // Load all movies on mount
  useEffect(() => {
    api.getAllMovies()
      .then((res) => setWatchedMovies(res.data))
      .catch((err) => console.error("Fetch failed", err));
  }, []);

  const addMovie = (movie) => {
    api.addMovie(movie)
      .then((res) => setWatchedMovies([...watchedMovies, res.data]))
      .catch((err) => console.error(err));
  };

  const deleteMovie = (id) => {
    api.deleteMovie(id)
      .then(() => setWatchedMovies(watchedMovies.filter((m) => m.id !== id)))
      .catch((err) => console.error(err));
  };

  const editMovie = (updatedMovie) => {
    api.updateMovie(updatedMovie.id, updatedMovie)
      .then((res) =>
        setWatchedMovies(watchedMovies.map((m) => m.id === updatedMovie.id ? res.data : m))
      )
      .catch((err) => console.error(err));
  };

  return (
    <MovieContext.Provider value={{ watchedMovies, addMovie, deleteMovie, editMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
