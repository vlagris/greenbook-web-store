import classes from "./styles.module.scss";
import NotFound from "@pages/Error/NotFound.tsx";



function Error() {
  return (
    <div className={classes.error}>
      <NotFound/>
    </div>
  );
}

export default Error;