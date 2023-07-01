"use client";

import { useQuery } from "react-query";
import { getList } from "@/services/api/post";
import Board from "@/components/Board";
import "@/styles/post.scss";

export default async function Home() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["hydrate-posts"],
    queryFn: () => getList(),
  });

  return <div>{data && <Board data={data} />}</div>;
}
