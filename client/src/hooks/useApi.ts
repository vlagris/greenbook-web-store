import {useCallback, useState} from 'react';
import {HttpError} from "@/types";




function useApi<R = any>() {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<HttpError | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess , setIsSuccess ] = useState(false);
  const [refreshIndex, setRefreshIndex] = useState(0);


  function refresh() {
    setRefreshIndex(prev => prev + 1);
  }

  const queryFn = useCallback((api: () => Promise<R>) => {
    setIsLoading(true);
    api()
      .then(
        (response) => {
          setIsSuccess(true)
          setData(response)
          setError(null)
          setIsError(false)
        },
        (err) => {
          setIsSuccess(false)
          setData(null)
          setError(err as HttpError)
          setIsError(true)
        }
      )
      .finally(
        () => setIsLoading(false)
      );
  }, [refreshIndex]);


  return {data, error, isError, isLoading, isSuccess, queryFn, refresh};
}

export default useApi;


