import classes from "./styles.module.scss";
import NotFound from "@pages/Error/NotFound.tsx";
import {useRouteError} from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <main className={classes.error}>
      <NotFound/>
    </main>
  );
}

export default Error;