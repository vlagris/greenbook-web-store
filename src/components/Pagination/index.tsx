import React from "react";
import Item from "@components/Pagination/Item.tsx";
import useItemProps from "@components/Pagination/useItemProps.ts";
import classes from "@components/Pagination/styles.module.scss";


export type PaginationOnClick = (
  event: React.MouseEvent<HTMLElement>,
  page: number
) => void


interface PaginationProps {
  total: number,
  page: number,
  onClick: PaginationOnClick
}



function Pagination({total, page, onClick}: PaginationProps) {
  const {itemsProps} = useItemProps({total, page, onClick})


  return (
    <div className={classes.pagination}>

        {itemsProps.map((itemProps, index) =>
          <Item
            key={index}
            {...itemProps}
          />
        )}

    </div>
  );
}

export default Pagination;








