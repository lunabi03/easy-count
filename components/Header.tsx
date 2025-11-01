import Link from 'next/link'
import Navigation from './Navigation'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            Easy Count
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  )
}

