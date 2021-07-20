import { useState, useEffect } from 'react';

const useFetchGet = (url) => {
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
  }, [url]);
  return [ isLoading, data ];
};

export default useFetchGet;