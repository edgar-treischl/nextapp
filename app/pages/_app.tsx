import './globals.css'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <header className="bg-white shadow-md">
          <nav className="container mx-auto flex justify-between items-center py-4 px-6">
            <h1 className="text-xl font-bold">MyWebsite</h1>
            <div className="space-x-4">
              <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
