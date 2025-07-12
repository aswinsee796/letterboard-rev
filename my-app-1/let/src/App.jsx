// App.jsx
import React from 'react'
import Navbar from './components/navbar'
import Home from './components/home'
import Watched from './components/view'
import {BrowserRouter as  Router ,Routes, Route } from 'react-router-dom'
import { MovieProvider } from './context/moviecontext'

export default function App() {
  return (
    <MovieProvider>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<Watched />} />
      </Routes>
      </Router>
    </MovieProvider>
  )
}
// App.jsx
// import React from 'react';
// import Navbar from './components/navbar';
// import Home from './components/home';
// import Watched from './components/view';
// import { Routes, Route } from 'react-router-dom';
// import { MovieProvider } from './context/moviecontext';

// export default function App() {
//   return (
//     <MovieProvider>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/view" element={<Watched />} />
//       </Routes>
//     </MovieProvider>
//   );
// }
