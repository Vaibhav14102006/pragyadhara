"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English", nativeName: "English", flag: "" },
  { code: "hi", name: "Hindi", nativeName: "हद", flag: "" },
  { code: "bn", name: "Bengali", nativeName: "বল", flag: "" },
  { code: "te", name: "Telugu", nativeName: "తలగ", flag: "" },
  { code: "mr", name: "Marathi", nativeName: "मरठ", flag: "" },
  { code: "ta", name: "Tamil", nativeName: "தமழ", flag: "" },
  { code: "gu", name: "Gujarati", nativeName: "ગજરત", flag: "" },
  { code: "kn", name: "Kannada", nativeName: "ಕನನಡ", flag: "" },
  { code: "ml", name: "Malayalam", nativeName: "മലയള", flag: "" },
  { code: "pa", name: "Punjabi", nativeName: "ਪਜਬ", flag: "" }
]

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguage()

  const handleLanguageChange = (value: string) => {
    const selectedLanguage = languages.find(lang => lang.code === value)
    if (selectedLanguage) {
      setLanguage(selectedLanguage)
    }
  }

  return (
    <Select value={currentLanguage.code} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-40">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="text-sm">
            {currentLanguage.flag} {currentLanguage.nativeName}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
