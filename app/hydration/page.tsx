"use client";

import { dehydrate } from "react-query";
import Hydrate from "@/utils/hydrate.client";
import { getList } from "@/services/api/post";
import getQueryClient from "@/utils/getQueryClient";
import ListPosts from "./list-posts";

const Hydation = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-posts"], getList);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ListPosts />
    </Hydrate>
  );
};

export default Hydation;
