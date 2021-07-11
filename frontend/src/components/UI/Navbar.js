import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/helpify_logo.png';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const history = useHistory();
  
  const clickHandler = async () => {
    const response = await fetch(
      '/logout',
      {
        method: 'POST'
      }
    );

    const data = await response.json();

    setCurrentUser(data);
    history.replace('/');
  };

  return (
    <nav className='navbar sticky-top navbar-light bg-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <img src={logo} alt='' width='30' className='logo d-inline-block align-text-center ms-2 me-2' />
          helpify
        </Link>
        <div>
          {(currentUser && currentUser.userId) ? 
            <Fragment>
              <Link to='/profile' className='btn btn-outline-secondary me-2'>Profile</Link>
              <button to='/' className='btn btn-dark me-2' onClick={ clickHandler }>Log out</button>
            </Fragment>
            :(
              <Fragment>
                <Link to='/signup' className='btn btn-dark me-2'>Sign Up</Link>
                <Link to='/login' className='btn btn-outline-secondary'>Log In</Link>
              </Fragment>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
