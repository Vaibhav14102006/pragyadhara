"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, Square, RotateCcw } from 'lucide-react'

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [session, setSession] = useState<'work' | 'break'>('work')
  
  const totalSeconds = session === 'work' ? 25 * 60 : 5 * 60
  const currentTotalSeconds = minutes * 60 + seconds
  const progress = ((totalSeconds - currentTotalSeconds) / totalSeconds) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          // Timer finished
          setIsActive(false)
          if (session === 'work') {
            setSession('break')
            setMinutes(5)
            setSeconds(0)
          } else {
            setSession('work')
            setMinutes(25)
            setSeconds(0)
          }
        }
      }, 1000)
    } else if (!isActive && interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, minutes, seconds, session])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    if (session === 'work') {
      setMinutes(25)
    } else {
      setMinutes(5)
    }
    setSeconds(0)
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {session === 'work' ? 'Focus Time' : 'Break Time'}
          </CardTitle>
          <CardDescription>
            {session === 'work' ? 'Time to focus and be productive' : 'Take a well-deserved break'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-mono font-bold">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>
          
          <Progress value={progress} className="h-3" />
          
          <div className="flex justify-center gap-4">
            <Button onClick={toggleTimer} size="lg">
              {isActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            
            <Button onClick={resetTimer} variant="outline" size="lg">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            {session === 'work' ? '25-minute focus session' : '5-minute break session'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}