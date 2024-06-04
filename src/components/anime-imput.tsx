"use client";

import { Input } from "@/components/ui/input";
import { useAnimeFile } from "@/hooks/anime";
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
import Image from "next/image";
import { useAnimeStore } from "@/providers/store-provider";
import { Button } from "@/components/ui/button";

const AnimeInput = () => {
  const [inputValue, setInputValue] = useState<File[]>([]);
  // const [inputValue, setInputValue] = useState<string>("");
  const localActive = useLocale();

  const animeList = useAnimeStore((state) => state.animeList);
  const isAnimeLoading = useAnimeStore((state) => state.isAnimeLoading);
  const animeError = useAnimeStore((state) => state.animeError);

  const handleTitle = (titles: any) => {
    switch (localActive) {
      case "jp":
        return titles.jp;
      case "zh":
        return titles.zh;
      case "en":
      default:
        return titles.eng;
    }
  };

  const isValidImageUrl = (url: string) => {
    return /\.(jpg|jpeg|png|webp)$/.test(url);
  };

  // const { data, error, isLoading } = useAnimeURL(
  //   isValidImageUrl(inputValue) ? { url: inputValue } : null,
  // );
  const { data, error, isLoading } = useAnimeFile(
    inputValue.length > 0 ? { file: inputValue } : null,
  );

  return (
    <>
      <Input
        type="file"
        className="mb-2"
        onChange={(e) => {
          if (e.target.files) {
            console.log(e.target.files);
            setInputValue(Array.from(e.target.files));
          } else {
            setInputValue([]);
          }
        }}
      />
      {/* <Input
        className="mb-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      /> */}
      {isAnimeLoading && <Skeleton className="h-[100px] w-full" />}
      {animeError && <p>Error: {animeError.message}</p>}
      {animeList && (
        <>
          <Collapsible className="mb-2">
            <CollapsibleTrigger>Result:</CollapsibleTrigger>
            <CollapsibleContent>
              <pre>{JSON.stringify(animeList, null, 4)}</pre>
            </CollapsibleContent>
          </Collapsible>
          <section>
            {animeList.map((item, idx) => {
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
                      {/* <Video
                        src={decodeURIComponent(item.video)}
                        poster={item.image}
                        autoPlay={true}
                        muted={true}
                      /> */}
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
