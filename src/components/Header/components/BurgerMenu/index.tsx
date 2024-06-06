import {useState} from "react";
import { genresSelectors } from "@/store/genres";
import {useAppSelector} from "@/hooks/useTypedReduxHooks.ts";
import Modal from "@components/UI/Modal";
import BurgerButton from "@components/Header/components/BurgerMenu/BurgerButton.tsx";
import BurgerMenuItem from "@components/Header/components/BurgerMenu/BurgerMenuItem.tsx";
import classes from "./styles.module.scss";



function BurgerMenu() {
  const genres = useAppSelector(genresSelectors.genres);
  const [show, setShow] = useState(false);


  function handleClick(state: boolean) {
    return () => setShow(state);
  }


  return (
    <>
      <BurgerButton onClick={handleClick(!show)}/>

      <Modal
        className={classes.modal}
        onHide={handleClick(false)}
        show={show}
      >
        <div className={classes.menu}>
          <ul>

            {genres.map((genre) => (
              <BurgerMenuItem
                key={genre.id}
                to={`/catalog/${genre.pathName}`}
                name={genre.name}
                onClick={handleClick(false)}
              />
            ))}

          </ul>
        </div>
      </Modal>
    </>
  );
}

export default BurgerMenu;

