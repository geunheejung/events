import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * 'useSession', 'getSession'으로 반환되고, 'SessionProvider' 리액트 컨텍스트에서 프로퍼티로 수신됨.
   */
  interface Session {
    user: {
      role: "admin" | "user";
      email: string;
      accessToken: string;
      accessTokenExpiry: number;
      error: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiry: number;
    error: string;
  }
}
