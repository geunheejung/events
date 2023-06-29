"use client";

import { useCallback, useEffect, useState } from "react";

interface IProps {
  title?: string;
  content?: string;
  onSubmit: (payload: EventPayloadType) => void;
}

const WriteForm = (props: IProps) => {
  const { title = "", content = "", onSubmit } = props;

  const [_title, setTitle] = useState("");
  const [_content, setContent] = useState("");

  const handleTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = e;

      setTitle(value);
    },
    [_title]
  );

  const handleContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const {
        target: { value },
      } = e;

      setContent(value);
    },
    [_title]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit({ title: _title, content: _content, _id: "" });
    },
    [_title, _content]
  );

  useEffect(() => {
    setTitle(title);
    setContent(content);
  }, [title, content]);

  return (
    <form onSubmit={handleSubmit}>
      <label>title</label>
      <input type="text" value={_title} onChange={handleTitle} />
      <label>_content</label>
      <textarea cols={30} rows={10} value={_content} onChange={handleContent} />
      <input type="submit" value="write" />
    </form>
  );
};

export default WriteForm;
