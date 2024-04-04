import {useCallback, useState} from 'react';
import {HttpError} from "@/types.ts";

function useApi<R>() {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<HttpError | null>(null);
  const [loading, setLoading] = useState(false);


  const query = useCallback((apiFunction: () => Promise<any>) => {
    setLoading(true);
    apiFunction().then(
      (response) => {
        setData(response)
      },
      (err) => {
        setError(err as HttpError);
      })
      .finally(() => {
      setLoading(false);
    });
  }, []);

  return {data, error, loading, query};
}

export default useApi;