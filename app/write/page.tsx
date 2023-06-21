"use client";

import { setItem } from "@/services/api";
import { useCallback, useState } from "react";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e;

      setTitle(value);
    },
    [title]
  );

  const handleContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const {
        target: { value },
      } = e;

      setContent(value);
    },
    [title]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setItem({ title, content });
    },
    [title, content]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>title</label>
        <input type="text" onChange={handleTitle} />
        <label>content</label>
        <textarea cols={30} rows={10} onChange={handleContent} />
        <input type="submit" value="write" />
      </form>
    </div>
  );
};

export default Write;
