'use client'

import { useState } from 'react'
import { calculateDiscount } from '@/lib/calculations/discount'
import { formatCurrency } from '@/lib/utils/format'
import type { DiscountResult } from '@/types'

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('')
  const [discountRate, setDiscountRate] = useState('')
  const [result, setResult] = useState<DiscountResult | null>(null)
  
  const handleCalculate = () => {
    const price = parseInt(originalPrice)
    const rate = parseInt(discountRate)
    
    if (!price || price <= 0) {
      alert('원가를 올바르게 입력해주세요!')
      return
    }
    
    if (rate < 0 || rate > 100) {
      alert('할인율은 0~100 사이여야 합니다!')
      return
    }
    
    const calculated = calculateDiscount(price, rate)
    setResult(calculated)
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-green-600">🏷️ 할인율 계산기</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            원가
          </label>
          <div className="flex">
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="100000"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg
                       focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <span className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg">
              원
            </span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            할인율
          </label>
          <div className="flex">
            <input
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              placeholder="30"
              min="0"
              max="100"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg
                       focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <span className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg">
              %
            </span>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleCalculate}
        className="w-full bg-green-600 text-white py-3 rounded-lg
                 font-semibold hover:bg-green-700 transition-colors"
      >
        계산하기
      </button>
      
      {result && (
        <div className="mt-6 space-y-3">
          <h4 className="font-bold text-lg text-center">📊 계산 결과</h4>
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>원가</span>
              <span className="font-semibold">{formatCurrency(result.originalPrice)}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>할인 금액 ({result.discountRate}%)</span>
              <span className="font-semibold">-{formatCurrency(result.discountAmount)}</span>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between text-xl font-bold text-green-600">
              <span>최종 가격</span>
              <span>{formatCurrency(result.finalPrice)}</span>
            </div>
          </div>
          
          <div className="bg-green-500 text-white p-4 rounded-lg text-center font-semibold">
            🎉 {formatCurrency(result.savedAmount)} 절약!
          </div>
        </div>
      )}
    </div>
  )
}

