import {Link} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";
import {currency} from "@/constants.ts";
import classes from "../styles.module.scss";
import MapPinIcon from '@assets/icons/map-pin.svg?react';

function HeaderTop() {
  const {isAuth} = useAuth();

  return (
    <div className={classes.header_top}>
      <div className="container">
        <div className={classes.top_wrap}>
          <button className={classes.location_button}>
            <MapPinIcon className={classes.location_icon}/>
            <p className={classes.top_text}>Москва</p>
          </button>
          <div className={classes.top_right}>
            <p className={classes.top_text}>{currency.RUB.abbreviation}</p>

            {!isAuth &&
              <>
                <div className={classes.top_line}/>
                <div className={classes.auth_links}>
                  <Link to="/login" className={classes.top_text}>Войти</Link>
                  <span className={classes.top_text}>/</span>
                  <Link to="/signup" className={classes.top_text}>Зарегистрироваться</Link>
                </div>
              </>
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;