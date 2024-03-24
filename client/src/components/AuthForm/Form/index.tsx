import {FormEvent, ReactNode} from 'react';
import classes  from "./styles.module.scss";


interface IForm {
  children: ReactNode,
  title: string,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function Form({children, title, onSubmit, ...props}: IForm) {
  return (
    <div className={classes.form}>
      <form onSubmit={onSubmit} {...props}>
        <h3 className={classes.title}>{title}</h3>
        {children}
      </form>
    </div>
  );
}

export default Form;