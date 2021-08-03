import React, { Fragment } from 'react';
import useFetchGet from '../hooks/useFetchGet';
import ErrandCard from '../components/UI/ErrandCard';

const UserProfile = () => {
  
  const [ isLoading, data ] = useFetchGet('/my-errands');
  const [ isLoading_user, data_user] = useFetchGet('/user-profile');

  return(
    <Fragment>
      {!isLoading_user ? (
        <ul>
          <li>{data_user.firstName}</li>
          <li>{data_user.lastName}</li>
          <li>{data_user.email}</li>
        </ul>
      ) : (<p>Loading...</p>)}

      {/* <ul>
        <li>User Email</li>
      </ul> */}

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
                user={errand.user}
              />
            );
          })}
        </ul>
      ) : (<p>Loading...</p>)}
    </Fragment>
  );
};

export default UserProfile;