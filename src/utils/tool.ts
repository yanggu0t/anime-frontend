import { AnimeResponseType, CombinedResultType } from "@/types/anime";

export const formatAnimes = (data: AnimeResponseType): CombinedResultType[] => {
  console.log(data);
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
