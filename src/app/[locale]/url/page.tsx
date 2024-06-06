"use client";

import React, { useEffect, useState } from "react";
import { isImageAlive } from "@/utils/tool";
import { notFound, useSearchParams } from "next/navigation";
import { useAnimeURL } from "@/hooks/anime";
import { useAnimeStore } from "@/providers/store-provider";
import AnimeCard from "@/components/anime-card";

const Page = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const imgUrl = decodeURIComponent(searchParams.get("") || "");

  useEffect(() => {
    isImageAlive(imgUrl).then((bool) => {
      setIsValid(bool);
      setIsLoading(false);
    });
  }, [imgUrl]);

  const { data } = useAnimeURL(imgUrl ? { url: imgUrl } : null);

  const { isAnimeLoading, animeList, animeError } = useAnimeStore(
    (state) => state,
  );

  if (isLoading) {
    return <div className="px-4">Loading</div>;
  }

  if (!isValid) {
    return notFound();
  }

  if (isAnimeLoading) {
    return <div className="px-4">Ani Fetching</div>;
  }

  if (animeError) {
    return <div className="px-4">Ani Error</div>;
  }

  console.log(animeList, "animeList");

  return (
    <div className="px-4">
      <AnimeCard animeList={animeList} />
    </div>
  );
};

export default Page;
