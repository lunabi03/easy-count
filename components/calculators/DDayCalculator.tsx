'use client'

import { useState } from 'react'
import { calculateDDay } from '@/lib/calculations/date'
import { formatDate } from '@/lib/utils/format'
import type { DDayResult } from '@/types'
import { useAuth } from '@/components/AuthProvider'
import { saveCalculation } from '@/lib/database/calculations'

export default function DDayCalculator() {
  const { user } = useAuth()
  const [startDate, setStartDate] = useState('')
  const [result, setResult] = useState<DDayResult | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  
  const handleCalculate = () => {
    if (!startDate) {
      alert('날짜를 입력해주세요!')
      return
    }
    
    const calculated = calculateDDay(new Date(startDate))
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
        'dday',
        `디데이 계산 - ${startDate}`,
        { startDate },
        {
          day100: result.day100.toISOString(),
          day200: result.day200.toISOString(),
          day500: result.day500.toISOString(),
          day1000: result.day1000.toISOString(),
          daysTo100: result.daysTo100,
          daysTo200: result.daysTo200,
          daysTo500: result.daysTo500,
          daysTo1000: result.daysTo1000,
        }
      )
      alert('기념일 계산 결과를 저장했습니다!')
    } catch (error) {
      console.error(error)
      alert('저장에 실패했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsSaving(false)
    }
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            연애 시작일 (만난 날)
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <button
          onClick={handleCalculate}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg
                   font-semibold hover:bg-indigo-700 transition-colors"
        >
          기념일 계산하기
        </button>
        
        {result && (
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold text-center mb-4">
              💕 우리의 기념일
            </h3>
            {[
              { days: 100, date: result.day100, daysTo: result.daysTo100 },
              { days: 200, date: result.day200, daysTo: result.daysTo200 },
              { days: 500, date: result.day500, daysTo: result.daysTo500 },
              { days: 1000, date: result.day1000, daysTo: result.daysTo1000 },
            ].map((item) => (
              <div key={item.days} 
                   className="flex justify-between items-center p-4 
                            bg-gray-50 rounded-lg">
                <span className="font-medium">
                  💯 {item.days}일 기념일
                </span>
                <div className="text-right">
                  <div className="font-semibold">{formatDate(item.date)}</div>
                  <div className="text-sm text-gray-600">
                    {item.daysTo > 0 ? `D-${item.daysTo}` : `${Math.abs(item.daysTo)}일 전`}
                  </div>
                </div>
              </div>
            ))}

            {user ? (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold
                         hover:bg-green-700 transition-colors disabled:opacity-60"
              >
                {isSaving ? '저장 중...' : '💾 계산 결과 저장하기'}
              </button>
            ) : (
              <p className="text-sm text-center text-gray-500">
                로그인하면 계산 결과를 저장할 수 있습니다.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

