import { formatAnimes } from "@/utils/tool";
import useSWR from "swr";

async function fetcher(
  url: string,
  method: string,
  body: any,
  hasFile: boolean,
) {
  let fetchOptions: RequestInit = {
    method: method,
  };

  if (hasFile) {
    const formData = new FormData();
    // 假設 'file' 是預設的文件字段名，並且 body 中包含文件列表
    if (body.file && body.file.length > 0) {
      formData.append("file", body.file[0]);
    }
    // 由於是文件上傳，不設置 'Content-Type' 讓瀏覽器自動處理
    fetchOptions.body = formData;
  } else {
    // 設置 JSON 內容類型並序列化非文件體數據
    fetchOptions.headers = {
      "Content-Type": "application/json",
    };
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export function useAnimeURL(body: any) {
  const url = "https://api.anime1.work/v1/url"; // 預設的 API URL
  const method = "POST"; // 預設的 HTTP 方法

  const { data, error, isLoading } = useSWR(
    body ? [url, method, body] : null, // Key should be null if body is not provided
    () => fetcher(url, method, body, false),
  );

  return {
    data: data ? formatAnimes(data) : [],
    error,
    isLoading,
  };
}

export function useAnimeFile(body: any) {
  const url = "https://api.anime1.work/v1/upload"; // 預設的 API URL
  const method = "POST"; // 預設的 HTTP 方法

  const { data, error, isLoading } = useSWR(
    body ? [url, method, body] : null, // Key should be null if body is not provided
    () => fetcher(url, method, body, true),
  );

  return {
    data: data ? formatAnimes(data) : [],
    error,
    isLoading,
  };
}
