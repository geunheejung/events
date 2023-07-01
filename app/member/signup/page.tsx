"use client";

import { useMemo } from "react";
import Btn from "@/components/Btn";
import TextField from "@/components/TextField";
import { validateEmail, validatePassword } from "@/utils/validate";
import { checkDuplicateName, signUp } from "@/services/api/member";
import useForm from "@/hooks/useForm";

const SignUp = () => {
  const formKey = {
    email: "email",
    password: "password",
    rePassword: "rePassword",
    name: "name",
  } as const;
  const [formState, setFormState, updateStateTo] = useForm(formKey);

  const {
    [formKey.email]: email,
    [formKey.password]: password,
    [formKey.rePassword]: rePassword,
    [formKey.name]: name,
  } = formState;

  const isDisabled = useMemo(() => name.isValidated || !name.value, [name]);

  const fetchSignUp = async () => {
    const payload: ISignUpPayload = {
      email: email.value,
      password: password.value,
      username: name.value,
    };

    const res = await signUp(payload);
  };

  const validateName = async () => {
    const updater = updateStateTo(formKey.name);

    if (name.value.length < 2) {
      updater({ message: "이름 양식에 맞지 않습니다." });
      return false;
    }

    const isDuplicated = await checkDuplicateName({
      name: formState[formKey.name].value,
    });

    if (isDuplicated) {
      updater({ message: "이미 존재하는 이름 입니다." });
      return false;
    }

    updater({ message: "", isValidated: true });

    return true;
  };

  const validate = async () => {
    let isValid = true;

    const isEmailValid = validateEmail(email.value);
    const isPasswordValid = validatePassword(password.value);
    const isRePasswordValid = password.value === rePassword.value;

    if (!isEmailValid) {
      updateStateTo(formKey.email)({
        message: "이메일 양식이 틀렸습니다",
      });

      isValid = false;
    }
    if (!isPasswordValid) {
      updateStateTo(formKey.password)({
        message: "비밀번호 양식이 틀렸습니다",
      });

      isValid = false;
    }

    if (!isRePasswordValid) {
      updateStateTo(formKey.rePassword)({
        message: "비밀번호가 다릅니다",
      });

      isValid = false;
    }

    const isValidName = await validateName();
    if (!isValidName) isValid = false;

    return isValid;
  };

  const handleInput = (
    value: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { id },
    } = e;
    updateStateTo(id)({ value, message: "", isValidated: false });
  };

  const handleDuplicateCheck = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    validateName();
  };

  const handleSignUp = async () => {
    const isValid = await validate();

    if (!isValid) return;

    // 모든 양식이 유효하면 회원가입 진행해야함.
    fetchSignUp();
  };

  return (
    <form>
      <TextField
        label="Email Address"
        type="text"
        htmlFor={formKey.email}
        placeholder="이메일를 입력해주세요"
        message={email.message}
        onChange={handleInput}
      />
      <TextField
        label="Password"
        type="password"
        htmlFor={formKey.password}
        placeholder="비밀번호를 입력해주세요"
        message={password.message}
        onChange={handleInput}
      />
      <TextField
        label=""
        type="password"
        htmlFor={formKey.rePassword}
        placeholder="한번 더 입력해주세요"
        message={rePassword.message}
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
          message={name.message}
          onChange={handleInput}
        />
        <Btn
          label="중복확인"
          style={{ height: 56 }}
          disabled={isDisabled}
          onClick={handleDuplicateCheck}
        />
      </div>

      <Btn label="회원가입" onClick={handleSignUp} />
    </form>
  );
};

export default SignUp;
