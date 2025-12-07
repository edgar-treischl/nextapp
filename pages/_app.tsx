import '../styles/globals.css'
import { AppProps } from 'next/app'
import Link from 'next/link'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-xl font-bold">MyWebsite</h1>
          <div className="space-x-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/users" className="text-gray-700 hover:text-blue-600">
              Users
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}
