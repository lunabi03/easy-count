'use client'

import { useState } from 'react'
import { calculateGPA, gradeToPoint } from '@/lib/calculations/academic'
import type { Course, GPAResult } from '@/types'
import { useAuth } from '@/components/AuthProvider'
import { saveCalculation } from '@/lib/database/calculations'

export default function GPACalculator() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', credit: 3, grade: 'A' }
  ])
  const [result, setResult] = useState<GPAResult | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  
  const addCourse = () => {
    setCourses([...courses, {
      id: Date.now().toString(),
      name: '',
      credit: 3,
      grade: 'A'
    }])
  }
  
  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id))
    }
  }
  
  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ))
  }
  
  const handleCalculate = () => {
    const calculated = calculateGPA(courses)
    setResult(calculated)
  }

  const handleSave = async () => {
    if (!user) {
      alert('로그인이 필요합니다!')
      return
    }
    if (!result) {
      alert('먼저 계산을 해주세요!')
      return
    }

    setIsSaving(true)
    try {
      await saveCalculation(
        'gpa',
        `GPA 계산 - 총 평점 ${result.gpa}`,
        { courses },
        result
      )
      alert('GPA 계산 결과를 저장했습니다!')
    } catch (error) {
      console.error(error)
      alert('저장에 실패했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsSaving(false)
    }
  }
  
  const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'P']
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="space-y-4 mb-6">
          {courses.map((course, index) => (
            <div key={course.id} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1 text-center font-semibold">
                {index + 1}
              </div>
              <div className="col-span-5">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  placeholder="과목명"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  value={course.credit}
                  onChange={(e) => updateCourse(course.id, 'credit', parseInt(e.target.value) || 0)}
                  min="1"
                  max="6"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="col-span-3">
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {grades.map(g => (
                    <option key={g} value={g}>{g} ({gradeToPoint(g)})</option>
                  ))}
                </select>
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => removeCourse(course.id)}
                  className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  disabled={courses.length === 1}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={addCourse}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg
                     font-semibold hover:bg-gray-300 transition-colors"
          >
            + 과목 추가
          </button>
          <button
            onClick={handleCalculate}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg
                     font-semibold hover:bg-indigo-700 transition-colors"
          >
            학점 계산하기
          </button>
        </div>
        
        {result && (
          <div className="mt-8 border-t pt-6">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-indigo-600 mb-2">
                {result.gpa}
              </div>
              <div className="text-2xl font-semibold text-gray-600">
                {result.letterGrade} 등급
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">신청 학점</div>
                <div className="text-2xl font-semibold">{result.totalCredits}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">취득 학점</div>
                <div className="text-2xl font-semibold">{result.earnedCredits}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">총 평점</div>
                <div className="text-2xl font-semibold">{result.totalGradePoints}</div>
              </div>
            </div>

            {user ? (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold
                         hover:bg-green-700 transition-colors disabled:opacity-60"
              >
                {isSaving ? '저장 중...' : '💾 계산 결과 저장하기'}
              </button>
            ) : (
              <p className="mt-6 text-sm text-center text-gray-500">
                로그인하면 계산 결과를 저장할 수 있습니다.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

