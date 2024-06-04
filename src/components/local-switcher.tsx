"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
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
  const localeActive = useLocale();

  const onSelectChange = (value: string) => {
    startTransition(() => {
      router.replace(`/${value}`);
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
