import React from 'react';
import classes from "@pages/Catalog/styles.module.scss";


interface CatalogHeaderProps {
  title: string | undefined,
  total: number
}

function CatalogHeader({title, total}: CatalogHeaderProps) {
  return (
    <div className={classes.title_wrap}>
      <h2 className={classes.title}>{title}</h2>
      {total !== 0 &&
        <span className={classes.books_count}>{total} книг</span>
      }
    </div>
  );
}

export default CatalogHeader;