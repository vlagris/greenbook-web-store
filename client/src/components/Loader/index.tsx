import React from 'react';
import classes from "./styles.module.scss";
import Error from "@pages/Error";
import { HttpError } from "@/types.ts";


interface LoaderProps {
  children: React.ReactNode,
  isLoading: boolean
  error?: HttpError | null
  data?: boolean
}

function Loader({children, isLoading, error, data}: LoaderProps) {


  return (
    <>
      {isLoading && !data ?
        <div className={classes.wrap}>
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