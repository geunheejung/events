"use client";

import { SessionProvider } from "next-auth/react";

export default ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};
