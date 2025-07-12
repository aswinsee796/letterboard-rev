import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import neImg from '../assets/yelmov.png';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo + Name */}
        <div className="flex items-center space-x-3">
          <img src={neImg} alt="Logo" className="h-12 w-12 rounded-full" />
          <span className="text-white text-2xl font-bold">Letterboard</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/">
            <button className="text-white px-4 py-2 rounded hover:bg-gray-700">
              Home
            </button>
          </Link>
          <Link to="/view">
            <button className="text-white px-4 py-2 rounded hover:bg-gray-700">
              Watched
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-2">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <button className="text-white w-full text-left px-4 py-2 hover:bg-gray-700 rounded">
              Home
            </button>
          </Link>
          <Link to="/view" onClick={() => setMenuOpen(false)}>
            <button className="text-white w-full text-left px-4 py-2 hover:bg-gray-700 rounded">
              Watched
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
