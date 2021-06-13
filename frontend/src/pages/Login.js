import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/helpify_logo.png';

const Login = () => {
  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();

    const username = event.target['username'].value;
    const password = event.target['password'].value;

    try {
      const user = {
        username,
        password
      };

      const response = await fetch(
        '/login',
        {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      console.log(data.token);

      // console.log('logged in');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <form className='container col-md-7 col-lg-6 col-xl-5 col-xxl-4 mt-5' onSubmit={submitHandler}>
        <img className='mb-4 text-center d-block mx-auto' src={logo} alt='' width='200' />
        <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>

        <div className='form-floating'>
          <input type='text' className='form-control mb-2' id='username' placeholder='name@example.com' />
          <label htmlFor='username'>Username</label>
        </div>
        <div className='form-floating'>
          <input type='password' className='form-control mb-2' id='password' placeholder='Password' />
          <label htmlFor='password'>Password</label>
        </div>
        <button className='w-100 btn btn-lg btn-dark' type='submit'>Sign in</button>
        <p className='mt-5 mb-3 text-muted text-center'>© 2021</p>
      </form>
    </Fragment>
  );
};

export default Login;
