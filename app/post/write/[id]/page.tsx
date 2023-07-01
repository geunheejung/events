"use client";

import WriteForm from "@/components/WriteForm";
import { getItem, setItem, updateItem } from "@/services/api/post";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default () => {
  const params = useParams();

  const { id } = params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = useCallback(
    ({ title, content }: EventPayloadType) => {
      updateItem({ title, content, _id: id });
    },
    [title, content]
  );

  useEffect(() => {
    const init = async () => {
      const data = await getItem({ id });
      setTitle(data.title);
      setContent(data.content);
    };

    init();
  }, []);

  return (
    <div>
      <h3>글 수정</h3>
      <WriteForm title={title} content={content} onSubmit={handleSubmit} />
    </div>
  );
};
