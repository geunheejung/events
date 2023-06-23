"use client";

import WriteForm from "@/components/WriteForm";
import { setItem } from "@/services/api";
import { useCallback, useState } from "react";

const Write = () => {
  const handleSubmit = useCallback(({ title, content }: IEventPayload) => {
    setItem({ title, content, _id: "" });
  }, []);

  return (
    <div>
      <WriteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Write;
