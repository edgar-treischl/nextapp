  // _app.tsx
import '../styles/globals.css'
import { AppProps } from 'next/app'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [openNivo, setOpenNivo] = useState(false)
  const [openChart, setOpenChart] = useState(false)
  const [openMaps, setOpenMaps] = useState(false)
  const [openOthers, setOpenOthers] = useState(false)
  const router = useRouter()

  // Close dropdowns on route change
  useEffect(() => {
    const closeMenus = () => {
      setOpenNivo(false)
      setOpenChart(false)
      setOpenMaps(false)
      setOpenOthers(false)
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
              NextPlot
            </Link>
          </h1>

          <div className="flex items-center space-x-6">
            <Link href="/about" className="nav-link">About</Link>


            {/* Chart.js Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setOpenChart(prev => !prev)
                  setOpenNivo(false)
                  setOpenMaps(false)
                  setOpenOthers(false)
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
                  <Link href="/charts" className="dropdown-item">-bar</Link>
                  <Link href="/scatter" className="dropdown-item">-scatter</Link>
                </div>
              )}
            </div>


            {/* Maps Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setOpenMaps(prev => !prev)
                  setOpenNivo(false)
                  setOpenChart(false)
                  setOpenOthers(false)
                }}
                className="nav-link flex items-center"
                aria-expanded={openMaps}
              >
                Maps
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${openMaps ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

               {openMaps && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-2 z-50">
                  <Link href="/germany" className="dropdown-item">Germany</Link>
                  <Link href="/bavaria" className="dropdown-item">Bavaria</Link>
                </div>
              )}
            </div>


            {/* Nivo Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setOpenNivo(prev => !prev)
                  setOpenChart(false)
                  setOpenMaps(false)
                  setOpenOthers(false)
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
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-2 z-50">
                  <Link href="/nivo-tree" className="dropdown-item">tree</Link>
                  <Link href="/nivo-bar" className="dropdown-item">bar</Link>
                  <Link href="/nivo-stufen" className="dropdown-item">stacked bar</Link>
                </div>
              )}
            </div>


          {/* Others Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setOpenOthers(prev => !prev)
                  setOpenMaps(false)
                  setOpenNivo(false)
                  setOpenChart(false)
                }}
                className="nav-link flex items-center"
                aria-expanded={openOthers}
              >
                Others
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${openOthers ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

               {openOthers && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-2 z-50">
                  <Link href="/gant" className="dropdown-item">Gant</Link>
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
