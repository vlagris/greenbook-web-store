import React, {useEffect, useState} from 'react';
import classes from "./styles.module.scss";
import {useParams, useSearchParams} from "react-router-dom";
import * as api from "@/services/api";


interface PriceProps {
  priceMin: number,
  priceMax: number,
}

function Price({priceMin, priceMax}: PriceProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState(getPriceRange())

  function getPriceRange() {
    const urlPriceRange = searchParams.get("price");
    if (!urlPriceRange) {
      return {min: priceMin, max: priceMax};
    }
    const priceRangeArray = urlPriceRange.split(';');
    return {
      min: Number(priceRangeArray[0]),
      max: Number(priceRangeArray[1])
    };
  }

  function setPriceParam() {
    if (priceRange.min !== priceMin && priceRange.min !== priceMax) {
      searchParams.set("price", Object.values(priceRange).join(";"));
    } else {
      searchParams.delete("price");
    }
    setSearchParams(searchParams);
  }

  function handleChangePrice(type: "min" | "max") {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setPriceRange(prev => ({...prev, [type]: Number(event.target.value)}));
    }
  }
  function isValidPriceMin() {
    if (priceRange.min < priceMin) {
      return setPriceRange(prev => ({...prev, min: priceMin}));
    }
    if (priceRange.min > priceRange.max) {
      return setPriceRange(prev => ({...prev, min: priceRange.max}));
    }
    setPriceParam()
  }
  function isValidPriceMax() {
    if (priceRange.max > priceMax) {
      return setPriceRange(prev => ({...prev, max: priceMax}));
    }
    if (priceRange.max < priceRange.min) {
      return setPriceRange(prev => ({...prev, max: priceRange.min}));
    }
    setPriceParam()
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