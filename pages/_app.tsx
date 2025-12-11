  // _app.tsx
import '../styles/globals.css'
import { AppProps } from 'next/app'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [openNivo, setOpenNivo] = useState(false)
  const [openChart, setOpenChart] = useState(false)
  const router = useRouter()

  // Close dropdowns on route change
  useEffect(() => {
    const closeMenus = () => {
      setOpenNivo(false)
      setOpenChart(false)
    }
    router.events.on('routeChangeStart', closeMenus)
    return () => router.events.off('routeChangeStart', closeMenus)
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
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About</Link>

            {/* Nivo Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setOpenNivo(prev => !prev)
                  setOpenChart(false)
                }}
                className="nav-link flex items-center"
                aria-expanded={openNivo}
              >
                Nivo
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${openNivo ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openNivo && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg py-2 z-50">
                  <Link href="/nivo-tree" className="dropdown-item">Tree</Link>
                  <Link href="/nivo-bar" className="dropdown-item">Bar</Link>
                </div>
              )}
            </div>

            {/* Chart.js Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setOpenChart(prev => !prev)
                  setOpenNivo(false)
                }}
                className="nav-link flex items-center"
                aria-expanded={openChart}
              >
                Charts.js
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${openChart ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openChart && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg py-2 z-50">
                  <Link href="/charts" className="dropdown-item">Bar</Link>
                  <Link href="/scatter" className="dropdown-item">Scatter</Link>
                </div>
              )}
            </div>
            <Link href="/users" className="nav-link">Users</Link>
            <Link href="/gant" className="nav-link">Gant</Link>

          </div>
        </nav>
      </header>

      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}
