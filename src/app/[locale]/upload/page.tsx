"use client";

import React from "react";
import { useAnimeStore } from "@/providers/store-provider";
import { useAnimeFile } from "@/hooks/anime";
import AnimeCard from "@/components/anime-card";
import { notFound } from "next/navigation";

const Upload = () => {
  const { animeImageFile, isAnimeLoading, animeList, animeError } =
    useAnimeStore((state) => state);

  const { data } = useAnimeFile(
    animeImageFile.length > 0 ? { file: animeImageFile } : null,
  );

  if (animeImageFile.length === 0) {
    return notFound();
  }

  if (isAnimeLoading) {
    return <div className="px-4">Ani Fetching</div>;
  }

  if (animeError) {
    return <div className="px-4">Ani Error</div>;
  }

  return (
    <div className="px-4">
      <AnimeCard animeList={animeList} />
    </div>
  );
};

export default Upload;
