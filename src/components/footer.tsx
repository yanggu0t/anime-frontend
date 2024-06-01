import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <div className="my-10 text-center">
      <p>{t("copyright", { year })}</p>
    </div>
  );
}
