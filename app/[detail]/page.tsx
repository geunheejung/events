"use client";

import { getItem } from "@/services/api";
import { useParams } from "next/navigation";

export default async () => {
  const params = useParams();
  const { detail } = params;
  const data = await getItem({ id: detail });
  console.log(data);
  return <div>Detai;;</div>;
};
