export enum FilterType {
  select = "select",
  range = "range",
  // selectOne = "selectOne",
  // toggle = "toggle"
}

export type FilterItem = {
  id: string,
  name: string
}

export type FilterCommon = {
  type: FilterType,
  key: string,
  name: string,
}

export type FilterPrice = FilterCommon & {
  type: FilterType.range,
  minPrice: number,
  maxPrice: number,
}

export type FilterSelect = FilterCommon & {
  type: FilterType.select,
  items: FilterItem[],
  maxSelect: number
}

export type Filter = FilterPrice | FilterSelect;

export type FiltersType = {
  items: Filter[],
  total: number
}



export type FilterItemResponse = {
  id: string,
  name: string
};

export type FilterPriceResponse = {
  type: FilterType.range,
  key: string,
  name: string,
  minPrice: number,
  maxPrice: number,
}

export type FilterSelectResponse = {
  type: FilterType.select,
  key: string,
  name: string,
  items: FilterItemResponse[],
  maxSelect: number
}

export type FilterResponse = FilterPriceResponse | FilterSelectResponse;

export type FiltersResponse = {
  items: FilterResponse[],
  total: number
};
