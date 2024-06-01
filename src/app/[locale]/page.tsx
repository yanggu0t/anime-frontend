import { useTranslations } from "next-intl";
import { useAnime } from "@/hooks/anime";
import AnimeInput from "@/components/anime-imput";

export default function Home() {
  const t = useTranslations("IndexPage");

  return (
    <div className="px-8">
      <h1 className="mb-4 text-4xl font-semibold">{t("title")}</h1>
      <p>{t("description")}</p>
      <p className="mb-4">
        https://trace.moe/image-proxy?url=https%3A%2F%2Fi.imgur.com%2FN3yNQkn.png
      </p>
      <AnimeInput />
    </div>
  );
}
