import { getList } from "@/services/api/post";
import Board from "@/components/Board";
import "@/styles/post.scss";

export default async function Home() {
  const data = await getList();

  if (!data) return null;

  return <Board data={data} />;
}
