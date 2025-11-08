'use client'

// 계산 기록 페이지
// 사용자가 저장한 모든 계산 기록을 조회하고 삭제할 수 있습니다.

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { getCalculations, deleteCalculation } from '@/lib/database/calculations'
import { formatDate } from '@/lib/utils/format'

export default function HistoryPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [calculations, setCalculations] = useState<any[]>([])
  const [loadingData, setLoadingData] = useState(true)
  
  useEffect(() => {
    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!loading && !user) {
      router.push('/auth')
    } else if (user) {
      // 로그인한 경우 데이터 로드
      loadData()
    }
  }, [user, loading, router])
  
  const loadData = async () => {
    try {
      const data = await getCalculations()
      setCalculations(data || [])
    } catch (error) {
      console.error('Error loading calculations:', error)
      alert('데이터를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoadingData(false)
    }
  }
  
  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    
    try {
      await deleteCalculation(id)
      // 삭제 후 목록 새로고침
      loadData()
    } catch (error) {
      console.error('Error deleting:', error)
      alert('삭제 실패')
    }
  }
  
  if (loading || loadingData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-gray-500">로딩중...</div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">계산 기록</h1>
      
      {calculations.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-lg mb-2">저장된 계산 기록이 없습니다.</p>
          <p className="text-sm">계산기를 사용하여 결과를 저장해보세요!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {calculations.map((calc) => (
            <div key={calc.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                      {calc.calculator_type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(new Date(calc.created_at))}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{calc.title}</h3>
                  <div className="mb-2">
                    <p className="text-sm text-gray-600 mb-1">입력 데이터:</p>
                    <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
                      {JSON.stringify(calc.input_data, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">결과 데이터:</p>
                    <pre className="text-xs bg-blue-50 p-3 rounded overflow-x-auto">
                      {JSON.stringify(calc.result_data, null, 2)}
                    </pre>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(calc.id)}
                  className="text-red-500 hover:text-red-700 ml-4 p-2
                           hover:bg-red-50 rounded transition-colors"
                  title="삭제"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


