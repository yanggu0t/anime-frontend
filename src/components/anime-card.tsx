import { CombinedResultType, Title } from "@/types/anime";
import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useLocale } from "next-intl";
import Image from "next/image";
import { formatTimeRange } from "@/utils/tool";
import { useAnimeStore } from "@/providers/store-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type LocaleKeys = keyof Title;

const AnimeCard = ({ animeList }: { animeList: CombinedResultType[] }) => {
  const localActive: LocaleKeys = useLocale() as LocaleKeys;

  const { animeIndex, setAnimeIndex } = useAnimeStore((state) => state);

  const getScoreColor = (score: number) => {
    if (score >= 80) {
      return "text-green-500";
    } else if (score >= 70) {
      return "text-orange-500";
    } else {
      return "text-red-500";
    }
  };

  console.log(animeList);

  return (
    <div className="flex h-[600px] w-full gap-2">
      <div className="flex h-full w-1/3 flex-col gap-2 border-black">
        {animeList.map((item, idx) => {
          const { anime } = item;
          const { startTime, endTime } = formatTimeRange({
            startSeconds: item.from,
            endSeconds: item.to,
          });

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
                    第 {item.episode} 集
                  </h1>
                  <h2>
                    {startTime} - {endTime}
                  </h2>
                  <h3>相似度 {(item.similarity * 100).toFixed(2)}%</h3>
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
      </div>
      <Card className="relative -z-10 h-full w-2/3 p-4">
        <div
          style={{
            backgroundImage:
              `url(${animeList[animeIndex].anime.bannerImage})` || "",
          }}
          className="flex h-32 items-end justify-between space-y-1.5 rounded-lg bg-opacity-90 bg-cover p-4"
        >
          <h2 className="bg-white/70 text-2xl font-medium leading-none tracking-tight dark:bg-black/50">
            {animeList[animeIndex].anime.title[localActive]}
          </h2>
          <CardDescription className="bg-white/70 dark:bg-black/50">
            {animeList[animeIndex].anime.status}
          </CardDescription>
        </div>
        <div></div>
      </Card>
    </div>
  );
};

// const faklist = [
//   {
//     anime: {
//       id: 99639,
//       title: {
//         jp: "ソラとウミのアイダ",
//         en: "Between the Sky and Sea",
//         zh: "天空與海洋之間",
//       },
//       type: "ANIME",
//       format: "TV",
//       status: "FINISHED",
//       startDate: {
//         year: 2018,
//         month: 10,
//         day: 4,
//       },
//       endDate: {
//         year: 2018,
//         month: 12,
//         day: 20,
//       },
//       season: "FALL",
//       episodes: 12,
//       source: "VIDEO_GAME",
//       coverImage: {
//         large:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx99639-spdT8FCSOlBN.jpg",
//         medium:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx99639-spdT8FCSOlBN.jpg",
//       },
//       bannerImage:
//         "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99639-eYRVojZU7lDZ.png",
//       genres: ["Adventure", "Sci-Fi"],
//       averageScore: 48,
//       stats: {
//         scoreDistribution: [
//           {
//             score: 10,
//             amount: 120,
//           },
//           {
//             score: 20,
//             amount: 138,
//           },
//           {
//             score: 30,
//             amount: 236,
//           },
//           {
//             score: 40,
//             amount: 320,
//           },
//           {
//             score: 50,
//             amount: 393,
//           },
//           {
//             score: 60,
//             amount: 338,
//           },
//           {
//             score: 70,
//             amount: 230,
//           },
//           {
//             score: 80,
//             amount: 126,
//           },
//           {
//             score: 90,
//             amount: 42,
//           },
//           {
//             score: 100,
//             amount: 41,
//           },
//         ],
//       },
//       isAdult: false,
//       externalLinks: [
//         {
//           id: 5871,
//           url: "http://soraumi-anime.com/",
//           site: "Official Site",
//         },
//         {
//           id: 5872,
//           url: "https://twitter.com/soraumi_app",
//           site: "Twitter",
//         },
//         {
//           id: 6432,
//           url: "https://www.crunchyroll.com/between-the-sky-and-sea",
//           site: "Crunchyroll",
//         },
//       ],
//       siteUrl: "https://anilist.co/anime/99639",
//     },
//     filename: "[Ohys-Raws] Sora to Umi no Aida - 02 (MX 1280x720 x264 AAC).mp4",
//     episode: 2,
//     from: 1356.83,
//     to: 1356.92,
//     similarity: 0.9612701665379259,
//     video:
//       "https://api.trace.moe/video/99639/%5BOhys-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2002%20(MX%201280x720%20x264%20AAC).mp4?t=1356.875&now=1717578000&token=oLMegNrVD62t7EfUnXjfnUHBog",
//     image:
//       "https://api.trace.moe/image/99639/%5BOhys-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2002%20(MX%201280x720%20x264%20AAC).mp4.jpg?t=1356.875&now=1717578000&token=vUktgcHwiAHjJHRCctlHeTJyD0",
//   },
//   {
//     anime: {
//       id: 291,
//       title: {
//         jp: "D.C.S.S. ～ダ・カーポ セカンドシーズン～",
//         en: "D.C.S.S. ~Da Capo Second Season~",
//         zh: "初音島 第二季",
//       },
//       type: "ANIME",
//       format: "TV",
//       status: "FINISHED",
//       startDate: {
//         year: 2005,
//         month: 7,
//         day: 2,
//       },
//       endDate: {
//         year: 2005,
//         month: 12,
//         day: 24,
//       },
//       season: "SUMMER",
//       episodes: 26,
//       source: "VISUAL_NOVEL",
//       coverImage: {
//         large:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx291-mjwkHSLSO6CC.png",
//         medium:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx291-mjwkHSLSO6CC.png",
//       },
//       bannerImage: null,
//       genres: ["Comedy", "Drama", "Romance", "Supernatural"],
//       averageScore: 64,
//       stats: {
//         scoreDistribution: [
//           {
//             score: 10,
//             amount: 30,
//           },
//           {
//             score: 20,
//             amount: 41,
//           },
//           {
//             score: 30,
//             amount: 70,
//           },
//           {
//             score: 40,
//             amount: 137,
//           },
//           {
//             score: 50,
//             amount: 257,
//           },
//           {
//             score: 60,
//             amount: 413,
//           },
//           {
//             score: 70,
//             amount: 535,
//           },
//           {
//             score: 80,
//             amount: 331,
//           },
//           {
//             score: 90,
//             amount: 154,
//           },
//           {
//             score: 100,
//             amount: 111,
//           },
//         ],
//       },
//       isAdult: false,
//       externalLinks: [],
//       siteUrl: "https://anilist.co/anime/291",
//     },
//     filename: "D.C.S.S Da Capo Second Season - 05 (BD 1280x720 x264 AAC).mp4",
//     episode: 5,
//     from: 689.08,
//     to: 689.17,
//     similarity: 0.9512701665379258,
//     video:
//       "https://api.trace.moe/video/291/D.C.S.S%20Da%20Capo%20Second%20Season%20-%2005%20(BD%201280x720%20x264%20AAC).mp4?t=689.125&now=1717578000&token=cPlifK0CslNr0ETI0imlBgkskW8",
//     image:
//       "https://api.trace.moe/image/291/D.C.S.S%20Da%20Capo%20Second%20Season%20-%2005%20(BD%201280x720%20x264%20AAC).mp4.jpg?t=689.125&now=1717578000&token=xWcxJRgPtIx9ehYath7bBQNgc7Q",
//   },
//   {
//     anime: {
//       id: 99639,
//       title: {
//         jp: "ソラとウミのアイダ",
//         en: "Between the Sky and Sea",
//         zh: "天空與海洋之間",
//       },
//       type: "ANIME",
//       format: "TV",
//       status: "FINISHED",
//       startDate: {
//         year: 2018,
//         month: 10,
//         day: 4,
//       },
//       endDate: {
//         year: 2018,
//         month: 12,
//         day: 20,
//       },
//       season: "FALL",
//       episodes: 12,
//       source: "VIDEO_GAME",
//       coverImage: {
//         large:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx99639-spdT8FCSOlBN.jpg",
//         medium:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx99639-spdT8FCSOlBN.jpg",
//       },
//       bannerImage:
//         "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99639-eYRVojZU7lDZ.png",
//       genres: ["Adventure", "Sci-Fi"],
//       averageScore: 48,
//       stats: {
//         scoreDistribution: [
//           {
//             score: 10,
//             amount: 120,
//           },
//           {
//             score: 20,
//             amount: 138,
//           },
//           {
//             score: 30,
//             amount: 236,
//           },
//           {
//             score: 40,
//             amount: 320,
//           },
//           {
//             score: 50,
//             amount: 393,
//           },
//           {
//             score: 60,
//             amount: 338,
//           },
//           {
//             score: 70,
//             amount: 230,
//           },
//           {
//             score: 80,
//             amount: 126,
//           },
//           {
//             score: 90,
//             amount: 42,
//           },
//           {
//             score: 100,
//             amount: 41,
//           },
//         ],
//       },
//       isAdult: false,
//       externalLinks: [
//         {
//           id: 5871,
//           url: "http://soraumi-anime.com/",
//           site: "Official Site",
//         },
//         {
//           id: 5872,
//           url: "https://twitter.com/soraumi_app",
//           site: "Twitter",
//         },
//         {
//           id: 6432,
//           url: "https://www.crunchyroll.com/between-the-sky-and-sea",
//           site: "Crunchyroll",
//         },
//       ],
//       siteUrl: "https://anilist.co/anime/99639",
//     },
//     filename: "[Ohys-Raws] Sora to Umi no Aida - 04 (MX 1280x720 x264 AAC).mp4",
//     episode: 4,
//     from: 1356.75,
//     to: 1357,
//     similarity: 0.9498023516216292,
//     video:
//       "https://api.trace.moe/video/99639/%5BOhys-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2004%20(MX%201280x720%20x264%20AAC).mp4?t=1356.875&now=1717578000&token=Eubz7KPUHfOPKqPi40lL27Am7Yc",
//     image:
//       "https://api.trace.moe/image/99639/%5BOhys-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2004%20(MX%201280x720%20x264%20AAC).mp4.jpg?t=1356.875&now=1717578000&token=hiJtg4VZOqIgAPF9ATFafSL7Uo",
//   },
//   {
//     anime: {
//       id: 99639,
//       title: {
//         jp: "ソラとウミのアイダ",
//         en: "Between the Sky and Sea",
//         zh: "天空與海洋之間",
//       },
//       type: "ANIME",
//       format: "TV",
//       status: "FINISHED",
//       startDate: {
//         year: 2018,
//         month: 10,
//         day: 4,
//       },
//       endDate: {
//         year: 2018,
//         month: 12,
//         day: 20,
//       },
//       season: "FALL",
//       episodes: 12,
//       source: "VIDEO_GAME",
//       coverImage: {
//         large:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx99639-spdT8FCSOlBN.jpg",
//         medium:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx99639-spdT8FCSOlBN.jpg",
//       },
//       bannerImage:
//         "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99639-eYRVojZU7lDZ.png",
//       genres: ["Adventure", "Sci-Fi"],
//       averageScore: 48,
//       stats: {
//         scoreDistribution: [
//           {
//             score: 10,
//             amount: 120,
//           },
//           {
//             score: 20,
//             amount: 138,
//           },
//           {
//             score: 30,
//             amount: 236,
//           },
//           {
//             score: 40,
//             amount: 320,
//           },
//           {
//             score: 50,
//             amount: 393,
//           },
//           {
//             score: 60,
//             amount: 338,
//           },
//           {
//             score: 70,
//             amount: 230,
//           },
//           {
//             score: 80,
//             amount: 126,
//           },
//           {
//             score: 90,
//             amount: 42,
//           },
//           {
//             score: 100,
//             amount: 41,
//           },
//         ],
//       },
//       isAdult: false,
//       externalLinks: [
//         {
//           id: 5871,
//           url: "http://soraumi-anime.com/",
//           site: "Official Site",
//         },
//         {
//           id: 5872,
//           url: "https://twitter.com/soraumi_app",
//           site: "Twitter",
//         },
//         {
//           id: 6432,
//           url: "https://www.crunchyroll.com/between-the-sky-and-sea",
//           site: "Crunchyroll",
//         },
//       ],
//       siteUrl: "https://anilist.co/anime/99639",
//     },
//     filename: "Sora to Umi no Aida - 04 (BD 1280x720 x264 AACx2).mp4",
//     episode: 4,
//     from: 1346.67,
//     to: 1346.83,
//     similarity: 0.9498023516216292,
//     video:
//       "https://api.trace.moe/video/99639/Sora%20to%20Umi%20no%20Aida%20-%2004%20(BD%201280x720%20x264%20AACx2).mp4?t=1346.75&now=1717578000&token=oB68aluznDatQJOJ5fiyof8CU",
//     image:
//       "https://api.trace.moe/image/99639/Sora%20to%20Umi%20no%20Aida%20-%2004%20(BD%201280x720%20x264%20AACx2).mp4.jpg?t=1346.75&now=1717578000&token=TCyqTnY3amsSuu9J4F736ldN1Q",
//   },
//   {
//     anime: {
//       id: 99639,
//       title: {
//         jp: "ソラとウミのアイダ",
//         en: "Between the Sky and Sea",
//         zh: "天空與海洋之間",
//       },
//       type: "ANIME",
//       format: "TV",
//       status: "FINISHED",
//       startDate: {
//         year: 2018,
//         month: 10,
//         day: 4,
//       },
//       endDate: {
//         year: 2018,
//         month: 12,
//         day: 20,
//       },
//       season: "FALL",
//       episodes: 12,
//       source: "VIDEO_GAME",
//       coverImage: {
//         large:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx99639-spdT8FCSOlBN.jpg",
//         medium:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx99639-spdT8FCSOlBN.jpg",
//       },
//       bannerImage:
//         "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99639-eYRVojZU7lDZ.png",
//       genres: ["Adventure", "Sci-Fi"],
//       averageScore: 48,
//       stats: {
//         scoreDistribution: [
//           {
//             score: 10,
//             amount: 120,
//           },
//           {
//             score: 20,
//             amount: 138,
//           },
//           {
//             score: 30,
//             amount: 236,
//           },
//           {
//             score: 40,
//             amount: 320,
//           },
//           {
//             score: 50,
//             amount: 393,
//           },
//           {
//             score: 60,
//             amount: 338,
//           },
//           {
//             score: 70,
//             amount: 230,
//           },
//           {
//             score: 80,
//             amount: 126,
//           },
//           {
//             score: 90,
//             amount: 42,
//           },
//           {
//             score: 100,
//             amount: 41,
//           },
//         ],
//       },
//       isAdult: false,
//       externalLinks: [
//         {
//           id: 5871,
//           url: "http://soraumi-anime.com/",
//           site: "Official Site",
//         },
//         {
//           id: 5872,
//           url: "https://twitter.com/soraumi_app",
//           site: "Twitter",
//         },
//         {
//           id: 6432,
//           url: "https://www.crunchyroll.com/between-the-sky-and-sea",
//           site: "Crunchyroll",
//         },
//       ],
//       siteUrl: "https://anilist.co/anime/99639",
//     },
//     filename:
//       "[Leopard-Raws] Sora to Umi no Aida - 04 RAW (SUN 1280x720 x264 AAC).mp4",
//     episode: 4,
//     from: 1356.33,
//     to: 1356.5,
//     similarity: 0.9498023516216292,
//     video:
//       "https://api.trace.moe/video/99639/%5BLeopard-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2004%20RAW%20(SUN%201280x720%20x264%20AAC).mp4?t=1356.415&now=1717578000&token=tz5eR4xDhXnACNcxmlStdRlTs",
//     image:
//       "https://api.trace.moe/image/99639/%5BLeopard-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2004%20RAW%20(SUN%201280x720%20x264%20AAC).mp4.jpg?t=1356.415&now=1717578000&token=msPqcnpx94gydS4KTzMJ7GbDw4",
//   },
//   {
//     anime: {
//       id: 99639,
//       title: {
//         jp: "ソラとウミのアイダ",
//         en: "Between the Sky and Sea",
//         zh: "天空與海洋之間",
//       },
//       type: "ANIME",
//       format: "TV",
//       status: "FINISHED",
//       startDate: {
//         year: 2018,
//         month: 10,
//         day: 4,
//       },
//       endDate: {
//         year: 2018,
//         month: 12,
//         day: 20,
//       },
//       season: "FALL",
//       episodes: 12,
//       source: "VIDEO_GAME",
//       coverImage: {
//         large:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx99639-spdT8FCSOlBN.jpg",
//         medium:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx99639-spdT8FCSOlBN.jpg",
//       },
//       bannerImage:
//         "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99639-eYRVojZU7lDZ.png",
//       genres: ["Adventure", "Sci-Fi"],
//       averageScore: 48,
//       stats: {
//         scoreDistribution: [
//           {
//             score: 10,
//             amount: 120,
//           },
//           {
//             score: 20,
//             amount: 138,
//           },
//           {
//             score: 30,
//             amount: 236,
//           },
//           {
//             score: 40,
//             amount: 320,
//           },
//           {
//             score: 50,
//             amount: 393,
//           },
//           {
//             score: 60,
//             amount: 338,
//           },
//           {
//             score: 70,
//             amount: 230,
//           },
//           {
//             score: 80,
//             amount: 126,
//           },
//           {
//             score: 90,
//             amount: 42,
//           },
//           {
//             score: 100,
//             amount: 41,
//           },
//         ],
//       },
//       isAdult: false,
//       externalLinks: [
//         {
//           id: 5871,
//           url: "http://soraumi-anime.com/",
//           site: "Official Site",
//         },
//         {
//           id: 5872,
//           url: "https://twitter.com/soraumi_app",
//           site: "Twitter",
//         },
//         {
//           id: 6432,
//           url: "https://www.crunchyroll.com/between-the-sky-and-sea",
//           site: "Crunchyroll",
//         },
//       ],
//       siteUrl: "https://anilist.co/anime/99639",
//     },
//     filename: "Sora to Umi no Aida - 10 (BD 1280x720 x264 AAC).mp4",
//     episode: 10,
//     from: 1346.83,
//     to: 1346.83,
//     similarity: 0.9484412905085295,
//     video:
//       "https://api.trace.moe/video/99639/Sora%20to%20Umi%20no%20Aida%20-%2010%20(BD%201280x720%20x264%20AAC).mp4?t=1346.83&now=1717578000&token=1p2vNMNbYzhLFNh71XrI1XaQ",
//     image:
//       "https://api.trace.moe/image/99639/Sora%20to%20Umi%20no%20Aida%20-%2010%20(BD%201280x720%20x264%20AAC).mp4.jpg?t=1346.83&now=1717578000&token=8fm1c1QxMyiki9nK1mifKpFPqSc",
//   },
//   {
//     anime: {
//       id: 99639,
//       title: {
//         jp: "ソラとウミのアイダ",
//         en: "Between the Sky and Sea",
//         zh: "天空與海洋之間",
//       },
//       type: "ANIME",
//       format: "TV",
//       status: "FINISHED",
//       startDate: {
//         year: 2018,
//         month: 10,
//         day: 4,
//       },
//       endDate: {
//         year: 2018,
//         month: 12,
//         day: 20,
//       },
//       season: "FALL",
//       episodes: 12,
//       source: "VIDEO_GAME",
//       coverImage: {
//         large:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx99639-spdT8FCSOlBN.jpg",
//         medium:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx99639-spdT8FCSOlBN.jpg",
//       },
//       bannerImage:
//         "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99639-eYRVojZU7lDZ.png",
//       genres: ["Adventure", "Sci-Fi"],
//       averageScore: 48,
//       stats: {
//         scoreDistribution: [
//           {
//             score: 10,
//             amount: 120,
//           },
//           {
//             score: 20,
//             amount: 138,
//           },
//           {
//             score: 30,
//             amount: 236,
//           },
//           {
//             score: 40,
//             amount: 320,
//           },
//           {
//             score: 50,
//             amount: 393,
//           },
//           {
//             score: 60,
//             amount: 338,
//           },
//           {
//             score: 70,
//             amount: 230,
//           },
//           {
//             score: 80,
//             amount: 126,
//           },
//           {
//             score: 90,
//             amount: 42,
//           },
//           {
//             score: 100,
//             amount: 41,
//           },
//         ],
//       },
//       isAdult: false,
//       externalLinks: [
//         {
//           id: 5871,
//           url: "http://soraumi-anime.com/",
//           site: "Official Site",
//         },
//         {
//           id: 5872,
//           url: "https://twitter.com/soraumi_app",
//           site: "Twitter",
//         },
//         {
//           id: 6432,
//           url: "https://www.crunchyroll.com/between-the-sky-and-sea",
//           site: "Crunchyroll",
//         },
//       ],
//       siteUrl: "https://anilist.co/anime/99639",
//     },
//     filename:
//       "[Leopard-Raws] Sora to Umi no Aida - 07 RAW (SUN 1280x720 x264 AAC).mp4",
//     episode: 7,
//     from: 1356.33,
//     to: 1356.5,
//     similarity: 0.9471280309141948,
//     video:
//       "https://api.trace.moe/video/99639/%5BLeopard-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2007%20RAW%20(SUN%201280x720%20x264%20AAC).mp4?t=1356.415&now=1717578000&token=GE8ENHln5xHYJZ0vUAC6010kEcU",
//     image:
//       "https://api.trace.moe/image/99639/%5BLeopard-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2007%20RAW%20(SUN%201280x720%20x264%20AAC).mp4.jpg?t=1356.415&now=1717578000&token=A3tKkNZGqfz3JIBdA2omTlvmoVc",
//   },
//   {
//     anime: {
//       id: 99639,
//       title: {
//         jp: "ソラとウミのアイダ",
//         en: "Between the Sky and Sea",
//         zh: "天空與海洋之間",
//       },
//       type: "ANIME",
//       format: "TV",
//       status: "FINISHED",
//       startDate: {
//         year: 2018,
//         month: 10,
//         day: 4,
//       },
//       endDate: {
//         year: 2018,
//         month: 12,
//         day: 20,
//       },
//       season: "FALL",
//       episodes: 12,
//       source: "VIDEO_GAME",
//       coverImage: {
//         large:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx99639-spdT8FCSOlBN.jpg",
//         medium:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx99639-spdT8FCSOlBN.jpg",
//       },
//       bannerImage:
//         "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99639-eYRVojZU7lDZ.png",
//       genres: ["Adventure", "Sci-Fi"],
//       averageScore: 48,
//       stats: {
//         scoreDistribution: [
//           {
//             score: 10,
//             amount: 120,
//           },
//           {
//             score: 20,
//             amount: 138,
//           },
//           {
//             score: 30,
//             amount: 236,
//           },
//           {
//             score: 40,
//             amount: 320,
//           },
//           {
//             score: 50,
//             amount: 393,
//           },
//           {
//             score: 60,
//             amount: 338,
//           },
//           {
//             score: 70,
//             amount: 230,
//           },
//           {
//             score: 80,
//             amount: 126,
//           },
//           {
//             score: 90,
//             amount: 42,
//           },
//           {
//             score: 100,
//             amount: 41,
//           },
//         ],
//       },
//       isAdult: false,
//       externalLinks: [
//         {
//           id: 5871,
//           url: "http://soraumi-anime.com/",
//           site: "Official Site",
//         },
//         {
//           id: 5872,
//           url: "https://twitter.com/soraumi_app",
//           site: "Twitter",
//         },
//         {
//           id: 6432,
//           url: "https://www.crunchyroll.com/between-the-sky-and-sea",
//           site: "Crunchyroll",
//         },
//       ],
//       siteUrl: "https://anilist.co/anime/99639",
//     },
//     filename:
//       "[Leopard-Raws] Sora to Umi no Aida - 10 RAW (SUN 1280x720 x264 AAC).mp4",
//     episode: 10,
//     from: 1356.33,
//     to: 1356.5,
//     similarity: 0.9471280309141948,
//     video:
//       "https://api.trace.moe/video/99639/%5BLeopard-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2010%20RAW%20(SUN%201280x720%20x264%20AAC).mp4?t=1356.415&now=1717578000&token=NWPvx7vxopwAjnjGLEvBu0hvQ",
//     image:
//       "https://api.trace.moe/image/99639/%5BLeopard-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2010%20RAW%20(SUN%201280x720%20x264%20AAC).mp4.jpg?t=1356.415&now=1717578000&token=amRC5rE85n9BmaxHBYFhaoFKVk",
//   },
//   {
//     anime: {
//       id: 99639,
//       title: {
//         jp: "ソラとウミのアイダ",
//         en: "Between the Sky and Sea",
//         zh: "天空與海洋之間",
//       },
//       type: "ANIME",
//       format: "TV",
//       status: "FINISHED",
//       startDate: {
//         year: 2018,
//         month: 10,
//         day: 4,
//       },
//       endDate: {
//         year: 2018,
//         month: 12,
//         day: 20,
//       },
//       season: "FALL",
//       episodes: 12,
//       source: "VIDEO_GAME",
//       coverImage: {
//         large:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx99639-spdT8FCSOlBN.jpg",
//         medium:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx99639-spdT8FCSOlBN.jpg",
//       },
//       bannerImage:
//         "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99639-eYRVojZU7lDZ.png",
//       genres: ["Adventure", "Sci-Fi"],
//       averageScore: 48,
//       stats: {
//         scoreDistribution: [
//           {
//             score: 10,
//             amount: 120,
//           },
//           {
//             score: 20,
//             amount: 138,
//           },
//           {
//             score: 30,
//             amount: 236,
//           },
//           {
//             score: 40,
//             amount: 320,
//           },
//           {
//             score: 50,
//             amount: 393,
//           },
//           {
//             score: 60,
//             amount: 338,
//           },
//           {
//             score: 70,
//             amount: 230,
//           },
//           {
//             score: 80,
//             amount: 126,
//           },
//           {
//             score: 90,
//             amount: 42,
//           },
//           {
//             score: 100,
//             amount: 41,
//           },
//         ],
//       },
//       isAdult: false,
//       externalLinks: [
//         {
//           id: 5871,
//           url: "http://soraumi-anime.com/",
//           site: "Official Site",
//         },
//         {
//           id: 5872,
//           url: "https://twitter.com/soraumi_app",
//           site: "Twitter",
//         },
//         {
//           id: 6432,
//           url: "https://www.crunchyroll.com/between-the-sky-and-sea",
//           site: "Crunchyroll",
//         },
//       ],
//       siteUrl: "https://anilist.co/anime/99639",
//     },
//     filename: "[Ohys-Raws] Sora to Umi no Aida - 07 (MX 1280x720 x264 AAC).mp4",
//     episode: 7,
//     from: 1356.83,
//     to: 1356.92,
//     similarity: 0.9471280309141948,
//     video:
//       "https://api.trace.moe/video/99639/%5BOhys-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2007%20(MX%201280x720%20x264%20AAC).mp4?t=1356.875&now=1717578000&token=yOmCIRJbm1j7Hk3YLWWnhkHPrI",
//     image:
//       "https://api.trace.moe/image/99639/%5BOhys-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2007%20(MX%201280x720%20x264%20AAC).mp4.jpg?t=1356.875&now=1717578000&token=8xhB1jiRSMFlGO1TFcHYD2Sm9Q",
//   },
//   {
//     anime: {
//       id: 99639,
//       title: {
//         jp: "ソラとウミのアイダ",
//         en: "Between the Sky and Sea",
//         zh: "天空與海洋之間",
//       },
//       type: "ANIME",
//       format: "TV",
//       status: "FINISHED",
//       startDate: {
//         year: 2018,
//         month: 10,
//         day: 4,
//       },
//       endDate: {
//         year: 2018,
//         month: 12,
//         day: 20,
//       },
//       season: "FALL",
//       episodes: 12,
//       source: "VIDEO_GAME",
//       coverImage: {
//         large:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx99639-spdT8FCSOlBN.jpg",
//         medium:
//           "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx99639-spdT8FCSOlBN.jpg",
//       },
//       bannerImage:
//         "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99639-eYRVojZU7lDZ.png",
//       genres: ["Adventure", "Sci-Fi"],
//       averageScore: 48,
//       stats: {
//         scoreDistribution: [
//           {
//             score: 10,
//             amount: 120,
//           },
//           {
//             score: 20,
//             amount: 138,
//           },
//           {
//             score: 30,
//             amount: 236,
//           },
//           {
//             score: 40,
//             amount: 320,
//           },
//           {
//             score: 50,
//             amount: 393,
//           },
//           {
//             score: 60,
//             amount: 338,
//           },
//           {
//             score: 70,
//             amount: 230,
//           },
//           {
//             score: 80,
//             amount: 126,
//           },
//           {
//             score: 90,
//             amount: 42,
//           },
//           {
//             score: 100,
//             amount: 41,
//           },
//         ],
//       },
//       isAdult: false,
//       externalLinks: [
//         {
//           id: 5871,
//           url: "http://soraumi-anime.com/",
//           site: "Official Site",
//         },
//         {
//           id: 5872,
//           url: "https://twitter.com/soraumi_app",
//           site: "Twitter",
//         },
//         {
//           id: 6432,
//           url: "https://www.crunchyroll.com/between-the-sky-and-sea",
//           site: "Crunchyroll",
//         },
//       ],
//       siteUrl: "https://anilist.co/anime/99639",
//     },
//     filename: "[Ohys-Raws] Sora to Umi no Aida - 08 (MX 1280x720 x264 AAC).mp4",
//     episode: 8,
//     from: 1356.83,
//     to: 1357,
//     similarity: 0.9471280309141948,
//     video:
//       "https://api.trace.moe/video/99639/%5BOhys-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2008%20(MX%201280x720%20x264%20AAC).mp4?t=1356.915&now=1717578000&token=Jodly9IzdcfucJyuK3LfTCYWE",
//     image:
//       "https://api.trace.moe/image/99639/%5BOhys-Raws%5D%20Sora%20to%20Umi%20no%20Aida%20-%2008%20(MX%201280x720%20x264%20AAC).mp4.jpg?t=1356.915&now=1717578000&token=Uxm3ndvABh8QC65VmgURHch7c",
//   },
// ];

export default AnimeCard;
