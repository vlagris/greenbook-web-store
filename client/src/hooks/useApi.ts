import {useCallback, useState} from 'react';
import {HttpError} from "@/types.ts";



function useApi<R>() {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<HttpError | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshIndex, setRefreshIndex] = useState(0);


  function refresh() {
    setRefreshIndex(prev => prev + 1);
  }


  const apiQuery = useCallback((apiFunction: () => Promise<R>) => {
    setLoading(true);
    apiFunction()
      .then(
        (response) => setData(response),
        (err) => setError(err as HttpError)
      )
      .finally(
        () => setLoading(false)
      );
  }, [refreshIndex]);


  return {data, error, loading, apiQuery, refresh};
}

export default useApi;