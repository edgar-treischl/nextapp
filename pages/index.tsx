import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-3xl space-y-6">
        <h2 className="text-4xl md:text-6xl font-extrabold text-blue-900">
          Welcome to MyWebsite
        </h2>
        <p className="text-lg md:text-2xl text-blue-800">
          A modern, simple site built with Next.js and Tailwind CSS.
          Perfect for landing pages, dashboards, or small projects.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/about"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Learn More
          </Link>
          <Link
            href="/users"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Users Example
          </Link>
          <Link 
          href="/charts" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Charts
          </Link>
        </div>
        <img
          src="/hero.jpg"
          alt="Hero illustration"
          className="mx-auto mt-10 w-64 md:w-96"
        />
      </div>
    </section>
  )
}
