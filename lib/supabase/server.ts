// 서버에서 사용하는 Supabase 클라이언트
// Next.js 서버 컴포넌트, Route Handler, Server Actions에서 사용
// 쿠키를 통해 세션을 안전하게 관리합니다.

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import {
  SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_URL,
} from './env'

export function createClient(options?: { useServiceKey?: boolean }) {
  const cookieStore = cookies()
  const apiKey =
    options?.useServiceKey && SUPABASE_SERVICE_ROLE_KEY
      ? SUPABASE_SERVICE_ROLE_KEY
      : SUPABASE_ANON_KEY

  return createServerClient(SUPABASE_URL, apiKey, {
    cookies: {
      // 쿠키에서 값을 읽어옵니다
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      // 쿠키를 설정합니다 (서버에서는 자동으로 처리됨)
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // 서버 컴포넌트에서 직접 쿠키를 설정할 수 없을 때는 무시
          // Route Handler에서는 정상적으로 작동합니다
        }
      },
      // 쿠키를 삭제합니다
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {
          // 서버 컴포넌트에서 직접 쿠키를 삭제할 수 없을 때는 무시
        }
      },
    },
  })
}

