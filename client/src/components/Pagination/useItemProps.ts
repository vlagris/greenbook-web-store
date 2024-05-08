import { useEffect, useState } from 'react';
import {ItemProps, PaginationItemTypes} from "@components/Pagination/Item.tsx";
import {PaginationOnClick} from "@components/Pagination/index.tsx";



interface UseItemProps {
  total: number,
  page: number,
  onClick: PaginationOnClick
}

function useItemProps({total, page: currentPage, onClick}: UseItemProps) {
  const [itemsProps, setItemsProps] = useState<ItemProps[]>([]);


  function addArrowButton(itemsProps: ItemProps[]) {
    const itemPrev: ItemProps = { type: PaginationItemTypes.prev, page: currentPage - 1 };
    const itemNext: ItemProps = { type: PaginationItemTypes.next, page: currentPage + 1 };

    if (currentPage > 1) {
      itemPrev.onClick = onClick;
    }
    if (currentPage < total) {
      itemNext.onClick = onClick;
    }

    return [itemPrev, ...itemsProps, itemNext];
  }


  useEffect(() => {
    let nextItemsProps: ItemProps[] = [];
    let start = currentPage - 1;
    let end = currentPage + 1;

    if (total <= 7) {
      start = 1;
      end = total;
    } else if (total - currentPage < 4) {
      start = total - 4;
      end = total;
    } else if (currentPage < 5) {
      start = 1;
      end = 5;
    }

    for(let i = start; i <= end; i++) {
      let itemProps: ItemProps = { type: PaginationItemTypes.page, page: i, onClick: onClick };
      if (i == currentPage) {
        itemProps = { type: PaginationItemTypes.current, page: i };
      }
      nextItemsProps.push(itemProps)
    }

    if(start > 2) {
      nextItemsProps.unshift(
        { type: PaginationItemTypes.page, page: 1, onClick: onClick },
        { type: PaginationItemTypes.ellipsis }
      );
    }
    if(end < total - 1) {
      nextItemsProps.push(
        { type: PaginationItemTypes.ellipsis },
        { type: PaginationItemTypes.page, page: total, onClick: onClick }
      );
    }

    nextItemsProps = addArrowButton(nextItemsProps);
    setItemsProps(nextItemsProps);

  }, [total, currentPage]);


  return {itemsProps}
}

export default useItemProps;