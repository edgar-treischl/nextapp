import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center px-6">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-30 -z-10"></div>

      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">
        {/* Left column: Text */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 leading-tight">
            Welcome to MyWebsite
          </h1>
          <p className="text-lg md:text-2xl text-blue-800">
            A modern, simple site built with Next.js and Tailwind CSS.
            Perfect for landing pages, dashboards, or small projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link
              href="/about"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
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
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Charts
            </Link>
          </div>
        </div>

        {/* Right column: Hero image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="/hero.jpg"
            alt="Hero illustration"
            className="w-72 md:w-96 lg:w-[400px] rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
