import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/helpify_logo.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="" width="45" className="d-inline-block align-text-center" />
          Helpify
        </Link>
        <div>
          <Link to='/signup' className='btn btn-dark me-2'>Sign Up</Link>
          <Link to='/login' className='btn btn-outline-secondary'>Log In</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
