import ComicsHeader from "@/components/comics/ComicsHeader";
import MyComicsEmptyState from "@/components/comics/MyComicsEmptyState";
import SubNav from "@/components/comics/SubNav";
import React from "react";

const MyComics = () => {
  return (
    <>
      <SubNav />
      <ComicsHeader />
      <MyComicsEmptyState />
    </>
  );
};

export default MyComics;
