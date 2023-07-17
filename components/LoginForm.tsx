"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import TextField from "@/components/TextField";
import Btn from "@/components/Btn";
import { validateEmail, validatePassword } from "@/utils/validate";
import { signIn } from "@/services/api/member";
import "@/styles/form.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState({ email: "", password: "" });

  const updateErrorMsgTo = (key: "email" | "password") => (message: string) => {
    setErrorMsg((prev) => ({ ...prev, [key]: message }));
  };

  const fetchSignIn = async () => {
    const res = await signIn({ email, password });

    console.log("res ->", res);
  };

  const validate = useCallback(() => {
    let isValidated = true;

    if (!validateEmail(email)) {
      updateErrorMsgTo("email")("이메일 양식을 맞춰주세요.");

      isValidated = false;
    }

    if (!validatePassword(password)) {
      updateErrorMsgTo("password")("비밀번호 양식을 맞춰주세요.");

      isValidated = false;
    }

    return isValidated;
  }, [email, password]);

  const handleEmail = (value: string) => {
    setEmail(value);
    updateErrorMsgTo("email")("");
  };

  const handlePassword = (value: string) => {
    setPassword(value);
    updateErrorMsgTo("password")("");
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const isValidated = validate();

    if (!isValidated) return;

    fetchSignIn();
  };

  return (
    <form className="sign-in-container">
      <TextField
        label="Email Address"
        type="text"
        htmlFor="email-address"
        message={errorMsg.email}
        onChange={handleEmail}
      />
      <TextField
        label="Password"
        type="password"
        htmlFor="password"
        message={errorMsg.password}
        onChange={handlePassword}
      />
      <Link href="/member/signup">
        <p>Sign Up</p>
      </Link>
      <Btn label="로그인" onClick={handleSubmit} />
    </form>
  );
};

export default LoginForm;
