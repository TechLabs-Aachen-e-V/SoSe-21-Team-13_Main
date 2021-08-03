import { useState, useEffect, useCallback } from 'react';

const useFetchGet = (url) => {
  const [isLoading, setIsLoading] = useState(true); 
  const [data, setData] = useState([]);

  const getData = useCallback(
    () => {
      setIsLoading(true);
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setIsLoading(false);
          setData(data);
        });
    },
    [url],
  );

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        setData(data);
      });
  }, [url]);
  return [ isLoading, data, getData ];
};

export default useFetchGet;