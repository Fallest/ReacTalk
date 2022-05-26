import { useState } from "react";

/**
 * Allows reusability and cleaner code when using forms.
 *
 * @param callback A callback function that will be called when onSubmit is called.
 * @param initialState The initial state of the values.
 * @returns onChange, onSubmit functions, and the values.
 */
export const useForm = (callback: any, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
