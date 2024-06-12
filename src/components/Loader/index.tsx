import React from 'react';
import { HttpError } from "@/types.ts";
import Error from "@pages/Error";
import classes from "./styles.module.scss";



interface LoaderProps {
  children: React.ReactNode,
  isLoading?: boolean
  error?: HttpError | null
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