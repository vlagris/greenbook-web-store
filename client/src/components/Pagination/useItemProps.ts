import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import {ItemProps, PaginationItemTypes} from "@components/Pagination/Item.tsx";



function useItemProps({totalPages}: {totalPages: number}) {
  const [itemsProps, setItemsProps] = useState<ItemProps[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;


  function handleClick(pageNumber: number) {
    return () => {
      if (pageNumber > 1) {
        searchParams.set("page", pageNumber.toString());
      } else {
        searchParams.delete("page");
      }
      setSearchParams(searchParams);
      window.scrollTo(0, 0);
    }
  }
  function addArrowButton(itemsProps: ItemProps[]) {
    const itemPrev: ItemProps = { type: PaginationItemTypes.prev };
    const itemNext: ItemProps = { type: PaginationItemTypes.next };

    if (currentPage > 1) {
      itemPrev.onClick = handleClick(currentPage - 1);
    }
    if (currentPage < totalPages) {
      itemNext.onClick = handleClick(currentPage + 1);
    }

    return [itemPrev, ...itemsProps, itemNext];
  }


  useEffect(() => {
    let nextItemsProps: ItemProps[] = [];
    let start = currentPage - 1;
    let end = currentPage + 1;

    if (totalPages <= 7) {
      start = 1;
      end = totalPages;
    } else if (totalPages - currentPage < 4) {
      start = totalPages - 4;
      end = totalPages;
    } else if (currentPage < 5) {
      start = 1;
      end = 5;
    }

    for(let i = start; i <= end; i++) {
      let itemProps: ItemProps = { type: PaginationItemTypes.page, page: i, onClick: handleClick(i) };
      if (i == currentPage) {
        itemProps = { type: PaginationItemTypes.current, page: i };
      }
      nextItemsProps.push(itemProps)
    }

    if(start > 2) {
      nextItemsProps.unshift(
        { type: PaginationItemTypes.page, page: 1, onClick: handleClick(1) },
        { type: PaginationItemTypes.ellipsis }
      );
    }
    if(end < totalPages - 1) {
      nextItemsProps.push(
        { type: PaginationItemTypes.ellipsis },
        { type: PaginationItemTypes.page, page: totalPages, onClick: handleClick(totalPages) }
      );
    }

    nextItemsProps = addArrowButton(nextItemsProps);
    setItemsProps(nextItemsProps);

  }, [totalPages, currentPage]);


  return {itemsProps}
}

export default useItemProps;