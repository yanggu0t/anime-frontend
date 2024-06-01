import { formatAnimes } from "@/utils/tool";
import useSWR from "swr";

const fetcher = (url: string, method: string, body: any) =>
  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export function useAnime(body: any) {
  const url = "https://api.anime1.work/v1/url"; // 預設的 API URL
  const method = "POST"; // 預設的 HTTP 方法

  const { data, error, isLoading } = useSWR(
    body ? [url, method, body] : null, // Key should be null if body is not provided
    () => fetcher(url, method, body),
  );

  return {
    data: data ? formatAnimes(data) : [],
    error,
    isLoading,
  };
}
