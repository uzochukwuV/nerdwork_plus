import Comics from "@/app/(creator)/_components/comics/Comics";
import ComicsHeader from "@/app/(creator)/_components/comics/ComicsHeader";
import MyComicsEmptyState from "@/app/(creator)/_components/comics/MyComicsEmptyState";
import { comicData } from "@/components/data";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Creator Dashboard",
  description: "...",
};

const MyComics = () => {
  const comics = comicData ?? [];

  return (
    <>
      <ComicsHeader />
      {!comics ? <MyComicsEmptyState /> : <Comics />}
    </>
  );
};

export default MyComics;
