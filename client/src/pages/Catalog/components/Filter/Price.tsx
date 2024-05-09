import React, {useEffect, useState} from 'react';
import {Filters} from "@pages/Catalog/useFilters.ts";
import classes from "./styles.module.scss";



interface PriceProps {
  minPrice: number,
  maxPrice: number,
  filters: Filters,
  setFilters:  React.Dispatch<React.SetStateAction<Filters>>,
}

function Price({minPrice, maxPrice, filters, setFilters}: PriceProps) {
  const [priceRange, setPriceRange] = useState({min: minPrice, max: maxPrice})


  useEffect(() => {
    setPriceRange({
      min: filters.price.min || minPrice,
      max: filters.price.max || maxPrice
    })
  }, [filters]);


  function addFilterPrice(min: number, max: number) {
    if (min !== minPrice || max !== maxPrice) {
      setFilters({ ...filters, price: { min, max } });
    } else {
      setFilters({ ...filters, price: { min: null, max: null } });
    }
  }


  function handleChangePrice(type: "min" | "max") {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setPriceRange({...priceRange, [type]: Number(event.target.value)});
    }
  }


  function isValidPriceMin() {
    const newPriceRange = priceRange;
    if (priceRange.min < minPrice) {
      newPriceRange.min = minPrice;
    } else if (priceRange.min > priceRange.max) {
      newPriceRange.min = priceRange.max;
    }
    addFilterPrice(newPriceRange.min, newPriceRange.max);
    setPriceRange({...newPriceRange});
  }


  function isValidPriceMax() {
    const newPriceRange = priceRange;
    if (priceRange.max > maxPrice) {
      newPriceRange.max = maxPrice;
    } else if (priceRange.max < priceRange.min) {
      newPriceRange.max = priceRange.min;
    }
    addFilterPrice(newPriceRange.min, newPriceRange.max);
    setPriceRange({...newPriceRange});
  }


  return (
    <div className={classes.price}>
      <div className={classes.price_input_wrap}>
        <p className={classes.price_input_title}>От</p>
        <input
          type="text"
          className={classes.price_input}
          onChange={handleChangePrice("min")}
          onBlur={isValidPriceMin}
          value={priceRange.min}
        />
      </div>
      <div className={classes.price_input_wrap}>
        <p className={classes.price_input_title}>До</p>
        <input
          type="text"
          className={classes.price_input}
          onChange={handleChangePrice("max")}
          onBlur={isValidPriceMax}
          value={priceRange.max}
        />
      </div>
    </div>
  );
}

export default Price;