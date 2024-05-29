import React, {useEffect, useState} from 'react';
import {QueryParams} from "@/hooks/useQueryParams.ts";
import {FilterPrice} from "@/types.ts";
import CustomInput from "@components/UI/CustomInput";
import classes from "./styles.module.scss";


type PriceRange = {
  from: number,
  to: number,
}

interface PriceProps {
  filter: FilterPrice,
  queryParams: QueryParams,
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>,
}

function Price({filter, queryParams, setQueryParams}: PriceProps) {
  const [inputFrom, setInputFrom] = useState(filter.minPrice.toString())
  const [inputTo, setInputTo] = useState(filter.maxPrice.toString())
  const [priceRange, setPriceRange] = useState<PriceRange>({
    from: filter.minPrice,
    to: filter.maxPrice
  })


  useEffect(() => {
    const paramsPrice = queryParams[filter.key] || "";
    const [from, to] = paramsPrice.split("-");
    const newPriceRange: PriceRange = {
      from: Number(from) || filter.minPrice,
      to: Number(to) || filter.maxPrice
    }
    setInputsFromAndTo(newPriceRange)
    setPriceRange(newPriceRange);
  }, [queryParams[filter.key]]);


  function setInputsFromAndTo({from, to}: { from: string | number, to: string | number }) {
    setInputFrom(from.toString());
    setInputTo(to.toString());
  }


  function handleChangePrice(callback: React.Dispatch<React.SetStateAction<string>>) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      callback(event.target.value);
    }
  }


  function createIsValidPrice(validator: (newPriceRange: PriceRange) => PriceRange) {
    return () => {
      let newPriceRange: PriceRange = {from: Number(inputFrom), to: Number(inputTo)}

      if (isNaN(newPriceRange.from) || isNaN(newPriceRange.to)) {
        return setInputsFromAndTo(priceRange);
      }
      if (newPriceRange.from === priceRange.from && newPriceRange.to === priceRange.to) {
        return;
      }

      newPriceRange = validator(newPriceRange);

      if (newPriceRange.from !== filter.minPrice || newPriceRange.to !== filter.maxPrice) {
        setQueryParams({...queryParams, price: Object.values(newPriceRange).join('-')});
      } else {
        setQueryParams({...queryParams, price: null});
      }
      setInputsFromAndTo(newPriceRange);
      setPriceRange({...newPriceRange});
    }
  }


  function validatorFrom(newPriceRange: PriceRange): PriceRange {
    if (newPriceRange.from < filter.minPrice) {
      return {...priceRange, from: filter.minPrice}
    } else if (newPriceRange.from > priceRange.to) {
      return {...priceRange, from: priceRange.to}
    }
    return newPriceRange;
  }


  function validatorTo(newPriceRange: PriceRange): PriceRange {
    if (newPriceRange.to > filter.maxPrice) {
      return {...priceRange, to: filter.maxPrice}
    } else if (newPriceRange.to < priceRange.from) {
      return {...priceRange, to: priceRange.from}
    }
    return newPriceRange;
  }


  return (
    <div className={classes.price}>
      <div className={classes.price_input_wrap}>
        <p className={classes.price_input_title}>От</p>
        <CustomInput
          size="small"
          type="text"
          onChange={handleChangePrice(setInputFrom)}
          onBlur={createIsValidPrice(validatorFrom)}
          value={inputFrom}
        />
      </div>
      <div className={classes.price_input_wrap}>
        <p className={classes.price_input_title}>До</p>
        <CustomInput
          size="small"
          type="text"
          onChange={handleChangePrice(setInputTo)}
          onBlur={createIsValidPrice(validatorTo)}
          value={inputTo}
        />
      </div>
    </div>
  );
}


export default Price;