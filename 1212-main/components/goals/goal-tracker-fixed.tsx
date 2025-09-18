"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Target, Plus, Check, X } from 'lucide-react'

interface Goal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  category: string
}

export function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete Math Lessons',
      target: 10,
      current: 7,
      unit: 'lessons',
      category: 'Mathematics'
    },
    {
      id: '2',
      title: 'Study Time',
      target: 120,
      current: 85,
      unit: 'minutes',
      category: 'Daily'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: 0,
    unit: 'lessons',
    category: 'Mathematics'
  })

  const addGoal = () => {
    if (newGoal.title && newGoal.target > 0) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        target: newGoal.target,
        current: 0,
        unit: newGoal.unit,
        category: newGoal.category
      }
      setGoals([...goals, goal])
      setNewGoal({ title: '', target: 0, unit: 'lessons', category: 'Mathematics' })
      setShowAddForm(false)
    }
  }

  const updateProgress = (goalId: string, increment: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, current: Math.max(0, Math.min(goal.target, goal.current + increment)) }
        : goal
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">My Goals</h3>
        <Button onClick={() => setShowAddForm(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="goal-title">Goal Title</Label>
              <Input
                id="goal-title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="e.g., Complete Science Lessons"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="goal-target">Target</Label>
                <Input
                  id="goal-target"
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="goal-unit">Unit</Label>
                <Input
                  id="goal-unit"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                  placeholder="e.g., lessons, minutes"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addGoal}>Add Goal</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100
          const isCompleted = goal.current >= goal.target
          
          return (
            <Card key={goal.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <h4 className="font-medium">{goal.title}</h4>
                  </div>
                  <Badge variant={isCompleted ? "default" : "secondary"}>
                    {goal.category}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{goal.current} / {goal.target} {goal.unit}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  
                  <div className="w-full bg-secondary/20 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(100, progress)}%` }}
                    />
                  </div>
                  
                  {!isCompleted && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateProgress(goal.id, -1)}
                        disabled={goal.current <= 0}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateProgress(goal.id, 1)}
                        disabled={goal.current >= goal.target}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  {isCompleted && (
                    <div className="flex items-center gap-2 pt-2 text-green-600">
                      <Check className="h-4 w-4" />
                      <span className="text-sm font-medium">Goal Completed! 🎉</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}