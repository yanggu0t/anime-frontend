"use client";

import React, { useState } from "react";
import { isImageAlive } from "@/utils/tool";
import { notFound } from "next/navigation";

const Page = ({ params }: { params: { slug: string } }) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const imgUrl = decodeURIComponent(params.slug);

  isImageAlive(imgUrl).then((bool) => {
    setIsValid(bool);
    setIsLoading(false);
  });

  if (!isValid && isLoading) {
    return <div>Loading</div>;
  } else if (!isValid) {
    return notFound();
  }

  return <div className="px-4">Page:{imgUrl}</div>;
};

export default Page;
