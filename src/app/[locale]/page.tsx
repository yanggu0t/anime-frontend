import { useTranslations } from "next-intl";
import Dropzone from "@/components/dropzone";

export default function Home() {
  const t = useTranslations("IndexPage");

  const Home = () => (
    <div className="relative flex flex-col items-center justify-center px-4">
      <h1 className="text-lg font-medium">{t("welcome")}</h1>
      <div className="h-[600px] w-full">
        <Dropzone />
      </div>
    </div>
  );

  return Home();
}
