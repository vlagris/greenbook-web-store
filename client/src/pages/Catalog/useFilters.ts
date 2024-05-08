import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";


enum FiltersNames {
  page = "page",
  sort = "sort",
  price = "price",
}

export type Filters ={
  [FiltersNames.page]: number | null,
  [FiltersNames.sort]: string | null,
  [FiltersNames.price]: {
    min: number | null,
    max: number | null
  }
}

export type FiltersParams = { [key in FiltersNames]?: string }

function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersParams, setFiltersParams] = useState<FiltersParams>({})
  const [filtersLoading, setFiltersLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    page: null,
    sort: null,
    price: {
      min: null,
      max: null
    }
  });


  useEffect(() => {
    setFilters({
      page: Number(searchParams.get("page")) || null,
      sort: searchParams.get("sort"),
      price: (() => {
        const priceParam = searchParams.get("price") || "";
        const [min, max] = priceParam.split("-");
        return {
          min: Number(min) || null,
          max: Number(max) || null
        }
      })()
    });
  }, []);


  useEffect(() => {
    const filtersParams = {
      page: filters.page?.toString() || null,
      sort: filters.sort,
      price: (() => {
        if (filters.price.min || filters.price.max) {
          return Object.values(filters.price).join("-");
        }
        return null;
      })(),
    }

    Object.entries(filtersParams).forEach(([key, value]) => {
      searchParams.delete(key);
      if (value) {
        setFiltersParams(prev => ({...prev, [key]: value}))
        searchParams.set(key, value);
      }
    })
    setSearchParams(searchParams);
    setFiltersLoading(false);
  }, [filters]);


  return {filters, setFilters, filtersParams, filtersLoading};
}


export default useFilters;