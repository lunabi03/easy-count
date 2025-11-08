// Supabase 관련 환경 변수를 안전하게 읽어오기 위한 헬퍼
// Supabase 대시보드 UI가 바뀌면서 키 이름이 달라질 수 있으므로
// 여러 후보 키를 순서대로 확인합니다.

const urlCandidates = [
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  process.env.SUPABASE_URL,
]

const anonKeyCandidates = [
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
  process.env.SUPABASE_ANON_KEY,
]

const serviceRoleCandidates = [
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  process.env.SUPABASE_SECRET_KEY,
]

function pickValue(label: string, candidates: Array<string | undefined>) {
  const value = candidates.find((candidate) => candidate && candidate.length > 0)
  if (!value) {
    throw new Error(
      `Supabase ${label} 환경 변수를 찾을 수 없습니다. `.concat(
        'NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY 등의 값을 확인하세요.'
      )
    )
  }
  return value
}

export const SUPABASE_URL = pickValue('URL', urlCandidates)
export const SUPABASE_ANON_KEY = pickValue('Anon/Public Key', anonKeyCandidates)
export const SUPABASE_SERVICE_ROLE_KEY = serviceRoleCandidates.find(
  (candidate) => candidate && candidate.length > 0
)


