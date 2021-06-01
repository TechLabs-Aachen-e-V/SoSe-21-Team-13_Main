import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrandCard from '../components/UI/ErrandCard';
import Navbar from '../components/UI/Navbar';

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedErrands, setLoadedErrands] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://helpify-446a2-default-rtdb.europe-west1.firebasedatabase.app/errands.json')
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);

        const errands = [];

        for (const key in data) {
          const errand = {
            id: key,
            ...data[key]
          };

          errands.push(errand);
        }

        setLoadedErrands(errands);
      });
  }, []);

  console.log(loadedErrands);


  return (
    <Fragment>
      <Navbar />
      {!isLoading ? (
        <ul>
          {loadedErrands.map(errand => {
            return (
              <ErrandCard
                key={errand.id}
                title={errand.title}
                description={errand.description}
                // location={}
                // compensation={}
                // dateDue={}
                // timeDue={}
                // category={}
                image={errand.image}
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
