import React from 'react';
import { authSelectors } from "@/store";
import { useAppSelector } from "@/hooks/useTypedReduxHooks.ts";
import { useGetUserQuery } from "@/services/api";
import Loader from "@components/Loader";
import AccountForm from "@pages/Account/components/AccountForm.tsx";
import PasswordForm from "@pages/Account/components/PasswordForm.tsx";
import EmailForm from "@pages/Account/components/EmailForm.tsx";
import classes from "./styles.module.scss";



function Account() {
  const user = useAppSelector(authSelectors.user);
  const tokenSuccess = useAppSelector(authSelectors.tokenSuccess);
  const {isSuccess} = useGetUserQuery(undefined, {skip: !tokenSuccess});

  return (
    <Loader loaded={isSuccess}>
      <div className={classes.settings}>
        <div className="container">
          <AccountForm user={user}/>
          <EmailForm user={user}/>
          <PasswordForm/>
        </div>
      </div>
    </Loader>
  );
}

export default Account;