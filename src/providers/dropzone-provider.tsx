"use client";

import { useAnimeFile } from "@/hooks/anime";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const DropzoneProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile(file);
    }
  }, []);

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setFormData(formData);
    }
  }, [file]);

  const { data, error, isLoading } = useAnimeFile(
    formData ? { file: formData } : null,
  );

  useEffect(() => {
    if (formData) {
      console.log("FormData:", formData.get("file"));
    }
  }, [formData]);

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
