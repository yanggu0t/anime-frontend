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
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocale } from "next-intl";
import { formatTimes } from "@/utils/tool";

const AnimeInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const localActive = useLocale();

  const handleTitle = (titles: any) => {
    switch (localActive) {
      case "jp":
        return titles.native;
      case "zh-Hant":
        return titles.chinese;
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
                <Card className="mb-4" key={idx}>
                  <CardHeader>
                    <CardTitle>{handleTitle(item.anime.title)}</CardTitle>
                    <CardDescription>
                      第 {episode} 集 {startMin}:{startSecond} {endMin}:
                      {endSecond}
                    </CardDescription>
                    <CardContent></CardContent>
                  </CardHeader>
                </Card>
              );
            })}
          </section>
        </>
      )}
    </>
  );
};

export default AnimeInput;
