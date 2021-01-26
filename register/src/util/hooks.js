import { useState } from "react";
/**
 * Hooks to change states of values, used to create new clocks in user dashboard.
 * @param {*} callback
 * @param {*} initialState
 */
export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
