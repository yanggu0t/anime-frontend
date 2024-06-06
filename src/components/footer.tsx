import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer>
      <Separator className="mt-10" />
      <div className="flex justify-between px-4 py-8">
        <h1>© {year} Built by yanggu0t.</h1>
        <h1>
          Information provided by{" "}
          <Link
            target="_blank"
            className="border-b-2 border-black dark:border-white"
            href="https://anilist.co/"
          >
            AniList.co
          </Link>
          {" & "}
          <Link
            target="_blank"
            className="border-b-2 border-black dark:border-white"
            href="https://soruly.github.io/trace.moe-api/#/"
          >
            Trace Moe API
          </Link>
        </h1>
      </div>
    </footer>
  );
}
