import '../styles/globals.css'
import { AppProps } from 'next/app'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Close dropdown on route change
  useEffect(() => {
    const handleRoute = () => setOpen(false)
    router.events.on('routeChangeStart', handleRoute)
    return () => {
      router.events.off('routeChangeStart', handleRoute)
    }
  }, [router.events])

  return (
    <>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6 relative">
          
          {/* Logo */}
          <h1 className="text-xl font-bold">
            <Link href="/" className="hover:text-blue-600">
              NextJS
            </Link>
          </h1>

          <div className="flex items-center space-x-6">
            <Link href="/" className="nav-link">
              Home
            </Link>

            <Link href="/about" className="nav-link">
              About
            </Link>

            {/* Dropdown wrapper */}
            <div className="relative">
              <button
                onClick={() => setOpen(prev => !prev)}
                className="nav-link flex items-center"
                aria-expanded={open}
              >
                More
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/charts"
                    className="dropdown-item"
                    onClick={() => setOpen(false)}
                  >
                    Charts
                  </Link>

                  <Link
                    href="/nivo-tree"
                    className="dropdown-item"
                    onClick={() => setOpen(false)}
                  >
                    Nivo
                  </Link>

                  <Link
                    href="/users"
                    className="dropdown-item"
                    onClick={() => setOpen(false)}
                  >
                    Users
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}
