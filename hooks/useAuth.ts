"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useAuth(shouldRedirect: boolean) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (session === null) {
      if (router.route !== "/login") {
        router.replace("/login");
      }
      setIsAuthenticated(false);
      return;
    } else if (session !== undefined) {
      if (router.route === "/login") {
        router.replace("/");
      }
      setIsAuthenticated(true);
    }

    if (session.user.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/login", redirect: shouldRedirect });
    }
  }, [session]);

  return isAuthenticated;
}
