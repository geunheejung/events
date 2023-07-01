"use client";

import { useQuery } from "react-query";
import { getList } from "@/services/api/post";
import Board from "./Board";

const PostList = () => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["hydrate-posts"],
    queryFn: () => getList(),
  });

  console.log(isLoading, isFetching, error);

  return <>{data && <Board data={data} />}</>;
};

export default PostList;
