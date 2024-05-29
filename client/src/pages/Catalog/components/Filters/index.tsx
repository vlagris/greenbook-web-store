import React from "react";
import {FiltersType} from "@/types.ts";
import {QueryParams} from "@/hooks/useQueryParams.ts";
import Genres from "@pages/Catalog/components/Filters/Genres.tsx";
import FiltersItemWrapper from "@pages/Catalog/components/Filters/FiltersItemWrapper.tsx";
import FiltersItem from "@pages/Catalog/components/Filters/FiltersItem.tsx";
import classes from "./styles.module.scss";



interface FiltersProps {
  filters?: FiltersType,
  queryParams: QueryParams,
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>,
}

function Filters({filters, queryParams, setQueryParams}: FiltersProps) {
  return (
    <div className={classes.filter}>

      <FiltersItemWrapper name="Жанры">
        <Genres/>
      </FiltersItemWrapper>

      {filters && filters.items.map(filter => (
        <FiltersItemWrapper key={filter.key} name={filter.name}>
          <FiltersItem
            filter={filter}
            queryParams={queryParams}
            setQueryParams={setQueryParams}
          />
        </FiltersItemWrapper>
      ))}
    </div>
  );
}

export default Filters;