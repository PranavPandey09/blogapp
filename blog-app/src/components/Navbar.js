import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-right">
        <Link to="/mynewmessage">My New Message</Link>
        <Link to="/newpost">New Post</Link>
      </div>
    </nav>
  );
};

export default Navbar;
