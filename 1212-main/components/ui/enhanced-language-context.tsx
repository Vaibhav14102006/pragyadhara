"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { translationService } from '@/lib/translation-service'

// Language interface
export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

// Available languages
export const languages: Language[] = [
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

// Context interface
interface LanguageContextType {
  currentLanguage: Language
  isTranslating: boolean
  translate: (text: string) => Promise<string>
  changeLanguage: (language: Language) => Promise<void>
  getSupportedLanguages: () => Language[]
}

// Create context
const LanguageContext = createContext<LanguageContextType | null>(null)

// Provider component
export function EnhancedLanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[1]) // Default to Hindi
  const [isTranslating, setIsTranslating] = useState(false)

  // Load saved language on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedLanguage')
      if (saved) {
        try {
          const savedLanguage = JSON.parse(saved) as Language
          const validLanguage = languages.find(lang => lang.code === savedLanguage.code)
          if (validLanguage) {
            setCurrentLanguage(validLanguage)
            // Preload common phrases for the saved language
            translationService.preloadPhrases(validLanguage.code)
          }
        } catch (error) {
          console.error('Failed to load saved language:', error)
        }
      } else {
        // Preload Hindi phrases as default
        translationService.preloadPhrases('hi')
      }
    }

    // Listen for language change events from other components
    const handleLanguageChange = (event: CustomEvent) => {
      const { language } = event.detail
      if (language) {
        setCurrentLanguage(language)
      }
    }

    window.addEventListener('languageChanged', handleLanguageChange as EventListener)
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener)
    }
  }, [])

  // Translate text function
  const translate = async (text: string): Promise<string> => {
    try {
      return await translationService.translateText(text, currentLanguage.code, 'en')
    } catch (error) {
      console.error('Translation failed:', error)
      return text
    }
  }

  // Change language function
  const changeLanguage = async (language: Language): Promise<void> => {
    setIsTranslating(true)
    
    try {
      // Preload common phrases for new language
      translationService.preloadPhrases(language.code)
      
      // Update current language
      setCurrentLanguage(language)
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedLanguage', JSON.stringify(language))
      }
      
      console.log(`Language changed to: ${language.nativeName}`)
      
    } catch (error) {
      console.error('Failed to change language:', error)
    } finally {
      setIsTranslating(false)
    }
  }

  // Get supported languages
  const getSupportedLanguages = (): Language[] => languages

  const contextValue: LanguageContextType = {
    currentLanguage,
    isTranslating,
    translate,
    changeLanguage,
    getSupportedLanguages
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook to use language context
export function useEnhancedLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useEnhancedLanguage must be used within an EnhancedLanguageProvider')
  }
  return context
}

// Export for backward compatibility
export { useEnhancedLanguage as useTranslation }