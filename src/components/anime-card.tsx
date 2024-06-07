import { CombinedResultType, Title } from "@/types/anime";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { formatTimeRange } from "@/utils/tool";
import { useAnimeStore } from "@/providers/store-provider";

type LocaleKeys = keyof Title;

const AnimeCard = ({ animeList }: { animeList: CombinedResultType[] }) => {
  const localActive: LocaleKeys = useLocale() as LocaleKeys;

  const [isShowAdult, setIsShowAdult] = useState(false);
  const { animeIndex, setAnimeIndex } = useAnimeStore((state) => state);
  const t = useTranslations("AnimeCard");

  const nsfwCount = animeList.filter((item) => item.anime.isAdult).length;

  const getScoreColor = (score: number) => {
    if (score >= 80) {
      return "text-green-500";
    } else if (score >= 70) {
      return "text-orange-500";
    } else {
      return "text-red-500";
    }
  };

  if (animeList.length === 0) return null;

  return (
    <div className="flex h-[80vh] w-full gap-2">
      <div className="flex h-full w-1/3 flex-col gap-2 border-black">
        {animeList.map((item, idx) => {
          const { anime } = item;
          const { startTime, endTime } = formatTimeRange({
            startSeconds: item.from,
            endSeconds: item.to,
          });

          if (anime.isAdult && !isShowAdult) return null;

          return (
            <Card
              onClick={() => setAnimeIndex(idx)}
              key={idx}
              className={`h-full w-full cursor-pointer ${idx === animeIndex ? "border-purple-200" : ""}`}
            >
              <div className="flex justify-between p-4">
                <CardTitle className="text-md w-[85%] overflow-hidden text-ellipsis text-nowrap font-normal">
                  {anime.title[localActive]}
                </CardTitle>
                <h2 className={getScoreColor(anime.averageScore)}>
                  {anime.averageScore}
                </h2>
              </div>
              <div className="flex gap-2 p-2 pl-4 pt-0">
                <div className="flex h-full w-full flex-col justify-between gap-3 text-sm font-normal">
                  <h1 className={item.episode ? "" : "hidden"}>
                    {t("episode", { episode: item.episode })}
                  </h1>
                  <h2>
                    {startTime} - {endTime}
                  </h2>
                  <h3>
                    {t("similarity", {
                      similarity: (item.similarity * 100).toFixed(2),
                    })}
                  </h3>
                </div>
                <video
                  className="w-1/2 shrink rounded-lg"
                  src={item.video}
                  // poster={item.image}
                  autoPlay={true}
                  muted={true}
                  loop={true}
                />
              </div>
            </Card>
          );
        })}
        <Card className="flex w-full gap-2 p-4">
          <Button
            onClick={() => setIsShowAdult(!isShowAdult)}
            className="w-full"
            disabled={nsfwCount <= 0 ? true : false}
          >
            {isShowAdult
              ? t("hideNSFW", { count: nsfwCount })
              : t("displayNSFW", { count: nsfwCount })}
          </Button>
        </Card>
      </div>
      <Card className="relative -z-10 h-full w-2/3 p-4">
        <div className="flex h-32 items-center justify-between space-y-1.5 rounded-lg bg-opacity-90 bg-cover p-4">
          <h2 className="w-[400px] overflow-hidden text-ellipsis text-nowrap text-2xl font-medium leading-none tracking-tight">
            {animeList[animeIndex].anime.title[localActive]}
          </h2>
          <CardDescription className="">
            {animeList[animeIndex].anime.status}
          </CardDescription>
        </div>
      </Card>
    </div>
  );
};

export default AnimeCard;
