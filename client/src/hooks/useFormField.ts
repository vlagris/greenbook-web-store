import React, {useEffect, useRef, useState} from 'react';


export type FormField = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  error: boolean,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  isValid: () => boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur: () => void
}

export type FieldValidate = (state: string) => boolean;

interface UseFormFieldProps {
  initialState?: string,
  required?: boolean,
  validate?: FieldValidate
}

function UseFormField({initialState = "", required = false, validate}: UseFormFieldProps): FormField {
  const [value, setValue] = useState(initialState);
  const [error, setError] = useState( false);
  const validator = useRef<FieldValidate>(() => true);


  useEffect(() => {
    if (validate) {
      validator.current = validate
    }
  }, [validate]);



  function onBlur() {
    let result = true;
    if (value) {
      result = validator.current(value);
    }
    setError(!result);
    return result;
  }


  function isValid(): boolean {
    let result = true;
    if (required) {
      result = !!value;
    }
    if (result) {
      result = validator.current(value);
    }
    setError(!result);
    return result;
  }

  return {
    value,
    setValue,
    error,
    setError,
    isValid,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    onBlur
  };
}

export default UseFormField;