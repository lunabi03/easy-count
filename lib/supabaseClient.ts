// 브라우저에서 사용하는 Supabase 클라이언트 초기화 파일
// 주의: 반드시 .env.local에 NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정하세요.

import { createClient } from '@supabase/supabase-js'

// 환경 변수에서 Supabase URL/Anon Key를 읽어옵니다. (클라이언트에서도 사용 가능한 public 값)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// 브라우저 전용 클라이언트 (RLS 정책 하에서 안전하게 동작)
export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey)


