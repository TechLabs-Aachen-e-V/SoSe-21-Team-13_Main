import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/helpify_logo.png';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState();
  const history = useHistory();
  const { setCurrentUser } = useAuth();

  const submitHandler = async (event) => {
    event.preventDefault();

    const firstName = event.target['firstName'].value;
    const lastName = event.target['lastName'].value;
    const email = event.target['email'].value;
    const password = event.target['password'].value;
    const passwordConfirm = event.target['passwordConfirm'].value;

    if (password !== passwordConfirm) {
      console.log('passwords do not match');
      setPasswordsMatch(false);
      return setTimeout(() => {
        setPasswordsMatch(true);
      }, 3000);
    }

    try {
      const user = {
        firstName,
        lastName,
        email,
        password
      };

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/signup`,
        {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await res.json();
      console.log(data);
      if(!data.error) {
        setCurrentUser(data);
        return history.replace('/');
      }
      
      setError(data.error);
      return setTimeout(() => {
        setError();
      }, 3000);

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Fragment>
      <form className='container col-md-7 col-lg-6 col-xl-5 col-xxl-4 mt-5' onSubmit={submitHandler} >
        <img className='mb-4 text-center d-block mx-auto' src={logo} alt='' width='200' />
        {!passwordsMatch && (
          <div className='alert alert-warning' role='alert'>
            Passwords do not match.
          </div>
        )}{error && (
          <div className='alert alert-warning' role='alert'>
            {error}
          </div>
        )}
        <h1 className='h3 mb-3 fw-normal'>Please sign up</h1>
        <div className='form-floating'>
          <input type='text' className='form-control mb-2' id='firstName' placeholder='John' required />
          <label htmlFor='firstName'>First name</label>
        </div>
        <div className='form-floating'>
          <input type='text' className='form-control mb-2' id='lastName' placeholder='Cena' required />
          <label htmlFor='lastName'>Last name</label>
        </div>
        <div className='form-floating'>
          <input type='email' className='form-control mb-2' id='email' placeholder='name@example.com' />
          <label htmlFor='email'>Email address</label>
        </div>
        <div className='form-floating'>
          <input type='password' className='form-control mb-2' id='password' placeholder='Password' />
          <label htmlFor='password'>Password</label>
        </div>
        <div className='form-floating'>
          <input type='password' className='form-control mb-2' id='passwordConfirm' placeholder='Confirm Password' />
          <label htmlFor='passwordConfirm'>Confirm Password</label>
        </div>
        <button className='w-100 btn btn-lg btn-dark' type='submit'>Sign up</button>
        <p className='mt-5 mb-3 text-muted text-center'>© 2021</p>
      </form>
    </Fragment>
  );
};

export default Signup;
