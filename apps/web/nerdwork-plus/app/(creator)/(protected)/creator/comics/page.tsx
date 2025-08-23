import Comics from "@/app/(creator)/_components/comics/Comics";
import ComicsHeader from "@/app/(creator)/_components/comics/ComicsHeader";
import MyComicsEmptyState from "@/app/(creator)/_components/comics/MyComicsEmptyState";
import SubNav from "@/app/(creator)/_components/comics/SubNav";
import { comicData } from "@/components/data";
import React from "react";

const MyComics = () => {
  const comics = comicData ?? [];

  return (
    <>
      <SubNav />
      <ComicsHeader />
      {!comics ? <MyComicsEmptyState /> : <Comics />}
    </>
  );
};

export default MyComics;
