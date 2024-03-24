import { renderHook } from "@testing-library/react";
import useItemProps from "@components/Pagination/useItemProps.ts";
import {PaginationItemTypes} from "@components/Pagination/Item.tsx";
import * as reactRouterDom from "react-router-dom";


function createUseSearchParams(page: number) {
  return [new URLSearchParams(`q=URLUtils.searchParams&page=${page}`), () => {}];
}

describe('useItemProps', () => {
  const mockedUseSearchParams = jest.spyOn(reactRouterDom, "useSearchParams")
    .mockReturnValue([new URLSearchParams(), () => {}]);

  afterEach(() => {
    mockedUseSearchParams.mockClear();
  })

  it('should ', () => {
    const {result} = renderHook(() => useItemProps({ totalPages: 1 }));

    const expected = [
      { type: PaginationItemTypes.prev },
      { type: PaginationItemTypes.current, page: 1 },
      { type: PaginationItemTypes.next }
    ];

    expect(result.current.itemsProps).toEqual(expected);
  });

  it('should ', () => {
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


  it('should ', () => {
    // @ts-ignore
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

  it('should ', () => {
    // @ts-ignore
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
});