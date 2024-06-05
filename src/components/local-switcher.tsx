"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function LocalSwitcher({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname(); // 使用 usePathname 獲取當前路徑
  const searchParams = useSearchParams(); // Get the current search parameters
  const localeActive = useLocale();

  const onSelectChange = (value: string) => {
    startTransition(() => {
      const newPath = `/${value}${pathname.slice(3)}${searchParams ? "?" + searchParams.toString() : ""}`;
      router.push(newPath);
    });
  };

  const t = useTranslations("Navigation");

  return (
    <Select onValueChange={onSelectChange} defaultValue={localeActive}>
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t("english")}</SelectItem>
        <SelectItem value="zh">{t("chinese")}</SelectItem>
        <SelectItem value="jp">{t("japanese")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
