import React, { useState, useEffect } from 'react';

function UseValidationForm<T, U>(
    callback:()=>void, 
    initialState:T, 
    Validation: (v:T) => U|object,
    errorCallback:(e:U|object)=>void = () => { }
){
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<U|object>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (event?: React.MouseEvent<HTMLButtonElement>|React.FormEventHandler<HTMLFormElement>) => {
    if (event instanceof HTMLFormElement) {
      event.preventDefault();
    }
    setErrors(Validation(values));
    setIsSubmitting(true);
  };

  const handleReset = () => {
    setIsSubmitting(false);
    setErrors({});
    setValues(initialState);
  };

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length > 0) {
        errorCallback(errors);
      }else{
        callback();
      }
      setIsSubmitting(false);
    }
  }, [errors, callback, isSubmitting]);

  return {
    handleChange,
    handleReset,
    handleSubmit,
    setValues,
    values,
    validErrors: errors,
    setErrors
  };
}

export default UseValidationForm;