import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrandCard from '../components/UI/ErrandCard';
import Navbar from '../components/UI/Navbar';

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedErrands, setLoadedErrands] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('/errands')
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);

        const errands = [];

        for (const item of data) {
          const errand = {
            id: item._id,
            title: item.title,
            description: item.description,
            location: item.location,
            compensation: item.compensation,
            dateDue: item.dateDue,
            timeDue: item.timeDue,
            category: item.category,
            image: item.imageUrl
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
                location={errand.location}
                compensation={errand.compensation}
                dateDue={errand.dateDue}
                timeDue={errand.timeDue}
                category={errand.category}
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
