import classes from "./styles.module.scss";
import NotFound from "@pages/Error/NotFound.tsx";



function Error() {
  return (
    <main className={classes.error}>
      <NotFound/>
    </main>
  );
}

export default Error;