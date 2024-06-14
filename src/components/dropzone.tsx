"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { useLocale, useTranslations } from "next-intl";
import { ImageOff, ImagePlus, ScanSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { isImage } from "@/utils/tool";
import { useRouter } from "next/navigation";
import { useAnimeStore } from "@/providers/store-provider";

const Dropzone = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();
  const localeActive = useLocale();
  const t = useTranslations("Dropzone");
  const { setAnimeImageFile } = useAnimeStore((state) => state);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      toast({
        title: "已成功上傳檔案",
        // description: "我有讓你能丟東西在這裡了嗎",
      });
      setAnimeImageFile([acceptedFiles[0]]);
      router.push(`/${localeActive}/upload`);
    } else {
      toast({
        variant: "destructive",
        title: "檔案類型錯誤",
        // description: "我有讓你能丟東西在這裡了嗎",
      });
    }
  }, []);

  // const { data, error, isLoading } = useAnimeFile(
  //   files.length > 0 ? { file: files } : null,
  // );

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
    open,
  } = useDropzone({
    noClick: true,
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });

  useEffect(() => {
    const isImageResult = isImage(inputValue);
    if (isImageResult) {
      router.push(`/${localeActive}/url?=${encodeURIComponent(inputValue)}`);
    }
  }, [inputValue]);

  return (
    <div
      {...getRootProps({
        onClick: (e) => {
          const target = e.target as HTMLElement;
          if (target.tagName !== "INPUT") {
            open();
          }
        },
        className: "dropzone h-full w-full z-[-1]",
      })}
    >
      <input {...getInputProps()} />
      {isDragAccept && (
        <div className="absolute bottom-4 left-4 right-4 top-20 z-10 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-500 bg-green-300/20">
          <ImagePlus className="mb-4 h-40 w-40" />
          <h1 className="text-lg">{t("acceptable")}</h1>
        </div>
      )}
      {isDragReject && (
        <div className="absolute bottom-4 left-4 right-4 top-20 z-10 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-red-500 bg-red-300/20">
          <ImageOff className="mb-4 h-40 w-40" />
          <h1 className="text-lg">{t("rejectable")}</h1>
        </div>
      )}
      <div
        className={`${isDragActive ? "hidden" : ""} absolute bottom-4 left-4 right-4 top-20 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-400 duration-150 hover:border-gray-800 dark:border-gray-400 dark:hover:border-gray-100`}
      >
        <ScanSearch className="mb-4 h-40 w-40" strokeWidth="1.5" />
        <h2 className="mb-4">{t("drop_here")}</h2>
        <div className="flex w-full flex-col items-center gap-2 px-48 sm:flex-row">
          <Input
            type="text"
            placeholder={t("enter_url")}
            className="w-full flex-1 sm:w-auto"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
