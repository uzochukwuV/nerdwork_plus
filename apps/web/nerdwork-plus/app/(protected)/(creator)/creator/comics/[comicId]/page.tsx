"use client";

import { chapterData, comicData } from "@/components/data";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, EllipsisVertical, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { use, useState } from "react";
import ComicActions from "../../../_components/comics/DesktopComicActions";
import MobileComicActions from "../../../_components/comics/MobileComicActions";
import ChaptersEmptyState from "../../../_components/comics/ChaptersEmptyState";
import ChapterComics from "../../../_components/comics/ChapterComics";

const ComicDetailsPage = ({
  params,
}: {
  params: Promise<{ comicId: string }>;
}) => {
  const { comicId } = use(params);

  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState<string>("all");

  const chapters = chapterData ?? [];
  const comics = comicData ?? [];
  const comic = comics.find((c) => parseInt(comicId) === c.id);

  const truncatedText = comic?.short_description.substring(0, 200);

  const counts = {
    all: chapters.length,
    draft: chapters.filter((b) => b.status === "draft").length,
    published: chapters.filter((b) => b.status === "published").length,
    scheduled: chapters.filter((b) => b.status === "scheduled").length,
  };

  const filteredChapters = chapters.filter((chapter) =>
    tab === "all" ? true : chapter.status === tab
  );

  return (
    <main className="max-w-[1300px] mx-auto px-5 font-inter py-5">
      <Link href={"/creator/comics"}>
        <button className="flex items-center cursor-pointer gap-2.5 text-sm font-medium">
          <ArrowLeft size={16} /> back to Dashboard
        </button>
      </Link>

      <section className="flex justify-between gap-20 py-6">
        <div className=" max-w-[861px] w-full">
          <div className="flex items-center gap-6">
            {comic?.image && (
              <Image
                src={comic?.image}
                width={54}
                height={80}
                alt=""
                className="w-[54px] h-[80px] rounded-[8px] object-cover md:hidden"
              />
            )}
            <h3 className="font-semibold text-[28px] max-md:text-2xl">
              {comic?.title}
            </h3>
          </div>
          <div className="flex gap-2 my-8 max-md:w-full max-md:justify-between">
            <Button asChild variant={"secondary"} className="max-md:w-4/5">
              <Link href={`/creator/comics/${comicId}/add`}>
                <Plus /> Add Chapter
              </Link>
            </Button>
            {
              <Button className="hidden">
                <Plus /> Bulk Upload
              </Button>
            }
            {comic && (
              <Menubar className="bg-[#1D1E21] max-md:hidden font-inter outline-none border-none ring-0 transition duration-300 hover:ease-in-out">
                <MenubarMenu>
                  <MenubarTrigger className="bg-[#1D1E21] data-[state=open]:bg-none h-8 w-8 flex justify-center items-center transition duration-300 cursor-pointer rounded">
                    <EllipsisVertical size={16} />
                  </MenubarTrigger>
                  <ComicActions comic={comic} details={true} />
                </MenubarMenu>
              </Menubar>
            )}
            {comic && (
              <Sheet>
                <SheetTrigger className="data-[state=open]:bg-none bg-[#1D1E21] md:hidden h-8 w-8 flex justify-center items-center transition duration-300 hover:ease-in-out cursor-pointer rounded">
                  <EllipsisVertical size={16} />
                </SheetTrigger>
                <MobileComicActions comic={comic} />
              </Sheet>
            )}
          </div>
          <div className="flex max-md:flex-col gap-6 md:gap-12 max-md:text-sm">
            <p className="md:hidden max-w-[505px] w-full">
              {isExpanded ? comic?.short_description : `${truncatedText}...`}
            </p>
            <p className="max-md:hidden max-w-[505px] w-full">
              {comic?.short_description}
            </p>
            <ul className={`${isExpanded ? "" : "max-md:hidden"}`}>
              <li>Fantasy, Adventure</li>
              <li>Magic, Adventure, Young Adult</li>
              <li>10 SOL</li>
              <li>Released 10 July, 2025</li>
              <li>{comic?.chapters} chapters</li>
              <li>Rated PG - 13 Teen</li>
              <li>Collaborators: Creator, Artist, Copywriter</li>
            </ul>
            <button
              className="md:hidden cursor-pointer text-left text-[#707073] font-normal"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          </div>
        </div>

        {comic?.image && (
          <Image
            src={comic?.image}
            width={322}
            height={477}
            alt=""
            className="w-[322px] h-[477px] rounded-[8px] object-cover max-md:hidden"
          />
        )}
      </section>
      <hr className="!text-[#292A2E] max-md:hidden h-0 border-t border-[#292A2E]" />
      {comic && chapters.length == 0 ? (
        <ChaptersEmptyState comicId={comic?.id} />
      ) : (
        <section className="py-8">
          <h3 className="font-semibold text-2xl">
            Chapters ({chapters.length})
          </h3>
          <Tabs
            value={tab}
            onValueChange={setTab}
            defaultValue="all"
            className="bg-transparent mt-10"
          >
            <div className="flex flex-col items-start w-full max-w-[1300px] mx-auto">
              <TabsList className="bg-transparent text-white flex lg:gap-10 p-0">
                <TabsTrigger
                  className="data-[state=active]:border-b !data-[state=active]:border-white pb-5 max-md:font-normal border-white !data-[state=active]:shadow-none text-white rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none !data-[state=active]:shadow-none"
                  value="all"
                >
                  All ({counts.all})
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:border-b !data-[state=active]:border-white pb-5 max-md:font-normal border-white !data-[state=active]:shadow-none text-white rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none !data-[state=active]:shadow-none"
                  value="published"
                >
                  Published ({counts.published})
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:border-b !data-[state=active]:border-white pb-5 max-md:font-normal border-white !data-[state=active]:shadow-none text-white rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none !data-[state=active]:shadow-none"
                  value="scheduled"
                >
                  Scheduled ({counts.scheduled})
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:border-b !data-[state=active]:border-white pb-5 max-md:font-normal border-white !data-[state=active]:shadow-none text-white rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none !data-[state=active]:shadow-none"
                  value="draft"
                >
                  Drafts ({counts.draft})
                </TabsTrigger>
              </TabsList>
            </div>
            <hr className="!text-[#292A2E] h-0 border-t border-[#292A2E]" />
            <div className=" max-w-[1300px] mx-auto w-full mt-8">
              <TabsContent value={tab}>
                <ChapterComics data={filteredChapters} />
              </TabsContent>
            </div>
            <hr className="!text-[#292A2E] h-0 mb-10 border-t border-[#292A2E]" />
          </Tabs>
        </section>
      )}
    </main>
  );
};

export default ComicDetailsPage;
