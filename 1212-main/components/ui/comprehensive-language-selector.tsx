"use client"

import React from 'react'
import { Globe } from "lucide-react"

// All 14 Indian languages supported by LibreTranslate
const languages = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्", flag: "🕉️" }
]

export function SimpleLanguageSelector() {
  const [selectedLang, setSelectedLang] = React.useState(languages[1]) // Default to Hindi
  const [isTranslating, setIsTranslating] = React.useState(false)

  // Load saved language on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedLanguage')
      if (saved) {
        try {
          const savedLanguage = JSON.parse(saved)
          const validLanguage = languages.find(lang => lang.code === savedLanguage.code)
          if (validLanguage) {
            setSelectedLang(validLanguage)
          }
        } catch (e) {
          console.error('Failed to load saved language:', e)
        }
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = languages.find(lang => lang.code === e.target.value)
    if (selected) {
      setIsTranslating(true)
      
      // Simulate translation delay and save preference
      setTimeout(() => {
        setSelectedLang(selected)
        setIsTranslating(false)
        console.log(`Language changed to: ${selected.nativeName} (${selected.name})`)
        
        // Store in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('selectedLanguage', JSON.stringify(selected))
        }

        // Dispatch custom event for other components to listen
        window.dispatchEvent(new CustomEvent('languageChanged', { 
          detail: { language: selected } 
        }))
      }, 300)
    }
  }

  return (
    <div className="flex items-center gap-2 bg-white/90 border border-orange-200 rounded-lg px-3 py-2 shadow-sm hover:bg-orange-50 transition-colors">
      <Globe className={`h-4 w-4 text-orange-600 ${isTranslating ? 'animate-spin' : ''}`} />
      <select 
        value={selectedLang.code}
        onChange={handleChange}
        disabled={isTranslating}
        className="bg-transparent border-none outline-none cursor-pointer text-sm font-medium text-gray-700 disabled:cursor-wait"
        style={{ minWidth: '140px' }}
      >
        <optgroup label="🇮🇳 Primary Languages">
          {languages.slice(0, 4).map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.nativeName}
            </option>
          ))}
        </optgroup>
        <optgroup label="🌏 Regional Languages">
          {languages.slice(4).map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.nativeName}
            </option>
          ))}
        </optgroup>
      </select>
      {isTranslating && (
        <span className="text-xs text-orange-600">translating...</span>
      )}
    </div>
  )
}