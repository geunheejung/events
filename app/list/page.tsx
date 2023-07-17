import { connectDB } from "@/utils/database";

import "@/styles/list-styles.scss";

export const getList = async () => {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  return result;
};

export default async function List() {
  const data = await getList();
  return (
    <div className="list-bg">
      <div className="list-item">
        <h4>글제목</h4>
        <p>1월 1일</p>
      </div>
      <div className="list-item">
        <h4>글제목</h4>
        <p>1월 1일</p>
      </div>
      <div className="list-item">
        <h4>글제목</h4>
        <p>1월 1일</p>
      </div>
    </div>
  );
}
