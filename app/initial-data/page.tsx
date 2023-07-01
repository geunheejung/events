import { getList } from "@/services/api/post";
import ListPosts from "@/app/initial-data/list-posts";

const InitialData = async () => {
  const posts = await getList();

  return <ListPosts posts={posts} />;
};

export default InitialData;
