import React from "react";
import classes from "@pages/Login/styles.module.scss";
import LoginForm from "@pages/Login/LoginForm.tsx";


function Login() {

  return (
    <main>
      <div className={classes.login}>
        <LoginForm/>
      </div>
    </main>
  );
}

export default Login;