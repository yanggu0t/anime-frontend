"use client";

import { useAnimeFile } from "@/hooks/anime";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DropzoneProvider = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    toast({
      title: "你在亂丟什麼洨啊",
      description: "我有讓你能丟東西在這裡了嗎",
    });
    if (acceptedFiles.length > 0) {
      setFiles([acceptedFiles[0]]);
    }
  }, []);

  const { data, error, isLoading } = useAnimeFile(
    files.length > 0 ? { file: files } : null,
  );

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    noClick: true,
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });

  const t = useTranslations("Dropzone");

  return (
    <div {...getRootProps({ className: "dropzone h-full w-full z-[-1]" })}>
      <input {...getInputProps()} />
      {isDragAccept && (
        <div className="absolute bottom-4 left-4 right-4 top-20 z-10 flex items-center justify-center rounded-xl border-2 border-dashed border-green-500 bg-green-300/20">
          <h1>{t("acceptable")}</h1>
        </div>
      )}
      {isDragReject && (
        <div className="absolute bottom-4 left-4 right-4 top-20 z-10 flex items-center justify-center rounded-xl border-2 border-dashed border-red-500 bg-red-300/20">
          <h1>{t("rejectable")}</h1>
        </div>
      )}
      <div
        className={`${isDragActive ? "hidden" : ""} absolute bottom-4 left-4 right-4 top-20 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-500`}
      >
        <Upload className="mb-4 h-10 w-10" />
        <h2 className="mb-4">{t("drop_here")}</h2>
        <div className="flex w-full flex-col items-center gap-2 px-48 sm:flex-row">
          <Input
            type="text"
            placeholder={t("enter_url")}
            className="w-full flex-1 sm:w-auto"
          />
          <Button className="w-full sm:w-auto">{t("upload")}</Button>
        </div>
      </div>
    </div>
  );
};

export default DropzoneProvider;
