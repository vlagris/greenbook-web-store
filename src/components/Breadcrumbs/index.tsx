import Item from "@components/Breadcrumbs/Item";
import classes from "./styles.module.scss";


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