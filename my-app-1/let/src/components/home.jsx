import React, { useState, useContext } from 'react';
import { MovieContext } from '../context/moviecontext';


function Home() {
  const [image, setImage] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [movieName, setMovieName] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');


  // const { addMovie } = useContext(MovieContext);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await fetch("http://localhost:8080/Movies/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) throw new Error("Upload failed");
      const imageUrl = await res.text();
      setImage(imageUrl); // set actual URL from backend
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image");
    }
  };
  

  const handleSubmit = async () => {
    if (!movieName || !rating || !review || !image) {
      return alert("Fill all fields");
    }
  
    const reviewData = {
      movieName,
      rating,
      review,
      imageUrl: image,
      month: new Date().toLocaleString('default', { month: 'long' }),
    };
  
    try {
      const res = await fetch("http://localhost:8080/Movies/addmov", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
  
      if (!res.ok) throw new Error("Failed to add review");
  
      alert("Review submitted!");
  
      // Reset form
      setMovieName('');
      setRating('');
      setReview('');
      setImage(null);
    } catch (err) {
      console.error("Error:", err);
      alert("Error submitting review");
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-gray-900 rounded-lg shadow-lg flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
          {image ? (
            <img src={image} alt="Uploaded" className="rounded-md max-h-[400px] object-contain" />
          ) : (
            <p className="text-gray-400">Uploaded image will appear here</p>
          )}
        </div>

        <div className="w-[1px] bg-white bg-opacity-20 hidden md:block"></div>

        <div className="w-full md:w-1/2 p-6 space-y-4">
          <h2 className="text-xl font-bold mb-2">Submit a Movie Review</h2>

          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Movie Name"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-300"
          />

          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating (out of 10)"
            min="0"
            max="10"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-300"
          />

<input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  className="w-full p-2 rounded bg-gray-700 text-white"
/>

 
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-2 h-32 rounded bg-gray-700 text-white placeholder-gray-300"
          ></textarea>

          <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
