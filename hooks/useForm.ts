import { useState } from "react";

export interface IFormState {
  value: string;
  message: string;
  isValidated: boolean;
}

export type FormStateType = {
  [key: string]: IFormState;
};

const useForm = (formKey: {
  [key: string]: string;
}): [
  FormStateType,
  React.Dispatch<React.SetStateAction<FormStateType>>,
  (key: string) => (newState: Partial<IFormState>) => void
] => {
  const [formState, setFormState] = useState(
    Object.keys(formKey).reduce<FormStateType>((prev, curr) => {
      return {
        ...prev,
        [curr]: {
          value: "",
          message: "",
          isValidated: true,
        },
      };
    }, {})
  );

  const updateStateTo = (key: string) => (newState: Partial<IFormState>) => {
    if (newState.message && newState.isValidated === undefined) {
      newState.isValidated = false;
    }
    setFormState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...newState,
      },
    }));
  };

  return [formState, setFormState, updateStateTo];
};

export default useForm;
