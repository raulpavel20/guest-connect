"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import parse from "html-react-parser";
import contentAPI from "@/lib/data/constent";
import { prepareSrc } from "@/lib/utils";
import Button from "@/components/button";
export default function ArticlePage({}: {}) {
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");
  const queryTitle = searchParams.get("title");

  interface ContentInterface {
    blocks?: {
      type: string;
      content: {
        paragraphs?: string[];
        url?: string;
        destination?: string;
        action?: string;
        label?: string;
      };
    }[];
    _id?: string;
  }

  const [content, setContent] = useState<ContentInterface>({});
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!queryId || !queryTitle) {
      throw new Error("No article params were found");
    }

    contentAPI.get({ _id: queryId }).then((res) => {
      setContent(res[0]);
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
      {content.blocks?.map((block) => {
        switch (block.type) {
          case "ARTICLE_HTML":
            if (!block.content.paragraphs) {
              return <></>;
            }
            return (
              <div className="mb-6">{parse(block.content.paragraphs[0])}</div>
            );
          case "ARTICLE_IMAGE":
            if (!block.content.url) {
              return <></>;
            }
            return (
              <Image
                src={prepareSrc(block.content.url)}
                alt="article image"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto mb-6 rounded-lg"
              />
            );
          case "ARTICLE_VIDEO":
            if (!block.content.url) {
              return <></>;
            }
            const youtubeURL = new URL(block.content.url);
            return (
              <iframe
                className="w-full h-auto mb-6 rounded-lg"
                src={`https://www.youtube.com/embed/${youtubeURL.searchParams.get(
                  "v",
                )}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            );
          case "ARTICLE_BUTTON":
            if (
              !block.content.label ||
              !block.content.destination ||
              !block.content.action
            ) {
              return <></>;
            }
            return (
              <Button
                label={block.content.label}
                onClick={() => {
                  switch (block.content.action) {
                    case "URL":
                      window.open(
                        block.content.destination,
                        "_blank",
                        "noopener,noreferrer",
                      );
                      break;
                  }
                }}
                className="mb-6"
              />
            );
        }
      })}
    </>
  );
}
