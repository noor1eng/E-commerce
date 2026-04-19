import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Globe } from "lucide-react";

export default function TranslateBtn() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="hover:bg-gray-100 flex items-center gap-2 px-3 py-1"
    >
      <Globe className="w-[20px] h-[20px]" />
    </Button>
  );
}
