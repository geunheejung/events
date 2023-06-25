import Btn from "@/components/Btn";
import TextField from "@/components/TextField";

const SignUp = () => {
  return (
    <form>
      {/* email - email 인증 */}
      {/* password */}
      {/* password 재입력 */}
      {/* username */}
      <div
        style={{
          display: "flex",
          alignItems: "end",
          gap: 15,
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="Email Address"
          type="text"
          htmlFor="email-address"
          placeholder="이메일를 입력해주세요"
        />
        <Btn label="중복확인" style={{ height: 56 }} />
      </div>
      <TextField
        label="Password"
        type="text"
        htmlFor="password"
        placeholder="비밀번호를 입력해주세요"
      />
      <TextField
        label=""
        type="text"
        htmlFor="password"
        placeholder="한번 더 입력해주세요"
      />
      <Btn label="로그인" />
    </form>
  );
};

export default SignUp;
