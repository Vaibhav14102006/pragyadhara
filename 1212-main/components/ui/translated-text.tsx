"use client"

import React, { useState, useEffect } from 'react'
import { useEnhancedLanguage } from '@/components/ui/enhanced-language-context'

interface TranslatedTextProps {
  text: string
  className?: string
  fallback?: string
  as?: keyof JSX.IntrinsicElements
}

export function TranslatedText({ 
  text, 
  className = "", 
  fallback,
  as: Component = "span" 
}: TranslatedTextProps) {
  const { currentLanguage, translate } = useEnhancedLanguage()
  const [translatedText, setTranslatedText] = useState(text)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let mounted = true

    const performTranslation = async () => {
      if (currentLanguage.code === 'en') {
        setTranslatedText(text)
        return
      }

      setIsLoading(true)
      try {
        const result = await translate(text)
        if (mounted) {
          setTranslatedText(result || fallback || text)
        }
      } catch (error) {
        console.error('Translation error:', error)
        if (mounted) {
          setTranslatedText(fallback || text)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    performTranslation()

    return () => {
      mounted = false
    }
  }, [text, currentLanguage.code, translate, fallback])

  // Show loading state for non-English languages
  if (isLoading && currentLanguage.code !== 'en') {
    return (
      <Component className={`${className} animate-pulse`}>
        {text}
      </Component>
    )
  }

  return (
    <Component className={className}>
      {translatedText}
    </Component>
  )
}
