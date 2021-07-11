import React, { Fragment } from 'react';
import useFetchGet from '../hooks/useFetchGet';
import ErrandCard from '../components/UI/ErrandCard';

const UserProfile = () => {
  
    const [ isLoading, data ] = useFetchGet('/my-errands');

    return(
    <Fragment>
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
  </Fragment>
  )
}

export default UserProfile;