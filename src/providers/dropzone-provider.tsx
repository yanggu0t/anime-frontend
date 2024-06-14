"use client";

import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { useLocale, useTranslations } from "next-intl";
import { ImageOff, ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { isImage } from "@/utils/tool";
import { usePathname, useRouter } from "next/navigation";
import { useAnimeStore } from "@/providers/store-provider";
import { cn } from "@/lib/utils";

const DropzoneProvider = ({ children }: { children: ReactNode }) => {
  const [inputValue] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();
  const localeActive = useLocale();
  const t = useTranslations("Dropzone");
  const { setAnimeImageFile, isAnimeLoading } = useAnimeStore((state) => state);
  const pathname = usePathname();
  const route = pathname.split("/")[2];

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (isAnimeLoading) return;

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
    },
    [isAnimeLoading, localeActive, router, setAnimeImageFile, toast],
  );

  const { getRootProps, getInputProps, isDragAccept, isDragReject, open } =
    useDropzone({
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
        className: "dropzone h-full w-full z-[-1]",
      })}
    >
      <input {...getInputProps()} />
      {isDragAccept && (
        <div
          className={cn(
            "absolute bottom-4 left-4 right-4 top-20 z-10 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-500 bg-green-300/20",
            !route || isAnimeLoading ? "hidden" : "",
          )}
        >
          <ImagePlus className="mb-4 h-40 w-40" />
          <h1 className="text-lg">{t("acceptable")}</h1>
        </div>
      )}
      {isDragReject && (
        <div
          className={cn(
            "absolute bottom-4 left-4 right-4 top-20 z-10 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-red-500 bg-red-300/20",
            !route || isAnimeLoading ? "hidden" : "",
          )}
        >
          <ImageOff className="mb-4 h-40 w-40" />
          <h1 className="text-lg">{t("rejectable")}</h1>
        </div>
      )}
      {children}
    </div>
  );
};

export default DropzoneProvider;
