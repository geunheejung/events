"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthTestLayout = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthTestLayout;
