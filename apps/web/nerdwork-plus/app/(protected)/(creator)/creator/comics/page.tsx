import { comicData } from "@/components/data";
import { Metadata } from "next";
import React from "react";
import ComicsHeader from "../../_components/comics/ComicsHeader";
import MyComicsEmptyState from "../../_components/comics/MyComicsEmptyState";
import Comics from "../../_components/comics/Comics";

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
