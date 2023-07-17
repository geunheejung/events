import { cookies } from "next/headers";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  const cookieStore = cookies();
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
