import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="bg-blue-50 min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h2 className="text-4xl md:text-6xl font-bold mb-4">Welcome to MyWebsite</h2>
      <p className="text-lg md:text-2xl text-gray-700 mb-8">
        A modern, simple site built with Next.js 13 and Tailwind CSS.
      </p>
      <Link href="/about" legacyBehavior>
        <a className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Learn More
        </a>
      </Link>
    </section>
  )
}
