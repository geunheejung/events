"use client";

import { useState } from "react";

import Btn from "@/components/Btn";
import TextField from "@/components/TextField";
import { validateEmail, validateName } from "@/utils/validate";
import { checkDuplicateName } from "@/services/api/member";

interface IFormState {
  value: string;
  message: string;
  isValidated: boolean;
}

type FormStateType = {
  [key: string]: IFormState;
};

const SignUp = () => {
  const formKey = {
    email: "email",
    password: "password",
    rePassword: "rePassword",
    name: "name",
  } as const;

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
    setFormState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...newState,
      },
    }));
  };

  const handleInput = (
    value: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { id },
    } = e;

    updateStateTo(id)({ value, message: "", isValidated: true });
  };

  const handleDuplicateCheck = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const isDuplicated = await checkDuplicateName({
      name: formState[formKey.name].value,
    });

    if (isDuplicated) {
      updateStateTo(formKey.name)({
        isValidated: false,
        message: "이미 존재하는 이름 입니다.",
      });
    }
  };

  const validate = () => {
    const {
      [formKey.email]: email,
      [formKey.password]: password,
      [formKey.rePassword]: rePassword,
      [formKey.name]: name,
    } = formState;

    const isEmailValid = validateEmail(email.value);
    const isPasswordValid = validateEmail(password.value);
    const isRePasswordValid = password.value === rePassword.value;
  };

  return (
    <form>
      {/* email - email 인증 */}
      {/* password */}
      {/* password 재입력 */}
      {/* username */}
      <TextField
        label="Email Address"
        type="text"
        htmlFor={formKey.email}
        placeholder="이메일를 입력해주세요"
        onChange={handleInput}
      />
      <TextField
        label="Password"
        type="password"
        htmlFor={formKey.password}
        placeholder="비밀번호를 입력해주세요"
        onChange={handleInput}
      />
      <TextField
        label=""
        type="password"
        htmlFor={formKey.rePassword}
        placeholder="한번 더 입력해주세요"
        onChange={handleInput}
      />
      <div
        style={{
          display: "flex",
          alignItems: "end",
          gap: 15,
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="이름"
          type="text"
          htmlFor={formKey.name}
          placeholder="이름을 입력해주세요"
          message={formState[formKey.name].message}
          onChange={handleInput}
        />
        <Btn
          label="중복확인"
          style={{ height: 56 }}
          disabled={!formState[formKey.name].value}
          onClick={handleDuplicateCheck}
        />
      </div>

      <Btn label="로그인" />
    </form>
  );
};

export default SignUp;
