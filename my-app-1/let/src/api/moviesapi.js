// src/api/movieapi.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/Movies"; // Update port if different

export const getAllMovies = () => axios.get(`${BASE_URL}/getmov`);
export const getMovieById = (id) => axios.get(`${BASE_URL}/getmov/${id}`);
export const addMovie = (movie) => axios.post(`${BASE_URL}/addmov`, movie);
export const updateMovie = (id, movie) => axios.put(`${BASE_URL}/update/${id}`, movie);
export const deleteMovie = (id) => axios.delete(`${BASE_URL}/delete/${id}`);
