import { AuthOptions, User } from "next-auth";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { client, connectDB } from "@/utils/database";
import { decrypt } from "dotenv";
import { refreshAccessToken, signIn } from "@/services/api/member";

export const authOptions: AuthOptions = {
  secret: `${process.env.NEXT_PUBLIC_JWT_SECRET_KET}`,
  providers: [
    GithubProvider({
      clientId: "4934b8e3ccd0c6381d42",
      clientSecret: `${process.env.GITHUB_OAUTH_KEY}`,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is  used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "이메일",
          type: "text",
          placeholder: "이메일 입력하세요",
        },
        password: { label: "비밀번호", type: "password" },
      },
      /**
       * 2. 로그인요청 시 실행되는 코드
       * 안의 로직은 내가 직접 작성해야 함.
       */
      async authorize(credentials, req) {
        if (!credentials) return null;

        try {
          // 여기서 바로 db 접근 안하고 api 요청해도될듯
          // login api
          const user = await signIn({
            email: credentials.email,
            password: credentials.password,
          });

          if (user.data.accessToken) {
            return {
              id: "",
              ...user.data,
            };
          }

          return null;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    // 사용자 세션을 저장할 방법을 선택, 기본값은 세션 쿠키에 암호화된 JWT
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  /**
   * 동작이 수행될 때 일어나는 일을 제어
   * 데이터베이스 없이 액세스 제어를 구현하고 외부 데이터베이스 또는 API와 통합 가능
   * 특히 json web token과 관련된 시나리오에서 매우 강력
   */
  callbacks: {
    /**
     * 4. jwt 만들 때 실행되는 코드
     * user변수는 DB의 유저정보가 담겨있고, token.user에 저장 시 jwt에 담긴다.
     * json 웹 토큰이 생성되거나(로그인할 때) 업데이트될 때마다(클라이언트에서 세션에 엑세스) 호출된다.
     * 이 콜백의 콘텐츠는 세션 콜백으로 전달되며, 클라이언트에 반환할 내용을 제어할 수 있음.
     * 리턴값이 세션 콜백으로 전달 되는 듯.
     *
     * @param param0
     */
    jwt: async ({ token, user }) => {
      console.log("JWT!!", user);
      if (user) {
        const _user = user as unknown as ISignInResponse;
        const { accessToken, accessTokenExpiry, refreshToken } = _user;
        token.accessToken = accessToken;
        token.accessTokenExpiry = accessTokenExpiry;
        token.refreshToken = refreshToken;
      }

      const shouldRefreshTime = Math.round(
        (token.accessTokenExpiry as number) - 60 * 60 * 1000 - Date.now()
      );

      // 토큰이 유효하다 판단되면 반환하면 된다.
      // token.accessTokenExpiry 은 토큰의 발행 시각을 기점으로 유효한 지점 - 현재 시점 음수일 경우 만료
      if (shouldRefreshTime > 0) {
        return Promise.resolve(token);
      }

      token = await refreshAccessToken(token);
      return Promise.resolve(token);
    },
    /**
     * 5. 유저 세션이 조회될 때 마다 실행되는 코드.
     * 세션이 확인될 때마다 호출된다.
     * ex) /api/session 엔드포인트 호출, useSession 또는 getSession 사용
     * 기본적으로 보안을 강화하기 위해 토큰의 하위 집합만 반환됨.
     * @param param0
     * @returns
     */
    session: async ({ session, token }) => {
      // 여기서 refresh token도 같이 만들어서 내려줘야할듯

      session.user = {
        role: "admin",
        email: token.email || "",
        accessToken: token.accessToken,
        accessTokenExpiry: token.accessTokenExpiry,
        error: token.error,
      };
      return Promise.resolve(session);
    },
  },
  // adapter:
};

const handler = NextAuth(authOptions);

// nextjs 13에서는 GET, POST로 export 해줘야 인식됨.
export { handler as GET, handler as POST };
