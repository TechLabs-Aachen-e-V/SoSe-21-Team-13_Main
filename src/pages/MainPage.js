import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ErrandCard from '../components/UI/ErrandCard';
import Navbar from '../components/UI/Navbar';

const MainPage = () => {
  return (
    <Fragment>
      <Navbar />
      <ErrandCard />
      <div className='pt-4' align='center'>
        <Link to='/new-errand' className='btn btn-success mx-auto'>Add new errand</Link>
      </div>
    </Fragment>
  );
};

export default MainPage;
