import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrandCard from '../components/UI/ErrandCard';

function useFetch(url) {
  const [isLoading, setIsLoading] = useState(true); 
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        setData(data);
      });
  }, []);
  return [ isLoading, data ];
}

const MainPage = () => {
  const [ isLoading, data ] = useFetch('/errands');

  return (
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
      
      <div className='pt-4 mb-5' align='center'>
        <Link to='/new-errand' className='btn btn-success mx-auto'>Add new errand</Link>
      </div>
    </Fragment>
  );
};

export default MainPage;
