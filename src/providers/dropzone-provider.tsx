"use client";

import { useAnimeFile } from "@/hooks/anime";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

const DropzoneProvider = ({ children }: { children: ReactNode }) => {
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

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      noClick: true,
      onDrop,
      accept: {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      },
    });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      {isDragAccept && (
        <div className="absolute left-4 top-4 flex h-[96%] w-[96%] items-center justify-center rounded-xl border-2 border-dashed border-green-500 bg-green-300/20">
          <h1>此類型的檔案是可以被接受的唷</h1>
        </div>
      )}
      {isDragReject && (
        <div className="absolute left-4 top-4 flex h-[96%] w-[96%] items-center justify-center rounded-xl border-2 border-dashed border-red-500 bg-red-300/20">
          <h1>此類型的檔案是不可以被接受的唷</h1>
        </div>
      )}
      {children}
    </div>
  );
};

export default DropzoneProvider;
