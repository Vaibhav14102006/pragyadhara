// LibreTranslate API Service for Pragyadhara Digital India Platform
export class TranslationService {
  private apiUrl = 'https://libretranslate.com/translate'
  private cache = new Map<string, string>()

  // Language code mapping for LibreTranslate compatibility
  private languageMap: Record<string, string> = {
    'en': 'en',
    'hi': 'hi',
    'bn': 'bn', 
    'te': 'te',
    'mr': 'mr',
    'ta': 'ta',
    'gu': 'gu',
    'kn': 'kn',
    'ml': 'ml',
    'pa': 'pa',
    'or': 'or',
    'as': 'as',
    'ur': 'ur',
    'sa': 'sa'
  }

  // Common UI phrases for caching
  private commonPhrases: Record<string, Record<string, string>> = {
    'en': {
      'Welcome to Pragyadhara': 'Welcome to Pragyadhara',
      'Digital Education Platform': 'Digital Education Platform',
      'Choose Your Role': 'Choose Your Role',
      'Student': 'Student',
      'Teacher': 'Teacher',
      'Admin': 'Admin',
      'Government': 'Government',
      'Empowering India through Digital Education': 'Empowering India through Digital Education'
    },
    'hi': {
      'Welcome to Pragyadhara': 'प्रज्ञाधारा में आपका स्वागत है',
      'Digital Education Platform': 'डिजिटल शिक्षा मंच',
      'Choose Your Role': 'अपनी भूमिका चुनें',
      'Student': 'छात्र',
      'Teacher': 'शिक्षक',
      'Admin': 'प्रशासक',
      'Government': 'सरकार',
      'Empowering India through Digital Education': 'डिजिटल शिक्षा के माध्यम से भारत को सशक्त बनाना'
    }
  }

  async translateText(text: string, targetLanguage: string, sourceLanguage: string = 'en'): Promise<string> {
    // Return original text if same language
    if (sourceLanguage === targetLanguage) {
      return text
    }

    // Check cache first
    const cacheKey = `${text}:${sourceLanguage}:${targetLanguage}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    // Check common phrases cache
    if (this.commonPhrases[targetLanguage] && this.commonPhrases[targetLanguage][text]) {
      const translation = this.commonPhrases[targetLanguage][text]
      this.cache.set(cacheKey, translation)
      return translation
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: this.languageMap[sourceLanguage] || 'en',
          target: this.languageMap[targetLanguage] || 'hi',
          format: 'text'
        })
      })

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.status}`)
      }

      const data = await response.json()
      const translation = data.translatedText || text

      // Cache the result
      this.cache.set(cacheKey, translation)
      
      console.log(`Translated "${text}" to ${targetLanguage}: "${translation}"`)
      return translation

    } catch (error) {
      console.error('Translation error:', error)
      
      // Return cached phrase or original text as fallback
      return this.commonPhrases[targetLanguage]?.[text] || text
    }
  }

  // Batch translation for multiple texts
  async translateBatch(texts: string[], targetLanguage: string, sourceLanguage: string = 'en'): Promise<string[]> {
    const promises = texts.map(text => this.translateText(text, targetLanguage, sourceLanguage))
    return Promise.all(promises)
  }

  // Get supported languages
  getSupportedLanguages() {
    return Object.keys(this.languageMap)
  }

  // Clear cache
  clearCache() {
    this.cache.clear()
  }

  // Preload common phrases
  preloadPhrases(targetLanguage: string) {
    if (this.commonPhrases[targetLanguage]) {
      Object.entries(this.commonPhrases[targetLanguage]).forEach(([key, value]) => {
        const cacheKey = `${key}:en:${targetLanguage}`
        this.cache.set(cacheKey, value)
      })
    }
  }
}

// Singleton instance
export const translationService = new TranslationService()
