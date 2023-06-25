import "@/styles/form.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sign-form-container">
      <h1>Sign in</h1>
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
