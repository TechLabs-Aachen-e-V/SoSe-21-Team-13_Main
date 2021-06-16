import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ErrandCard from '../components/UI/ErrandCard';
import useFetchGet from '../hooks/useFetchGet';
import { useAuth } from '../context/AuthContext';

const MainPage = () => {
  const [ isLoading, data ] = useFetchGet('/errands');
  const { currentUser } = useAuth();

  return (
    <Fragment>
      {currentUser && (
        <div>
          <p>The current user&apos;s id is {currentUser.userId}</p>
        </div>
      )}
      {!isLoading ? (
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
      ) : (<p>Loading...</p>)}
      
      <div className='pt-4 mb-5' align='center'>
        <Link to='/new-errand' className='btn btn-success mx-auto'>Add new errand</Link>
      </div>
    </Fragment>
  );
};

export default MainPage;
