import Link from "next/link";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-[#020617] text-white">

      {/* NAVBAR */}

      <header className="flex items-center justify-between px-6 py-5 border-b border-white/10">

        <h1 className="text-2xl font-bold">
          ChartIQ
        </h1>

        <div className="flex items-center gap-4">

          <Link
            href="/login"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-white px-5 py-2 text-sm font-medium text-black hover:opacity-90 transition"
          >
            Sign Up
          </Link>

        </div>

      </header>

      {/* HERO */}

      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center">

        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
          AI Powered Data Visualization SaaS
        </div>

        <h2 className="mt-8 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">

          Turn CSV & Excel Files Into Beautiful Insights

        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">

          Upload datasets, generate charts, explore analytics,
          and understand your data instantly.

        </p>

        <div className="mt-10 flex items-center gap-4">

          <Link
            href="/login"
            className="rounded-2xl bg-white px-8 py-4 font-medium text-black hover:opacity-90 transition"
          >
            Get Started
          </Link>

          <Link
            href="/signup"
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-medium hover:bg-white/10 transition"
          >
            Create Account
          </Link>

        </div>

      </section>

      {/* FEATURES */}

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">

        <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-8">
          <h3 className="text-xl font-semibold">
            CSV & Excel Upload
          </h3>

          <p className="mt-4 text-gray-400">
            Upload datasets instantly with drag-and-drop support.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-8">
          <h3 className="text-xl font-semibold">
            Automatic Visualizations
          </h3>

          <p className="mt-4 text-gray-400">
            Generate charts and insights automatically from your data.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-8">
          <h3 className="text-xl font-semibold">
            AI Analytics
          </h3>

          <p className="mt-4 text-gray-400">
            Discover trends and patterns using AI-powered analysis.
          </p>
        </div>

      </section>

    </main>
  );
}