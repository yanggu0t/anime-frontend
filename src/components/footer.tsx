import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer>
      <Separator />
      <div className="flex justify-between px-4 py-8">
        <h1>Built by yanggu0t. The source code is available on GitHub.</h1>
      </div>
    </footer>
  );
}
