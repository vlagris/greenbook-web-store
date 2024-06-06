import React from 'react';
import classes from "@pages/Catalog/styles.module.scss";
import TotalCount from "@pages/Catalog/components/TotalCount.tsx";


interface CatalogHeaderProps {
  title: string | undefined,
  total: number
}

function CatalogHeader({title, total}: CatalogHeaderProps) {
  return (
    <div className={classes.title_wrap}>
      <h2 className={classes.title}>{title}</h2>
      {total !== 0 &&
        <TotalCount>{total} книг</TotalCount>
      }
    </div>
  );
}

export default CatalogHeader;