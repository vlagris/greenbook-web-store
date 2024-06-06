import PageButton from "@components/Pagination/PageButton";
import ArrowButton from "@components/Pagination/ArrowButton.tsx";
import CurrentPageButton from "@components/Pagination/CurrentPageButton.tsx";
import EllipsisButton from "@components/Pagination/EllipsisButton.tsx";
import {PaginationOnClick} from "@components/Pagination/index.tsx";

export enum PaginationItemTypes {
  page,
  current,
  ellipsis,
  prev,
  next
}

const ITEM_COMPONENTS_MAP = {
  [PaginationItemTypes.page]: PageButton,
  [PaginationItemTypes.current]: CurrentPageButton,
  [PaginationItemTypes.ellipsis]: EllipsisButton,
  [PaginationItemTypes.prev]: ArrowButton,
  [PaginationItemTypes.next]: ArrowButton,
}


export interface ItemProps {
  type: PaginationItemTypes,
  onClick?: PaginationOnClick,
  page?: number,
}

function Item(props: ItemProps) {
  const Component = ITEM_COMPONENTS_MAP[props.type];

  return (
    <Component {...props}/>
  );
}

export default Item;