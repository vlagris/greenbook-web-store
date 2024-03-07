import React from "react";
import classes from "@pages/Signup/styles.module.scss";
import RegisterForm from "@pages/Signup/RegisterForm.tsx";


function Signup() {

  return (
    <main>
      <div className={classes.signup}>
        <RegisterForm/>
      </div>
    </main>
  );
}

export default Signup;