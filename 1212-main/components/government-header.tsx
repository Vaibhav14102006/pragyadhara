"use client"

import React from 'react'
import Image from 'next/image'

export function GovernmentHeader() {
  return (
    <div className="w-full bg-gradient-to-r from-orange-100 via-white to-green-100 border-b-2 border-orange-500 shadow-sm">
      {/* Top banner with government branding */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left side - Government logos */}
          <div className="flex items-center gap-3">
            <img 
              src="/government-emblem.svg" 
              alt="Government of India Emblem" 
              className="w-12 h-12"
            />
            <img 
              src="/ministry-of-education-logo.svg" 
              alt="Ministry of Education" 
              className="w-16 h-12"
            />
            <div className="border-l border-gray-300 pl-3">
              <h1 className="text-lg font-bold text-blue-900">
                Pragyadhara
              </h1>
              <p className="text-xs text-green-700 font-semibold">
                Digital India Education Platform
              </p>
            </div>
          </div>

          {/* Center - Government Slogans */}
          <div className="hidden md:flex items-center flex-col">
            <div className="text-center">
              <p className="text-sm font-bold text-blue-800">सत्यमेव जयते</p>
              <p className="text-xs text-green-700">Truth Alone Triumphs</p>
            </div>
          </div>

          {/* Right side - Additional government branding */}
          <div className="flex items-center gap-2">
            <img 
              src="/skill-india-logo.svg" 
              alt="Skill India" 
              className="w-12 h-6"
            />
            <img 
              src="/digital-india-logo.svg" 
              alt="Digital India" 
              className="w-10 h-10"
            />
            <img 
              src="/atmanirbhar-bharat-logo.svg" 
              alt="Atmanirbhar Bharat" 
              className="w-14 h-7"
            />
            <img 
              src="/make-in-india-logo.svg" 
              alt="Make in India" 
              className="w-12 h-8"
            />
            <div className="text-right text-xs ml-2">
              <p className="text-orange-600 font-semibold">भारत सरकार</p>
              <p className="text-blue-800 font-semibold">Govt. of India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stripe with Indian flag colors */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
    </div>
  )
}