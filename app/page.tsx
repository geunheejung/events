import { connectDB, client } from "@/utils/database";

export default async function Home() {
  const db = client.db("forum");
  const post = await db.collection("post").find().toArray();
  console.log(post);
  return <div>Hello Nextjs Wor</div>;
}
