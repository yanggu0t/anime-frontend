import { AnimeResponseType, CombinedResultType } from "@/types/anime";

export const formatAnimeList = (
  data: AnimeResponseType,
): CombinedResultType[] => {
  return data.res.result;
};

export const formatTimes = (
  seconds: number,
): { min: string; second: string } => {
  const mins = Math.floor(seconds / 60).toFixed(0); // 使用 Math.floor 確保是整數
  const second = (seconds % 60).toFixed(0);

  return {
    min: mins,
    second: second,
  };
};

export const isImage = (url: string) => {
  const imageExtensions = [".jpg", ".png", ".gif", ".bmp", ".jpeg"];
  const extension = url.substring(url.lastIndexOf(".")).toLowerCase();
  return imageExtensions.includes(extension);
};

export const isImageAlive = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined") {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    } else {
      resolve(false);
    }
  });
};
