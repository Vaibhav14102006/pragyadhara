"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Send, Lightbulb, Heart, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  content: string
  sender: "user" | "advisor"
  timestamp: Date
  mood?: string
}

interface EducationGuidance {
  id: string
  title: string
  content: string
  subject: string
  difficulty: "beginner" | "intermediate" | "advanced"
  emoji: string
}

const educationGuidance: EducationGuidance[] = [
  {
    id: "1",
    title: "NEP 2020 Learning Approach",
    content: "Focus on experiential learning and critical thinking as outlined in the National Education Policy 2020",
    subject: "General",
    difficulty: "beginner",
    emoji: "📚"
  },
  {
    id: "2", 
    title: "Indian Cultural Context Learning",
    content: "Integrate Indian cultural values and local context into your studies for better understanding",
    subject: "Culture",
    difficulty: "intermediate",
    emoji: "🇮🇳"
  },
  {
    id: "3",
    title: "Digital India Skills",
    content: "Develop digital literacy skills aligned with Digital India initiatives for future readiness",
    subject: "Technology",
    difficulty: "intermediate", 
    emoji: "💻"
  },
  {
    id: "4",
    title: "Multilingual Learning Benefits",
    content: "Practice subjects in multiple Indian languages to strengthen conceptual understanding",
    subject: "Language",
    difficulty: "beginner",
    emoji: "🗣️"
  }
]

const predefinedResponses: Record<string, string> = {
  "hello": "Namaste! I'm your Government Education Advisor. How can I help you with your learning journey today?",
  "help": "I can assist you with study guidance, NEP 2020 implementation, digital learning resources, and educational support aligned with Indian education policies.",
  "nep": "The National Education Policy 2020 emphasizes holistic development, critical thinking, and skill-based learning. Would you like specific guidance on any aspect?",
  "digital": "Digital India promotes technology integration in education. I can help you explore online learning platforms and digital resources approved by the Ministry of Education.",
  "subjects": "I can provide guidance on all subjects following NCERT curriculum and state board requirements. Which subject would you like help with?",
  "career": "Career guidance aligned with skill development programs and employment opportunities under various government initiatives. What field interests you?",
  "default": "As your Government Education Advisor, I'm here to support your educational journey with guidance based on Indian education policies and cultural values."
}

export function GovernmentEducationAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Namaste! 🇮🇳 I'm your Government Education Advisor, here to support your learning journey with guidance aligned with NEP 2020 and Indian educational values. How can I help you today?",
      sender: "advisor",
      timestamp: new Date(),
      mood: "welcoming"
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [currentTip, setCurrentTip] = useState<EducationGuidance | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const tipInterval = setInterval(() => {
      const randomTip = educationGuidance[Math.floor(Math.random() * educationGuidance.length)]
      setCurrentTip(randomTip)
    }, 30000) // Change tip every 30 seconds

    return () => clearInterval(tipInterval)
  }, [])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Check for keywords in predefined responses
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    // Subject-specific responses
    if (lowerMessage.includes("math") || lowerMessage.includes("गणित")) {
      return "Mathematics is fundamental to logical thinking. NCERT provides excellent resources. Would you like help with specific topics like algebra, geometry, or arithmetic?"
    }
    
    if (lowerMessage.includes("science") || lowerMessage.includes("विज्ञान")) {
      return "Science education promotes inquiry and experimentation. Focus on understanding concepts through practical applications and real-world examples."
    }
    
    if (lowerMessage.includes("english") || lowerMessage.includes("अंग्रेजी")) {
      return "English communication skills are important for global connectivity while maintaining our cultural identity. Practice reading, writing, and speaking regularly."
    }
    
    if (lowerMessage.includes("hindi") || lowerMessage.includes("हिंदी")) {
      return "Hindi as our national language connects us culturally. Explore Hindi literature and poetry to strengthen language skills and cultural understanding."
    }

    return predefinedResponses.default
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate advisor thinking time
    setTimeout(() => {
      const advisorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input),
        sender: "advisor",
        timestamp: new Date(),
        mood: "helpful"
      }

      setMessages(prev => [...prev, advisorResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-green-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="/government-emblem.svg" alt="Government Advisor" className="w-12 h-12 rounded-full" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Government Education Advisor</CardTitle>
              <p className="text-sm text-muted-foreground">Ministry of Education | शिक्षा मंत्रालय</p>
            </div>
            <img src="/digital-india-logo.svg" alt="Digital India" className="w-8 h-8 ml-auto" />
          </div>
        </CardHeader>
      </Card>

      {/* Current Learning Tip */}
      {currentTip && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{currentTip.emoji}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900">{currentTip.title}</h4>
                <p className="text-sm text-blue-700">{currentTip.content}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">{currentTip.subject}</Badge>
                  <Badge variant="outline" className="text-xs">{currentTip.difficulty}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Messages */}
      <Card className="h-80">
        <CardContent className="p-0">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "advisor" && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/government-emblem.svg" />
                      <AvatarFallback>GA</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/government-emblem.svg" />
                    <AvatarFallback>GA</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about NEP 2020, subjects, or educational guidance..."
          className="flex-1"
        />
        <Button onClick={sendMessage} disabled={!input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInput("Tell me about NEP 2020")}
          className="text-xs"
        >
          <BookOpen className="w-3 h-3 mr-1" />
          NEP 2020
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInput("Help with subjects")}
          className="text-xs"
        >
          <GraduationCap className="w-3 h-3 mr-1" />
          Subjects
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInput("Digital learning resources")}
          className="text-xs"
        >
          <Lightbulb className="w-3 h-3 mr-1" />
          Digital Resources
        </Button>
      </div>
    </div>
  )
}