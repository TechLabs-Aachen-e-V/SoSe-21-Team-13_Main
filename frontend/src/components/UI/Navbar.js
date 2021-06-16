import React, { Fragment, useEffect } from 'react';
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
    <nav className='navbar navbar-light bg-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <img src={logo} alt='' width='45' className='d-inline-block align-text-center' />
          Helpify
        </Link>
        <div>
          {(currentUser != null) ? 
            <Fragment>
              <Link to='/my-errands' className='btn btn-outline-secondary me-2'>My Errands</Link>
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
