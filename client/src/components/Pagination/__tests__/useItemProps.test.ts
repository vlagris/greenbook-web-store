import { renderHook } from "@testing-library/react";
import useItemProps from "@components/Pagination/useItemProps.ts";
import {PaginationItemTypes} from "@components/Pagination/Item.tsx";
import * as reactRouterDom from "react-router-dom";



describe('useItemProps', () => {
  const mockedSetSearchParams = jest.fn();
  function createUseSearchParams(page: number): any {
    return [new URLSearchParams(`q=URLUtils.searchParams&page=${page}`), mockedSetSearchParams];
  }

  const mockedUseSearchParams = jest.spyOn(reactRouterDom, "useSearchParams")
    .mockReturnValue(createUseSearchParams(0));


  afterEach(() => {
    mockedSetSearchParams.mockClear();
    mockedUseSearchParams.mockClear();
  })


  it('should return pagination props with one page', () => {
    const {result} = renderHook(() => useItemProps({ totalPages: 1 }));

    const expected = [
      { type: PaginationItemTypes.prev },
      { type: PaginationItemTypes.current, page: 1 },
      { type: PaginationItemTypes.next }
    ];

    expect(result.current.itemsProps).toEqual(expected);
  });


  it('should return pagination props with ten pages with the current first page', () => {
    const {result} = renderHook(() => useItemProps({ totalPages: 10 }));

    const expected = [
      { type: PaginationItemTypes.prev },
      { type: PaginationItemTypes.current, page: 1 },
      { type: PaginationItemTypes.page, page: 2, onClick: expect.any(Function) },
      { type: PaginationItemTypes.page, page: 3, onClick: expect.any(Function) },
      { type: PaginationItemTypes.page, page: 4, onClick: expect.any(Function) },
      { type: PaginationItemTypes.page, page: 5, onClick: expect.any(Function) },
      { type: PaginationItemTypes.ellipsis },
      { type: PaginationItemTypes.page, page: 10, onClick: expect.any(Function) },
      { type: PaginationItemTypes.next, onClick: expect.any(Function) }
    ];

    expect(result.current.itemsProps).toEqual(expected);
  });


  it('should return pagination props with ten pages with the current fifth page', () => {
    mockedUseSearchParams.mockReturnValue(createUseSearchParams(5))
    const {result} = renderHook(() => useItemProps({ totalPages: 10 }));

    const expected = [
      { type: PaginationItemTypes.prev, onClick: expect.any(Function) },
      { type: PaginationItemTypes.page, page: 1,  onClick: expect.any(Function) },
      { type: PaginationItemTypes.ellipsis },
      { type: PaginationItemTypes.page, page: 4, onClick: expect.any(Function) },
      { type: PaginationItemTypes.current, page: 5 },
      { type: PaginationItemTypes.page, page: 6, onClick: expect.any(Function) },
      { type: PaginationItemTypes.ellipsis },
      { type: PaginationItemTypes.page, page: 10, onClick: expect.any(Function) },
      { type: PaginationItemTypes.next, onClick: expect.any(Function) }
    ];

    expect(result.current.itemsProps).toEqual(expected);
  });


  it('should return pagination props with ten pages with the current tenth page', () => {
    mockedUseSearchParams.mockReturnValue(createUseSearchParams(10))
    const {result} = renderHook(() => useItemProps({ totalPages: 10 }));

    const expected = [
      { type: PaginationItemTypes.prev, onClick: expect.any(Function) },
      { type: PaginationItemTypes.page, page: 1,  onClick: expect.any(Function) },
      { type: PaginationItemTypes.ellipsis },
      { type: PaginationItemTypes.page, page: 6, onClick: expect.any(Function) },
      { type: PaginationItemTypes.page, page: 7, onClick: expect.any(Function) },
      { type: PaginationItemTypes.page, page: 8, onClick: expect.any(Function) },
      { type: PaginationItemTypes.page, page: 9, onClick: expect.any(Function) },
      { type: PaginationItemTypes.current, page: 10 },
      { type: PaginationItemTypes.next }
    ];

    expect(result.current.itemsProps).toEqual(expected);
  });


  it('should check the functions for the pages', () => {
    window.scrollTo = jest.fn();
    mockedUseSearchParams.mockReturnValue(createUseSearchParams(3));
    const {result} = renderHook(() => useItemProps({ totalPages: 10 }));

    if(result.current.itemsProps[1].onClick) {
      result.current.itemsProps[1].onClick()
      expect(mockedSetSearchParams).toHaveBeenCalledWith(new URLSearchParams(`q=URLUtils.searchParams`))
      expect(window.scrollTo).toHaveBeenCalled()
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    }

    if(result.current.itemsProps[3].onClick) {
      result.current.itemsProps[3].onClick()
      expect(mockedSetSearchParams).toHaveBeenCalledWith(new URLSearchParams(`q=URLUtils.searchParams&page=4`))
      expect(window.scrollTo).toHaveBeenCalled()
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    }
  });
});