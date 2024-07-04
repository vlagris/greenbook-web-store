import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { clsx } from "clsx";
import { User } from "@/types";
import {useUpdateUserMutation} from "@/services/api";
import { Panel, PanelHeader } from "@pages/Account/components/Panel";
import ImageUploader from "@pages/Account/components/ImageUploader.tsx";
import TitleInputWrap from "@pages/Account/components/TitleInputWrap.tsx";
import CustomInput from "@components/UI/CustomInput";
import classes from "@pages/Account/styles.module.scss";



type AccountFormValue = {
  firstName: string,
  lastName: string,
  avatar: FileList,
}

interface AccountFormProps {
  user: User
}

function AccountForm({user}: AccountFormProps) {
  const [updateUser] = useUpdateUserMutation()
  const [avatarDeleted, setAvatarDeleted] = useState(false);
  const {
    register,
    watch,
    setValue,
    handleSubmit
  } = useForm<AccountFormValue>({
    values: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      avatar: new DataTransfer().files
    }
  });


  useEffect(() => {
    setAvatarDeleted(false);
  }, [user.avatar]);


  function deleteAvatar() {
    setValue("avatar", new DataTransfer().files);
    setAvatarDeleted(true);
  }


  async function onSubmit(data: AccountFormValue){
    const form = new FormData();
    form.append('firstName', data.firstName);
    form.append('lastName', data.lastName);

    if (data.avatar[0]) {
      form.append('avatar', data.avatar[0]);
    } else if (avatarDeleted) {
      form.append('avatar',"deleted");
    }

    await updateUser(form).unwrap()
  }

  return (
    <Panel>
      <PanelHeader>
        <h3 className={classes.title}>
          Настройки учетной записи
        </h3>
      </PanelHeader>

      <form className={classes.account_form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.account_form_inputs}>
          <TitleInputWrap title="Имя">
            <CustomInput
              formRegister={register("firstName", {required: ""})}
              placeholder="Имя"
            />
          </TitleInputWrap>
          <TitleInputWrap title="Фамилия">
            <CustomInput
              formRegister={register("lastName", {required: ""})}
              placeholder="Фамилия"
            />
          </TitleInputWrap>
        </div>

        <ImageUploader
          register={register("avatar")}
          file={watch("avatar")[0]}
          imageUrl={avatarDeleted ? "" : user.avatar}
          onDelete={deleteAvatar}
        />


        <button type="submit" className={clsx(classes.form_btn, "btn", "btn-fill")}>
          Сохранить
        </button>
      </form>
    </Panel>
  );
}

export default AccountForm;