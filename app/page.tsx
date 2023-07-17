import { Login, Logout } from "@/components/LoginBtn";

const NormalProfile = () => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <div className="shrink-0">
        {/* <d className="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo"> */}
      </div>
      <div>
        <div className="text-xl font-medium text-black">ChitChat</div>
        <p className="text-slate-500">You have a new message!</p>
      </div>
    </div>
  );
};

export default async function Home(props: any) {
  return (
    <div>
      <h1>Hello, Next.js 13 App Directory!</h1>
      <NormalProfile />
      <Login />
    </div>
  );
}
