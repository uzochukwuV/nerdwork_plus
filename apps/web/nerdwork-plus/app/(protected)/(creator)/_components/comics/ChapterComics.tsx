import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chapter } from "@/lib/types";
import { Calendar, Edit2, Eye, ImageIcon, Send } from "lucide-react";
import Image from "next/image";
import React from "react";
import ChapterActions from "./ChapterActions";

const ChapterComics = ({ data }: { data: Chapter[] }) => {
  return (
    <main className="flex flex-col gap-10 pb-10">
      {data.map((chapter) => (
        <section
          key={chapter.id}
          className="flex max-md:flex-col md:justify-between gap-8 md:gap-16"
        >
          <div className="md:w-[80%] text-nerd-muted flex gap-8">
            <Image
              src={chapter.image}
              width={92}
              height={132}
              alt="Chapter cover"
              className="w-[92px] h-[132px] object-cover rounded-[6px] max-md:hidden"
            />
            <div className="space-y-2">
              <p className="text-white flex items-center gap-2">
                {chapter.title}{" "}
                <Badge
                  className={` ${
                    chapter.status == "published"
                      ? "bg-[#1A9733]"
                      : chapter.status == "scheduled"
                      ? "bg-[#064EC0]"
                      : "bg-[#25262A]"
                  }`}
                >
                  {chapter.status}
                </Badge>
              </p>
              <p>{chapter.description}</p>

              <div className="flex gap-5 text-sm">
                <span className="flex items-center gap-1">
                  <ImageIcon size={16} />
                  {chapter.pages} pages
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {chapter.status == "published"
                    ? "published"
                    : chapter.status == "scheduled"
                    ? "scheduled for"
                    : "last edited"}{" "}
                  {chapter.date}
                </span>
                {chapter.views && (
                  <span className="flex items-center gap-1">
                    <Eye size={16} />
                    {chapter.views}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="md:w-[20%] md:justify-end flex gap-2">
            <Button className="bg-nerd-default">
              <Eye />
              View
            </Button>
            <Button className="bg-nerd-default">
              {chapter.status == "published" ? <Edit2 /> : <Send />}

              {chapter.status == "published" ? "Edit" : "Publish"}
            </Button>
            <ChapterActions chapter={chapter} />
          </div>
        </section>
      ))}
    </main>
  );
};

export default ChapterComics;
