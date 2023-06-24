import { getList } from "@/services/api";
import Board from "@/components/Board";
import "@/styles/post.scss";

export default async function Home() {
  const res = await getList();

  return <Board data={res.data} />;
}
