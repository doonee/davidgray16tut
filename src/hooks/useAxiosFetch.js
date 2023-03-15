import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token
        });
        if (isMounted) {
          await setData(response.data);
          await setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          await setFetchError(err.message);
          await setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    }

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    }

    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, isLoading };
}

export default useAxiosFetch;