// 계산 기록 데이터베이스 작업 함수
// Supabase를 사용하여 계산 기록을 저장, 조회, 삭제합니다.

import { createClient } from '@/lib/supabase/client'

// 계산 기록 저장
export async function saveCalculation(
  calculatorType: string,
  title: string,
  inputData: any,
  resultData: any
) {
  const supabase = createClient()
  
  // 현재 로그인한 사용자 정보 가져오기
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('로그인이 필요합니다')
  
  // 계산 기록을 데이터베이스에 저장
  const { data, error } = await supabase
    .from('calculations')
    .insert({
      user_id: user.id,
      calculator_type: calculatorType,
      title,
      input_data: inputData,
      result_data: resultData,
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

// 계산 기록 조회
export async function getCalculations(calculatorType?: string) {
  const supabase = createClient()
  
  // 현재 로그인한 사용자 정보 가져오기
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('로그인이 필요합니다')
  
  // 사용자의 계산 기록 조회 (최신순)
  let query = supabase
    .from('calculations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  
  // 특정 계산기 타입으로 필터링 (옵션)
  if (calculatorType) {
    query = query.eq('calculator_type', calculatorType)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}

// 계산 기록 삭제
export async function deleteCalculation(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('calculations')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}


