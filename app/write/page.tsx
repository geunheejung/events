"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import WriteForm from "@/components/WriteForm";
import { setItem } from "@/services/api";

const Write = () => {
  const router = useRouter();

  const handleSubmit = useCallback(
    async ({ title, content }: IEventPayload) => {
      const res = await setItem({ title, content, _id: "" });
      if (res.ok) {
        router.push("/");
      }
    },
    []
  );

  return (
    <div>
      <WriteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Write;
