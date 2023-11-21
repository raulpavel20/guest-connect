"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import hotelAPI from "@/lib/data/hotel";
import contentAPI from "@/lib/data/constent";

export default function ContentPage({
  params,
}: {
  params: { establishment: string };
}) {
  const router = useRouter();
  const { establishment } = params;

  useEffect(() => {
    hotelAPI.get(establishment).then(async (res) => {
      const contentResponse = await contentAPI.get({
        hotel: establishment,
        path: "00",
      });
      if (contentResponse.error) {
        throw new Error("No root content was found");
      }
      const root = contentResponse[0];

      router.push(`/${establishment}/folder?id=${root._id}&title=${root.title}`);
    });
  }, []);

  return <></>;
}
