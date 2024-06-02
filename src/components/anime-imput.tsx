"use client";

import { Input } from "@/components/ui/input";
import { useAnime } from "@/hooks/anime";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Video from "next-video";
import { useLocale } from "next-intl";
import { formatTimes } from "@/utils/tool";
import { CombinedResultType } from "@/types/anime";
import Image from "next/image";

const newData: CombinedResultType[] = [
  {
    anime: {
      id: 131586,
      title: {
        native: "86－エイティシックス－ 第2クール",
        romaji: "86: Eighty Six Part 2",
        english: "86 EIGHTY-SIX Part 2",
        chinese: "86 -Eighty Six- Part 2",
      },
      type: "ANIME",
      format: "TV",
      status: "FINISHED",
      startDate: {
        year: 2021,
        month: 10,
        day: 3,
      },
      endDate: {
        year: 2022,
        month: 3,
        day: 19,
      },
      season: "FALL",
      episodes: 12,
      source: "LIGHT_NOVEL",
      coverImage: {
        large:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx131586-k0X2kVpUOkqX.jpg",
        medium:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx131586-k0X2kVpUOkqX.jpg",
      },
      bannerImage:
        "https://s4.anilist.co/file/anilistcdn/media/anime/banner/131586-TQED17cUhGnT.jpg",
      genres: ["Action", "Drama", "Mecha", "Sci-Fi"],
      popularity: 120015,
      averageScore: 86,
      stats: {
        scoreDistribution: [
          {
            score: 10,
            amount: 170,
          },
          {
            score: 20,
            amount: 76,
          },
          {
            score: 30,
            amount: 198,
          },
          {
            score: 40,
            amount: 369,
          },
          {
            score: 50,
            amount: 823,
          },
          {
            score: 60,
            amount: 1491,
          },
          {
            score: 70,
            amount: 4445,
          },
          {
            score: 80,
            amount: 10720,
          },
          {
            score: 90,
            amount: 19907,
          },
          {
            score: 100,
            amount: 18112,
          },
        ],
      },
      isAdult: false,
      externalLinks: [
        {
          id: 30495,
          url: "https://anime-86.com/",
          site: "Official Site",
        },
        {
          id: 30496,
          url: "https://twitter.com/anime_eightysix",
          site: "Twitter",
        },
        {
          id: 38478,
          url: "https://www.crunchyroll.com/86-eighty-six",
          site: "Crunchyroll",
        },
        {
          id: 44772,
          url: "https://www.iq.com/album/2aef2fzzzvp",
          site: "iQ",
        },
        {
          id: 44970,
          url: "https://www.bilibili.tv/media/1003031/",
          site: "Bilibili TV",
        },
        {
          id: 51478,
          url: "https://www.netflix.com/title/81442047",
          site: "Netflix",
        },
      ],
      siteUrl: "https://anilist.co/anime/131586",
    },
    filename:
      "[Ohys-Raws] Eighty-Six Part 2 - 12 END (BS11 1280x720 x264 AAC).mp4",
    episode: 12,
    from: 1306.58,
    to: 1308.83,
    similarity: 0.9440424588727485,
    video:
      "https://api.trace.moe/video/131586/%5BOhys-Raws%5D%20Eighty-Six%20Part%202%20-%2012%20END%20(BS11%201280x720%20x264%20AAC).mp4?t=1307.705&now=1717290000&token=CQOmoblsdZHDxbBithnDtTnThCw",
    image:
      "https://api.trace.moe/image/131586/%5BOhys-Raws%5D%20Eighty-Six%20Part%202%20-%2012%20END%20(BS11%201280x720%20x264%20AAC).mp4.jpg?t=1307.705&now=1717290000&token=L5i3LDRiKKQPvTdoU44ZY8vnSpA",
  },
];

const AnimeInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const localActive = useLocale();

  const handleTitle = (titles: any) => {
    switch (localActive) {
      case "jp":
        return titles.jp;
      case "zh":
        return titles.zh;
      case "en":
      default:
        return titles.english;
    }
  };

  const isValidImageUrl = (url: string) => {
    return /\.(jpg|jpeg|png|webp)$/.test(url);
  };

  const { data, error, isLoading } = useAnime(
    isValidImageUrl(inputValue) ? { url: inputValue } : null,
  );

  return (
    <>
      <Input
        className="mb-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {isLoading && <Skeleton className="h-[100px] w-full" />}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <>
          <Collapsible className="mb-2">
            <CollapsibleTrigger>Result:</CollapsibleTrigger>
            <CollapsibleContent>
              <pre>{JSON.stringify(data, null, 4)}</pre>
            </CollapsibleContent>
          </Collapsible>
          <section>
            {data.map((item, idx) => {
              const episode = item.episode;
              const { min: startMin, second: startSecond } = formatTimes(
                item.from,
              );
              const { min: endMin, second: endSecond } = formatTimes(item.to);
              return (
                <Dialog key={idx}>
                  <DialogTrigger asChild className="cursor-pointer">
                    <Card className="w-1/3">
                      <CardHeader>
                        <Image
                          className="rounded-md"
                          src={item.image}
                          width={250}
                          height={400}
                          alt={item.filename}
                        />
                        <CardTitle>{handleTitle(item.anime.title)}</CardTitle>
                        <Separator />
                        <CardDescription>
                          <span>
                            第 {episode} 集 {startMin}:{startSecond} - {endMin}:
                            {endSecond}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent></CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <Video
                        src={item.video}
                        poster={item.image}
                        autoPlay={true}
                        muted={true}
                      />
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              );
            })}
          </section>
        </>
      )}
    </>
  );
};

export default AnimeInput;
