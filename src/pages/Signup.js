import React, { Fragment } from 'react';
import logo from '../images/helpify_logo.png';
import Navbar from '../components/UI/Navbar';

const Signup = () => {
  return (
    <Fragment>
      <Navbar />
      <form className='container col-md-7 col-lg-6 col-xl-5 col-xxl-4 mt-5'>
        <img className="mb-4 text-center d-block mx-auto" src={logo} alt="" width="200" />
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

        <div className="form-floating">
          <input type="email" className="form-control mb-2" id="email" placeholder="name@example.com" />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control mb-2" id="password" placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control mb-2" id="passwordConfirm" placeholder="Confirm Password" />
          <label htmlFor="passwordConfirm">Confirm Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-dark" type="submit">Sign up</button>
        <p className="mt-5 mb-3 text-muted text-center">© 2021</p>
      </form>
    </Fragment>
  );
};

export default Signup;
