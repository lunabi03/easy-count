// 브라우저에서 사용하는 Supabase 클라이언트
// 클라이언트 컴포넌트('use client')에서 사용
// 브라우저의 쿠키를 자동으로 관리합니다.

import { createBrowserClient } from '@supabase/ssr'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './env'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

