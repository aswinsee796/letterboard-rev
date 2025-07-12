import React, { useEffect, useState } from 'react';

function Watched() {
  const [movies, setMovies] = useState([]);
  const [editingMovieId, setEditingMovieId] = useState(null);
  const [editedReview, setEditedReview] = useState('');
  const [editedRating, setEditedRating] = useState('');

  // Fetch all movies from backend on component load
  useEffect(() => {
    fetch("http://localhost:8080/Movies/getmov")
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Error fetching movies:", err));
  }, []);

  const handleEditClick = (movie) => {
    setEditingMovieId(movie.id);
    setEditedReview(movie.review);
    setEditedRating(movie.rating);
  };

  const handleSave = async (movie) => {
    const updatedMovie = {
      ...movie,
      review: editedReview,
      rating: editedRating,
    };

    try {
      const res = await fetch(`http://localhost:8080/Movies/update/${movie.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMovie),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updated = await res.json();
      setMovies(prev =>
        prev.map(m => (m.id === movie.id ? updated : m))
      );
      setEditingMovieId(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/Movies/delete/${id}`, {
        method: "DELETE",
      });
      setMovies(prev => prev.filter(movie => movie.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const moviesByMonth = movies.reduce((acc, movie) => {
    acc[movie.month] = acc[movie.month] || [];
    acc[movie.month].push(movie);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Watched Movies</h1>

      {Object.keys(moviesByMonth).length === 0 && (
        <p className="text-gray-400">No reviews submitted yet.</p>
      )}

      {Object.entries(moviesByMonth).map(([month, movies]) => (
        <div key={month} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{month}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-700 p-4 rounded shadow-md flex items-start gap-4"
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.movieName}
                  className="w-24 h-36 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{movie.movieName}</h3>
                  {editingMovieId === movie.id ? (
                    <>
                      <input
                        type="text"
                        value={editedRating}
                        onChange={(e) => setEditedRating(e.target.value)}
                        className="w-full bg-gray-600 text-white p-1 mt-2 rounded"
                      />
                      <textarea
                        value={editedReview}
                        onChange={(e) => setEditedReview(e.target.value)}
                        className="w-full bg-gray-600 text-white p-1 mt-2 rounded"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleSave(movie)}
                          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingMovieId(null)}
                          className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-300">Rating: {movie.rating}/10</p>
                      <p className="mt-2 text-gray-200">{movie.review}</p>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleEditClick(movie)}
                          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(movie.id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Watched;
