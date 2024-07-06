import React from "react";
import {Filter, FilterType} from "@/types";
import {QueryParams} from "@/hooks/useQueryParams.ts";
import Price from "@pages/Catalog/components/Filters/Price.tsx";
import CheckboxList from "@pages/Catalog/components/Filters/CheckboxList";



function getFiltersItem({filter, setQueryParams, queryParams}: FilterItemProps) {
  switch (filter.type) {
    case (FilterType.range):
      return () => <Price filter={filter} setQueryParams={setQueryParams} queryParams={queryParams}/>
    case (FilterType.select):
      return () => <CheckboxList filter={filter} setQueryParams={setQueryParams} queryParams={queryParams}/>
  }
}


interface FilterItemProps {
  filter: Filter,
  queryParams: QueryParams,
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>,
}

function FiltersItemWrapper(props: FilterItemProps) {
  let FilterComponent = getFiltersItem(props);


  return (
    <FilterComponent/>
  );
}

export default FiltersItemWrapper;