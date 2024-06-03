"use client";

import { useAnimeFile } from "@/hooks/anime";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const DropzoneProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      acceptedFiles.map((file) => {
        setFiles((pre) => [...pre, file]);
      });
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
      {files.length > 0 &&
        files.map((file) => (
          <Image
            key={file.name}
            src={URL.createObjectURL(file)}
            alt=""
            width={300}
            height={300}
          />
        ))}
      {isDragAccept && <p>All files will be accepted</p>}
      {isDragReject && <p>Some files will be rejected</p>}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {data && <p>Data loaded successfully</p>}
      {children}
    </div>
  );
};

export default DropzoneProvider;
