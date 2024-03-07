import React, {useCallback, useState} from 'react';
import {AxiosInstance} from "axios";
import {HttpError} from "@/types.ts";

function useApi<R>() {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<HttpError | null>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (api, requestData?): void => {
    setLoading(true);
    try {
      const response = await api(requestData);
      setData(response);
    } catch (err) {
      setError(err as HttpError);
    } finally {
      setLoading(false);
    }
  }, []);

  return {data, error, loading, request};
}

export default useApi;