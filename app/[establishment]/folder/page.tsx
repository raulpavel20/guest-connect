"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentCard from "./components/content-card";
import contentAPI from "@/lib/data/constent";
import { prepareSrc } from "@/lib/utils";

export default function FolderPage({
  params,
}: {
  params: { establishment: string };
}) {
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");
  const queryTitle = searchParams.get("title");
  const router = useRouter();

  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!queryId || !queryTitle) {
      throw new Error("No folder params were found");
    }

    contentAPI.get({ parent_id: queryId }).then((res) => {
      setContent(res);
      setTitle(queryTitle);
    });
  }, [queryId, queryTitle]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          {title}
        </h1>
      </div>
      <ul
        role="list"
        className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6"
      >
        {content.map(
          (element: {
            cover_image: [{ url: string }];
            title: string;
            _id: string;
            type: string;
            cover_image_small: [{ file_base64: string }];
          }) => {
            const { cover_image, title, type, _id, cover_image_small } =
              element;
            return (
              <ContentCard
                image={prepareSrc(cover_image[0].url)}
                image_small={cover_image_small[0].file_base64}
                key={_id}
                title={title}
                onClick={() => {
                  switch (type) {
                    case "FOLDER":
                      router.push(`folder?id=${_id}&title=${title}`);
                      break;
                    case "ARTICLE":
                      router.push(`article?id=${_id}&title=${title}`);
                  }
                }}
              />
            );
          },
        )}
      </ul>
    </>
  );
}
