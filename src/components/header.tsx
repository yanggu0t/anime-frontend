import { useTranslations } from "next-intl";
import Link from "next/link";
import LocalSwitcher from "./local-switcher";
import { ThemeSwitcher } from "./theme-switcher";
export default function Header() {
  const t = useTranslations("Navigation");

  return (
    <header className="p-4">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-lg font-medium">
          AnimeSearch
        </Link>
        <div className="flex items-center gap-4">
          <LocalSwitcher />
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
