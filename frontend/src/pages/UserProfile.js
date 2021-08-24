import React, { Fragment, useCallback } from 'react';
import useFetchGet from '../hooks/useFetchGet';
import ErrandCard from '../components/UI/ErrandCard';

const UserProfile = () => {
  
  const [ isLoading, data, getData ] = useFetchGet('/my-errands');
  const [ isLoading_user, data_user] = useFetchGet('/user-profile');

  const refreshMain = useCallback(
    () => {
      getData();
    },
    [],
  );

  return(
    <Fragment>
      {!isLoading_user ? (
        <ul>
          <li>{data_user.firstName}</li>
          <li>{data_user.lastName}</li>
          <li>{data_user.email}</li>
        </ul>
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
