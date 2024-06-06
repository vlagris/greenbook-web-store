import {useEffect, useState} from 'react';
import {useParams ,useSearchParams} from "react-router-dom";



export type QueryParams = {
  [key in string]: string | null
}

function useQueryParams(paramsNames: string[]) {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true)
  const [queryParams, setQueryParams] = useState<QueryParams>({})


  useEffect(() => {
    setLoading(true);
    paramsNames.forEach((paramName) => {
      setQueryParams(prev => {
        return {...prev, [paramName]: searchParams.get(paramName)}
      });
    })
    setLoading(false);
  }, [JSON.stringify(params)]);


  useEffect(() => {
    Object.entries(queryParams).forEach(([key, value]) => {
      searchParams.delete(key);
      if (value) {
        searchParams.set(key, value);
      }
    })
    setSearchParams(searchParams);
  }, [queryParams]);


  return {queryParams, setQueryParams, queryLoading: loading};
}

export default useQueryParams;