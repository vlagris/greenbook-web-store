import classes from "./styles.module.scss";
import Item from "@components/Breadcrumbs/Item";


export type Crumb = {
  name: string,
  pathName: string
}

function Breadcrumbs({crumbs}: {crumbs: Crumb[]}) {

  return (
    <div className={classes.breadcrumbs}>
      <div className="container">
        <ul className={classes.list}>

          <Item to="/" crumbName="Главная"/>
          {crumbs.map(({name, pathName}, index) => (
              <Item key={index} to={pathName} crumbName={name}/>
          ))}
        </ul>
      </div>
    </div>

  );
}

export default Breadcrumbs;