import {useState} from "react";
import {NavLink} from "react-router-dom";
import Modal from "@components/UI/Modal";
import {useAppSelector} from "@/hooks/useTypedReduxHooks.ts";
import { genresSelectors } from "@/store/genres";
import classes from "./styles.module.scss";
import BurgerButton from "@components/Header/BurgerMenu/BurgerButton.tsx";



function BurgerMenu() {
  const genres = useAppSelector(genresSelectors.genres);
  const [show, setShow] = useState(false);


  function handleClick(state: boolean) {
    return () => setShow(state);
  }

  return (
    <>
      <BurgerButton onClick={handleClick(!show)}/>

      <Modal show={show} onHide={handleClick(false)} className={classes.modal}>
        <div className={classes.menu}>
          <ul>

            {genres.map((genre) => (
              <li key={genre.id} className={classes.item}>
                <NavLink
                  to={`/catalog/${genre.pathName}`}
                  className={classes.link}
                  onClick={handleClick(false)}
                >

                  <span className={classes.item_text}>
                    {genre.name}
                  </span>
                </NavLink>
              </li>
            ))}

          </ul>
        </div>
      </Modal>
    </>
  );
}

export default BurgerMenu;

