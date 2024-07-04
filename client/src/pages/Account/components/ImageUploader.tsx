import React from 'react';
import {UseFormRegisterReturn} from "react-hook-form";
import classes from "@pages/Account/styles.module.scss";
import defaultImageUploader from "@/assets/images/default-image-uploader.png"



interface ImageUploaderProps {
  register:  UseFormRegisterReturn<any>,
  file: File | null,
  imageUrl: string | null,
  onDelete: () => void,
}

function ImageUploader({register, file, onDelete, imageUrl}: ImageUploaderProps) {

  return (
    <div className={classes.image_uploader}>
      <div className={classes.image_uploader_img_wrap}>
        <img
          className={classes.image_uploader_img}
          src={file ? URL.createObjectURL(file) : imageUrl || defaultImageUploader}
          alt=""
        />
      </div>

      {/*<p className={classes.image_uploader_description}>*/}
      {/*  jpg, png, не более 10000×10000 пикселей и 2Мб*/}
      {/*</p>*/}

      <div className={classes.image_uploader_buttons}>
        <label>
          <input
            className={classes.image_uploader_input}
            type="file"
            {...register}
            accept="image/png, image/jpeg"
          />
          <a className="btn btn-outline">
            Загрузить
          </a>
        </label>

        {(file || imageUrl) &&
          <button
            type="button"
            className="btn btn-text"
            onClick={onDelete}
          >
            Удалить
          </button>
        }
      </div>
    </div>
  );
}

export default ImageUploader;