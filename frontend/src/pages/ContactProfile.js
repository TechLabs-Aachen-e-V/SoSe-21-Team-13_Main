import React, { Fragment } from 'react';
import useFetchGet from '../hooks/useFetchGet';
import { useParams } from 'react-router-dom';

const ContactProfile = () => {
  
  let { id } = useParams();

  const [ isLoading_user, data_user] = useFetchGet(`/user-profile/${id}`);
  
  console.log('test');

  return(
    <Fragment>
        
      {!isLoading_user ? (
        <div>
          <h2 className='text-center'>You have successfully booked the errand. Please contact the user</h2>
          <div className='d-flex justify-content-center'>
            <div className='card w-25'>
              <ul className='list-group list-group-flush '>
                <li className='list-group-item'>{data_user.firstName}</li>
                <li className='list-group-item'>{data_user.lastName}</li>
                <li className='list-group-item'>{data_user.email}</li>
              </ul>
            </div>
          </div>
        </div>  
      ) : (<p>Loading...</p>)}
    </Fragment>
  );
};

export default ContactProfile;
