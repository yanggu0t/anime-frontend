"use client";

// import { useAnimeFile } from "@/hooks/anime";
import React, { ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropzoneProvider = ({ children }: { children: ReactNode }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]; // Get the first file only
      const formData = new FormData();
      formData.append("file", file);

      console.log(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      noClick: true,
      onDrop,
      accept: {
        "image/jpeg": [".jpg", ".jpeg"], // Accepts JPEG images
        "image/png": [".png"], // Accepts PNG images
        "image/webp": [".webp"], // Accepts WEBP images
      },
    });
  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      {isDragAccept && <p>All files will be accepted</p>}
      {isDragReject && <p>Some files will be rejected</p>}
      {children}
    </div>
  );
};

export default DropzoneProvider;
