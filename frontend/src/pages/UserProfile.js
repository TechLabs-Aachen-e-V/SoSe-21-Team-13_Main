import React, { Fragment, useCallback } from 'react';
import useFetchGet from '../hooks/useFetchGet';
import ErrandCard from '../components/UI/ErrandCard';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  
  const { currentUser } = useAuth();

  const [ isLoading, data, getData ] = useFetchGet(`${process.env.REACT_APP_API_URL}/my-errands`);
  const [ isLoading_user, data_user] = useFetchGet(`${process.env.REACT_APP_API_URL}/user-profile/${currentUser.userId}`);

  const refreshMain = useCallback(
    () => {
      getData();
    },
    [],
  );'';

  return(
    <Fragment>
      {!isLoading_user ? (
        <div className='px-5 py-3'>
          <h1>Welcome, {data_user.firstName} {data_user.lastName}</h1>
        </div>
      ) : (<p>Loading...</p>)}

      <h2 className='px-4'>Unbooked errands</h2>

      {!isLoading ? (
        <ul className='d-flex flex-wrap justify-content-center'>
          {data.filter(errand => !errand.assignedUser).map(errand => {
            return (
              <ErrandCard
                key={errand._id}
                id={errand._id}
                title={errand.title}
                description={errand.description}
                location={errand.location}
                compensation={errand.compensation}
                dateDue={errand.dateDue}
                timeDue={errand.timeDue}
                category={errand.category}
                image={errand.imageUrl}
                user={errand.user}
                assignedUser={errand.assignedUser}
                refreshMain={refreshMain}
              />
            );
          })}
        </ul>
      ) : (<p>Loading...</p>)}

      <h2 className='px-4'>Booked errands</h2>

      {!isLoading ? (
        <ul className='d-flex flex-wrap justify-content-center'>
          {data.filter(errand => errand.assignedUser).map(errand => {
            return (
              <ErrandCard
                key={errand._id}
                id={errand._id}
                title={errand.title}
                description={errand.description}
                location={errand.location}
                compensation={errand.compensation}
                dateDue={errand.dateDue}
                timeDue={errand.timeDue}
                category={errand.category}
                image={errand.imageUrl}
                user={errand.user}
                assignedUser={errand.assignedUser}
                refreshMain={refreshMain}
              />
            );
            // show errands by booked
          })}
          
        </ul>
      ) : (<p>Loading...</p>)}
    </Fragment>
  );
};

export default UserProfile;
