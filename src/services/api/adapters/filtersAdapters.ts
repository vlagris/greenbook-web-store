import {
  Filter,
  FilterItem,
  FilterItemResponse,
  FilterResponse,
  FiltersResponse,
  FiltersType,
  FilterType
} from "@/types";

export function filterItemsResponseAdepter(data: FilterItemResponse[]): FilterItem[] {
  return data.map(filterItem => ({
    id: filterItem.id,
    name: filterItem.name
  }))
}

export function filterResponseAdepter(data: FilterResponse): Filter {
  const filterCommon = {
    key: data.key,
    name: data.name,
  }
  if (data.type === FilterType.select ) {
    return {
      ...filterCommon,
      type: data.type,
      maxSelect: data.maxSelect,
      items: filterItemsResponseAdepter(data.items)
    }
  }
  return {
    ...filterCommon,
    type: data.type,
    minPrice: data.minPrice,
    maxPrice: data.maxPrice
  }
}

export function filtersResponseAdepter(data: FiltersResponse): FiltersType {
  return {
    items: data.items.map(filter => filterResponseAdepter(filter)),
    total: data.total
  }
}