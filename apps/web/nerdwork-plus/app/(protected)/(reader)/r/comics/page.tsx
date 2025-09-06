"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RComics from "../../_components/RComics";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { comicsApi } from "@/lib/api/comics";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Upload } from "lucide-react";
import Link from "next/link";

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

interface Comic {
  id: string;
  title: string;
  description: string;
  image: string;
  genre: string[];
  tags: string[];
  slug: string;
  isDraft: boolean;
  publishedAt: string | null;
  createdAt: string;
  chapters?: number; // We'll calculate this from chapters data
}

const ReaderComics = () => {
  const [tab, setTab] = useState<string>("all");
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await comicsApi.getPublishedComics();
      
      if (response.success && response.data) {
        // Transform backend data to match frontend interface
        const transformedComics = response.data.comics.map((comic: any) => ({
          ...comic,
          chapters: 0, // We'll update this when we implement chapter counting
        }));
        
        setComics(transformedComics);
      } else {
        setComics([]);
      }
    } catch (err) {
      console.error("Error fetching comics:", err);
      setError("Failed to load comics. Please try again.");
      setComics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);

  // Filter comics by genre
  const filteredComics = tab === "all" 
    ? comics 
    : comics.filter((comic) => 
        comic.genre && comic.genre.some(g => g.toLowerCase().includes(tab.toLowerCase()))
      );

  if (loading) {
    return (
      <div className="pt-20">
        <div className="flex flex-col items-center justify-center p-20 text-center">
          <RefreshCcw className="h-8 w-8 animate-spin text-white mb-4" />
          <p className="text-xl font-semibold text-white">Loading comics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20">
        <div className="flex flex-col items-center justify-center p-20 text-center">
          <p className="text-xl font-semibold text-red-400 mb-4">{error}</p>
          <Button 
            onClick={fetchComics}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header with Upload Button */}
      <div className="flex justify-between items-center max-w-[1200px] mx-auto mb-5 px-5">
        <h1 className="text-2xl font-bold text-white">Comics Library</h1>
        <Link href="/creator/comics/new">
          <Button className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Comic
          </Button>
        </Link>
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
          
          <div className="max-w-[1200px] mx-auto w-full mt-8">
            <div className="flex justify-between items-center mb-4 px-5">
              <p className="text-white text-sm">
                {filteredComics.length} comics found
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchComics}
                className="text-white hover:text-white hover:bg-white/10"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            
            <TabsContent value={tab}>
              <RComics data={filteredComics} />
            </TabsContent>
          </div>
          
          <hr className="!text-[#292A2E] h-0 mb-10 border-t border-[#292A2E]" />
        </Tabs>
      </section>
    </div>
  );
};

export default ReaderComics;