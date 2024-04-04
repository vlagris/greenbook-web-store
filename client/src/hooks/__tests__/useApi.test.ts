import { renderHook, act } from "@testing-library/react";
import useApi from "@/hooks/useApi.ts";

describe('useApi',  () => {
  it('should return initial useApi', () => {
    const {result} = renderHook(() =>  useApi())

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toEqual(false)
  });

  it('should return data useApi', async () => {
    const {result} = renderHook(() => useApi());

    await act( async () => {
      result.current.query(() => Promise.resolve("result1"))
    });

    expect(result.current.loading).toEqual(false);
    expect(result.current.data).toEqual("result1");
    expect(result.current.error).toBeNull();
  });

  it('should return error useApi', async () => {
    const {result} = renderHook(() => useApi());

    await act( async () => {
      result.current.query(() => Promise.reject({type: 0}))
    });

    expect(result.current.loading).toEqual(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual({type: 0});
  });
});