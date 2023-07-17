import { getUser } from "@/services/api/member";
import { redirect } from "next/navigation";
import { use } from "react";

export default async () => {
  let users = await getUser();

  return <div>프로필 페이지 입니다.</div>;
};
