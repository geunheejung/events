"use client";

import { useQuery } from "react-query";
import Board from "@/components/Board";
import { getList } from "@/services/api/post";

const ListPosts = ({ posts }: { posts: IEvent[] }) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["hydrate-posts"],
    queryFn: () => getList(),
    initialData: posts,
  });

  return <div>{data && <Board data={data} />}</div>;
};

export default ListPosts;
