"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import TextField from "@/components/TextField";
import Btn from "@/components/Btn";
import "@/styles/form.scss";

const Login = () => {
  return (
    <form>
      <TextField label="Email Address" type="text" htmlFor="email-address" />
      <TextField label="Password" type="text" htmlFor="password" />
      <Link href="/member/signup">
        <p>Sign Up</p>
      </Link>
      <Btn label="로그인" />
    </form>
  );
};

export default Login;
