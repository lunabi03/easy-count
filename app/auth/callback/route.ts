// OAuth 인증 콜백 처리 라우트
// OAuth 로그인 후 Supabase에서 리다이렉트되는 URL을 처리합니다.

import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin
  const nextPath = requestUrl.searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = cookies()
    
    // Route Handler에서는 쿠키를 직접 설정할 수 있도록 클라이언트 생성
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options })
            } catch (error) {
              // 쿠키 설정 실패 시 무시 (이미 설정된 경우 등)
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: '', ...options })
            } catch (error) {
              // 쿠키 삭제 실패 시 무시
            }
          },
        },
      }
    )
    
    // 인증 코드를 세션으로 교환
    await supabase.auth.exchangeCodeForSession(code)
  }

  // 인증 완료 후 원래 요청한 페이지 또는 홈으로 리다이렉트
  return NextResponse.redirect(`${origin}${nextPath}`)
}

