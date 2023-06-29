import Link from "next/link";
import { getItem } from "@/services/api/post";

export default async (props: { params: { id: string } }) => {
  const {
    params: { id },
  } = props;
  const data = await getItem({ id });

  const { _id, title, content, start_date } = data;

  return (
    <div>
      <h3>제목: {title}</h3>
      <p>내용: {content}</p>
      <div>
        <span>등록 날짜: {start_date}</span>
      </div>
      <Link href={`/write/${_id}`}>글수정</Link>
    </div>
  );
};
