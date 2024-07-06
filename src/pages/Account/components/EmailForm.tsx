import React from 'react';
import { useForm } from "react-hook-form";
import { clsx } from "clsx";
import { User } from "@/types";
import { useUpdateEmailMutation } from "@/services/api";
import { Panel, PanelHeader } from "@pages/Account/components/Panel";
import TitleInputWrap from "@pages/Account/components/TitleInputWrap.tsx";
import CustomInput from "@components/UI/CustomInput";
import classes from "@pages/Account/styles.module.scss";



type EmailFormValue = {
  email: string,
}

interface EmailFormProps {
  user: User
}

function EmailForm({user}: EmailFormProps) {
  const [updateEmail, updateEmailResult] = useUpdateEmailMutation();
  const {
    register,
    handleSubmit
  } = useForm<EmailFormValue>({ values: { email: user.email } });


  async function onSubmit(data: EmailFormValue){
    await updateEmail(data).unwrap()
  }


  return (
    <Panel>
      <PanelHeader>
        <h3 className={classes.title}>
          Изменить электронную почту
        </h3>
      </PanelHeader>

      <form className={classes.email_form} onSubmit={handleSubmit(onSubmit)}>
        <TitleInputWrap title="Электронная почта">
          <CustomInput
            formRegister={register("email", {required: ""})}
            placeholder="Электронная почта"
          />
        </TitleInputWrap>

        <button type="submit" className={clsx(classes.form_btn, "btn", "btn-fill")}>
          Сохранить
        </button>
      </form>
    </Panel>
  );
}

export default EmailForm;