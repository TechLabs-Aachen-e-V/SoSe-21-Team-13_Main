import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ErrandCard from '../components/UI/ErrandCard';
import useFetchGet from '../hooks/useFetchGet';
import illu from '../images/illu_1.png';

const MainPage = () => {
  const [ isLoading, data ] = useFetchGet('/errands');

  return (
    <Fragment>
      <div className='intro-container'>
      <img className='main-illu' src={illu} alt='' width='40%'></img>
      <div className='intro-text'>
       <h1>Welcome to Helpify</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
      </div>
      </div>
      {!isLoading ? (
        <div className='container'>
        <ul>
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
