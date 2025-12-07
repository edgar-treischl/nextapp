import Link from 'next/link'

export default function AboutPage() {
  return (
    <section className="container mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-6">About Us</h2>
      <p className="text-lg text-gray-700 mb-6">
        This is a simple modern website built with Next.js 13 and Tailwind CSS.
        You can use it as a starting point for landing pages, dashboards, or data apps.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </section>
  )
}
