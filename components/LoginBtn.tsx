"use client";

import { signIn, signOut } from "next-auth/react";

const Button = ({ onClick, text }: { onClick: () => void; text: string }) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </button>
  );
};

export const Login = () => <Button onClick={() => signIn()} text="login" />;
export const Logout = () => <Button onClick={() => signOut()} text="logout" />;

export default Button;
