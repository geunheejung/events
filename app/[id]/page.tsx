"use client";

import { getItem } from "@/services/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default () => {
  const [eventPost, setEventPost] = useState<IEvent>();
  const params = useParams();

  const init = async () => {
    const { id } = params;
    const data = await getItem({ id });

    setEventPost(data);
  };

  useEffect(() => {
    init();
  }, []);

  if (!eventPost) return "Loading...";

  const { _id, title, content, start_date } = eventPost;

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
