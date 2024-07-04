import React, {useEffect, useState} from 'react';
import { HttpError } from "@/types";
import Error from "@pages/Error";
import classes from "./styles.module.scss";



type LoaderState = {
  isLoading: boolean
  error: HttpError | null
  loaded: boolean
}


interface LoaderProps {
  children: React.ReactNode,
  isLoading?: boolean
  error?: HttpError | any | null
  loaded?: boolean
}

function Loader({children, isLoading = false, error = null, loaded = false}: LoaderProps) {

  return (
    <>
      {isLoading || !loaded ?
        <div className={classes.loader_container}>
          <div className={classes.loader}></div>
        </div>
        :
        <>
          {error ?
            <Error/>
            :
            children
          }
        </>
      }
    </>
  );
}

export default Loader;