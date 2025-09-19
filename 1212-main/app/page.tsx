"use client"

import { useState } from "react"
import { StudentDashboard } from "@/components/dashboards/student-dashboard"
import { TeacherDashboard } from "@/components/dashboards/teacher-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { GovernmentDashboard } from "@/components/dashboards/government-dashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SimpleLanguageSelector } from "@/components/ui/comprehensive-language-selector"
import { TranslatedText } from "@/components/ui/translated-text"
import { EnhancedLanguageProvider } from "@/components/ui/enhanced-language-context"
import {
  GraduationCap,
  Users,
  Building2,
  Gamepad2,
  BarChart3,
  Trophy,
  UserCheck,
  FileText,
  PieChart,
  School,
  Settings,
} from "lucide-react"

function RoleSelectionPage({ onRoleSelect }: { onRoleSelect: (role: string) => void }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/ministry-of-education-logo.svg" alt="Ministry of Education" className="h-10 w-16" />
            <div className="w-1 h-8 bg-green-600"></div>
            <img src="/indian-education-emblem.svg" alt="Indian Education" className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pragyadhara</h1>
            <p className="text-xs text-muted-foreground">शिक्षा भारत • Digital India</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/digital-india-logo.svg" alt="Digital India" className="h-8 w-8" />
            <img src="/make-in-india-logo.svg" alt="Make in India" className="h-6 w-10" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            Digital India Initiative
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            सक्रिय • Active
          </div>
          <SimpleLanguageSelector />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <img src="/government-emblem.svg" alt="Government of India" className="w-16 h-12" />
            <h2 className="text-4xl font-bold text-foreground">
              <TranslatedText text="Welcome to Pragyadhara" />
            </h2>
            <img src="/indian-education-emblem.svg" alt="Indian Education" className="w-16 h-16" />
          </div>
          <p className="text-lg text-muted-foreground mb-2">
            <TranslatedText text="Empowering India through Digital Education" />
          </p>
          <p className="text-sm text-muted-foreground">Ministry of Education, Government of India | शिक्षा मंत्रालय, भारत सरकार</p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <img src="/digital-india-logo.svg" alt="Digital India" className="w-10 h-10" />
            <img src="/skill-india-logo.svg" alt="Skill India" className="w-12 h-6" />
            <img src="/atmanirbhar-bharat-logo.svg" alt="Atmanirbhar Bharat" className="w-14 h-7" />
            <img src="/make-in-india-logo.svg" alt="Make in India" className="w-12 h-8" />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Student Card */}
          <Card
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onRoleSelect("student")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <img src="/student-logo.svg" alt="Student Portal" className="h-12 w-12" />
              </div>
              <CardTitle className="text-2xl">
                <TranslatedText text="Student" />
              </CardTitle>
              <CardDescription className="text-base">
                <TranslatedText text="Play games, track progress, submit assignments" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Gamepad2 className="h-4 w-4 text-primary" />
                <span>Interactive Games</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span>Progress Tracking</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Trophy className="h-4 w-4 text-primary" />
                <span>Achievements</span>
              </div>
            </CardContent>
          </Card>

          {/* Teacher Card */}
          <Card
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onRoleSelect("teacher")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                <img src="/teacher-logo.svg" alt="Teacher Portal" className="h-12 w-12" />
              </div>
              <CardTitle className="text-2xl">
                <TranslatedText text="Teacher" />
              </CardTitle>
              <CardDescription className="text-base">
                <TranslatedText text="Manage students, create assignments, view analytics" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <UserCheck className="h-4 w-4 text-secondary" />
                <span>Student Management</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FileText className="h-4 w-4 text-secondary" />
                <span>Assignment Creation</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <PieChart className="h-4 w-4 text-secondary" />
                <span>Analytics</span>
              </div>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onRoleSelect("admin")}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                <img src="/admin-logo.svg" alt="Admin Portal" className="h-12 w-12" />
              </div>
              <CardTitle className="text-2xl">Admin</CardTitle>
              <CardDescription className="text-base">Manage platform, approve content, system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Users className="h-4 w-4 text-accent" />
                <span>User Management</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FileText className="h-4 w-4 text-accent" />
                <span>Content Approval</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Settings className="h-4 w-4 text-accent" />
                <span>System Settings</span>
              </div>
            </CardContent>
          </Card>

          {/* Government Card */}
          <Card
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onRoleSelect("government")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-chart-1/10 rounded-full w-fit">
                <img src="/government-emblem.svg" alt="Government Portal" className="h-12 w-12" />
              </div>
              <CardTitle className="text-2xl">Government</CardTitle>
              <CardDescription className="text-base">
                View regional data, track implementation, manage policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <BarChart3 className="h-4 w-4 text-chart-1" />
                <span>Regional Analytics</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <School className="h-4 w-4 text-chart-1" />
                <span>School Monitoring</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-chart-1" />
                <span>Policy Management</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Indian Education Ministry Footer */}
      <footer className="bg-gradient-to-r from-orange-50 via-white to-green-50 border-t p-8 mt-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            
            {/* Left Column - Government Branding */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/government-emblem.svg" alt="Government Emblem" className="w-12 h-12" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">भारत सरकार • Government of India</p>
                  <p className="text-gray-600">Ministry of Education • शिक्षा मंत्रालय</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src="/digital-india-logo.svg" alt="Digital India" className="w-8 h-8" />
                <img src="/skill-india-logo.svg" alt="Skill India" className="w-10 h-5" />
                <span className="text-xs text-gray-600">Digital Initiatives</span>
              </div>
            </div>

            {/* Center Column - National Slogans */}
            <div className="text-center space-y-3">
              <p className="text-lg font-bold text-blue-800">सत्यमेव जयते</p>
              <p className="text-sm text-gray-600">Truth Alone Triumphs</p>
              <div className="flex justify-center items-center gap-2">
                <img src="/atmanirbhar-bharat-logo.svg" alt="Atmanirbhar Bharat" className="w-12 h-6" />
                <span className="text-xs text-gray-700">Self-Reliant India</span>
              </div>
              <p className="text-xs text-gray-500">आत्मनिर्भर भारत अभियान</p>
            </div>

            {/* Right Column - Educational Mission */}
            <div className="text-right space-y-3">
              <div className="flex justify-end items-center gap-2">
                <img src="/indian-education-emblem.svg" alt="Indian Education" className="w-10 h-10" />
                <div className="text-sm">
                  <p className="font-semibold text-green-700">शिक्षा भारती</p>
                  <p className="text-gray-600">Education India</p>
                </div>
              </div>
              <div className="flex justify-end items-center gap-2">
                <img src="/make-in-india-logo.svg" alt="Make in India" className="w-10 h-6" />
                <span className="text-xs text-gray-600">Manufacturing Excellence</span>
              </div>
              <p className="text-xs text-gray-500">Empowering Digital India through Quality Education</p>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500">🇮🇳 Proud to be Indian</span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">वसुधैव कुटुम्बकम्</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500">© 2025 Pragyadhara - Government of India</span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">All Rights Reserved</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  if (!selectedRole) {
    return <RoleSelectionPage onRoleSelect={setSelectedRole} />
  }

  switch (selectedRole) {
    case "student":
      return <StudentDashboard />
    case "teacher":
      return <TeacherDashboard />
    case "admin":
      return <AdminDashboard />
    case "government":
      return <GovernmentDashboard />
    default:
      return <RoleSelectionPage onRoleSelect={setSelectedRole} />
  }
}
