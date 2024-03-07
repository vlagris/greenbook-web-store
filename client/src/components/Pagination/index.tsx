import classes from "@components/Pagination/styles.module.scss";
import Item from "@components/Pagination/Item.tsx";
import useItemProps from "@components/Pagination/useItemProps.ts";

interface PaginationProps {
  totalPages: number,
}

function Pagination({totalPages}: PaginationProps) {
  const {itemsProps} = useItemProps({totalPages})


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








