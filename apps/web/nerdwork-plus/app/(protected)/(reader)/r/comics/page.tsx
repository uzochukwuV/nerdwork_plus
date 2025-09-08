"use client";
import React, {  useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { comicData } from "@/components/data";
import RComics from "../../_components/RComics";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllComicsForReader } from "@/actions/comic.actions";
import {  Comic } from "@/lib/types";
import LoaderScreen from "@/components/loading-screen";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const TABS = [
  "all",
  "adventure",
  "fantasy",
  "mystery",
  "sci-fi",
  "romance",
  "thriller",
  "superhero",
  "historical",
];

// interface Comic {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   genre: string[];
//   tags: string[];
//   slug: string;
//   isDraft: boolean;
//   publishedAt: string | null;
//   createdAt: string;
//   chapters?: number; // We'll calculate this from chapters data
// }

const ReaderComics = () => {
  const [tab, setTab] = useState<string>("all");
  // const [comics, setComics] = useState<Comic[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const {
    data: comics,
    isLoading,
    // error,
  } = useQuery({
    queryKey: ["comics"],
    queryFn: getAllComicsForReader,
    placeholderData: keepPreviousData,
    refetchInterval: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <LoaderScreen />;

  

  const filteredComics = comics!.data?.filter((comic: Comic) =>
    comic.genre?.some((genre) => genre.toLowerCase() === tab.toLowerCase())
  );

  return (
    <div className="pt-20">
      {/* Header with Upload Button */}
      <div>
      <div className="flex justify-between items-center max-w-[1200px] mx-auto mb-5 px-5">
        <h1 className="text-2xl font-bold text-white">Comics Library</h1>
        {/* 
          Fix: Make sure Link, Button, and Upload are imported at the top of the file:
          import Link from "next/link";
          import { Button } from "@/components/ui/button";
          import { Upload } from "lucide-react";
        */}
        <Link href="/creator/comics/new">
          <Button className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Comic
          </Button>
        </Link>
      </div>
        
      </div>

      <section>
        <Tabs
          value={tab}
          onValueChange={setTab}
          defaultValue="all"
          className="bg-transparent mt-5"
        >
          <div className="flex flex-col items-start w-full max-w-[1200px] mx-auto">
            <ScrollArea className="max-md:w-[335px] max-md:mx-auto max-md:px-5">
              <TabsList className="bg-transparent text-white flex lg:gap-10 max-xl:px-5 p-0">
                {TABS.map((genre, index) => (
                  <TabsTrigger
                    className="data-[state=active]:border-b !data-[state=active]:border-white capitalize pb-5 max-md:font-normal border-white !data-[state=active]:shadow-none text-white rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none !data-[state=active]:shadow-none"
                    value={genre}
                    key={index}
                  >
                    {genre}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar
                orientation="horizontal"
                className="transition-all ease-in-out duration-300 md:hidden opacity-35"
              />
            </ScrollArea>
          </div>
          <hr className="!text-[#292A2E] h-0 border-t border-[#292A2E]" />
          <div className=" max-w-[1200px] mx-auto w-full mt-8">
            {comics!.data?.length == 0 ? (
              <>
                <div className="flex flex-col items-center justify-center p-10 text-center">
                  <p className="text-xl font-semibold">No comics found!</p>
                  <p className="mt-2 text-sm">
                    Try again later. Seems creators are on a holiday
                  </p>
                </div>
              </>
            ) : (
              <TabsContent value={tab}>
                <RComics data={filteredComics} />
              </TabsContent>
            )}
          </div>
          
          <hr className="!text-[#292A2E] h-0 mb-10 border-t border-[#292A2E]" />
        </Tabs>
      </section>
    </div>
  );
};

export default ReaderComics;