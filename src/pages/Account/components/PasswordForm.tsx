import React from 'react';
import {useForm} from "react-hook-form";
import {clsx} from "clsx";
import {Panel, PanelHeader} from "@pages/Account/components/Panel";
import TitleInputWrap from "@pages/Account/components/TitleInputWrap.tsx";
import {FormInputPassword} from "@/components/AuthForm"
import {useUpdatePasswordMutation} from "@/services/api";
import classes from "@pages/Account/styles.module.scss";



type PasswordFormValue = {
  currentPass: string,
  newPass: string,
  confirmNewPass: string,
}

function PasswordForm() {
  const [updatePassword, updatePasswordResult] = useUpdatePasswordMutation();
  const {
    register,
    setValue,
    handleSubmit
  } = useForm<PasswordFormValue>();

  async function onSubmit({currentPass, newPass}: PasswordFormValue){
    console.log(currentPass)
    console.log(newPass)
    try {
      await updatePassword({currentPassword: currentPass, newPassword: newPass}).unwrap();
      setValue("currentPass", "");
      setValue("newPass", "");
      setValue("confirmNewPass", "");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Panel>
      <PanelHeader>
        <h3 className={classes.title}>
          Изменить пароль
        </h3>
      </PanelHeader>

      <form className={classes.password_form} onSubmit={handleSubmit(onSubmit)}>

        <div className={classes.password_form_input_wrap}>
          <TitleInputWrap title="Текущий пароль">
            <FormInputPassword
              formRegister={register("currentPass", {required: ""})}
              placeholder="Пароль"
            />
          </TitleInputWrap>
        </div>

        <div className={classes.password_form_input_wrap}>
          <TitleInputWrap title="Новый пароль">
            <FormInputPassword
              formRegister={register("newPass", {required: ""})}
              placeholder="Пароль"
            />
          </TitleInputWrap>
          <TitleInputWrap title="Подтвердите новый пароль">
            <FormInputPassword
              formRegister={register("confirmNewPass", {required: ""})}
              placeholder="Пароль еще раз"
            />
          </TitleInputWrap>
        </div>


        <button type="submit" className={clsx(classes.form_btn, "btn", "btn-fill")}>
          Сохранить
        </button>
      </form>
    </Panel>
  );
}

export default PasswordForm;