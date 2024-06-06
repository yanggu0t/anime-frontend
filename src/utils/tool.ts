import { AnimeResponseType, CombinedResultType } from "@/types/anime";

export const formatAnimeList = (
  data: AnimeResponseType,
): CombinedResultType[] => {
  const results = data.res.result;

  const topSimilarityResult = results.slice(0, 4);
  const adultResult = results.filter((item) => item.anime.isAdult);

  const combinedResults = [...topSimilarityResult, ...adultResult];

  // 去除重複的項目（假設唯一標識符是 filename 和 episode 的組合）
  const uniqueResults = combinedResults.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (t) => t.anime.id === item.anime.id && t.episode === item.episode,
      ),
  );

  return uniqueResults;
};

export const formatTimes = (
  seconds: number,
): { min: string; second: string } => {
  const mins = Math.floor(seconds / 60)
    .toFixed(0)
    .padStart(2, "0"); // 使用 padStart 確保兩位數
  const second = (seconds % 60).toFixed(0).padStart(2, "0");

  return {
    min: mins,
    second: second,
  };
};

export const formatTimeRange = ({
  startSeconds,
  endSeconds,
}: {
  startSeconds: number;
  endSeconds: number;
}): {
  startTime: string;
  endTime: string;
} => {
  const { min: startMin, second: startSecond } = formatTimes(startSeconds);
  const { min: endMin, second: endSecond } = formatTimes(endSeconds);

  return {
    startTime: `${startMin}:${startSecond}`,
    endTime: `${endMin}:${endSecond}`,
  };
};

export const isImage = (url: string) => {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".img",
    ".webp",
  ];
  const lowerCaseUrl = url.toLowerCase();

  // Check if the main part of the URL ends with an image extension
  const mainPart = lowerCaseUrl.split("?")[0];
  const extensionMatch = mainPart.match(/\.\w+$/);
  if (extensionMatch && imageExtensions.includes(extensionMatch[0])) {
    return true;
  }

  // Check if any URL parameter contains an image extension
  try {
    const urlParams = new URLSearchParams(lowerCaseUrl.split("?")[1]);
    for (const [key, value] of urlParams.entries()) {
      if (
        imageExtensions.some((ext) => key.includes(ext) || value.includes(ext))
      ) {
        return true;
      }
    }
  } catch (e) {
    // Handle error if URL is malformed
    console.error("Invalid URL:", e);
  }

  return false;
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
