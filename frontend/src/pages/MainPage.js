import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrandCard from '../components/UI/ErrandCard';
import useFetchGet from '../hooks/useFetchGet';
import { useAuth } from '../context/AuthContext';
import illu from '../images/illu_1.png';
import back from '../images/Background-blue.png';

const MainPage = () => {
  const [sortByCompensation, setSortByCompensation] = useState('desc');

  const sortHandler = () => {
    setSortByCompensation(sortByCompensation == 'asc' ? 'desc' : 'asc');
  };

  const [ isLoading, data ] = useFetchGet(`/errands?comp_sorting=${sortByCompensation}`);
  const { currentUser } = useAuth();

  return (
    <Fragment>
      <button onClick={sortHandler}>Sort by compensation</button>
      {currentUser && (
        <div>
          <p>The current user&apos;s id is {currentUser.userId}</p>
        </div>
      )}
      <img className='back' src={back} alt='' width='100%'></img>
      <div className='intro-container'>
        <img className='main-illu' src={illu} alt='' width='60%'></img>
        <div className='intro-text'>
          <h1>Welcome to Helpify</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
        </div>
      </div>
      {!isLoading ? (
        <div>
          <ul className='d-flex flex-wrap justify-content-center'>
            {data.map(errand => {
              return (
                <ErrandCard
                  key={errand._id}
                  title={errand.title}
                  description={errand.description}
                  location={errand.location}
                  compensation={errand.compensation}
                  dateDue={errand.dateDue}
                  timeDue={errand.timeDue}
                  category={errand.category}
                  image={errand.imageUrl}
                />
              );
            })}
          </ul>
        </div>
      ) : (<p>Loading...</p>)}
      
      <div className='pt-4 mb-5' align='center'>
        <Link to='/new-errand' className='btn btn-success mx-auto'>Add new errand</Link>
      </div>
    </Fragment>
  );
};

export default MainPage;
