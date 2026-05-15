"use client";

import { useState } from "react";

import {
  BarChart3,
  LineChart,
  PieChart,
} from "lucide-react";

export default function AnalyticsPage() {

  const [showBar, setShowBar] =
    useState(true);

  const [showLine, setShowLine] =
    useState(true);

  const [showPie, setShowPie] =
    useState(false);

  return (
    <main className="space-y-6 text-white">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">

          Analytics

        </h1>

        <p className="mt-2 text-gray-400">

          Customize and control your visualizations

        </p>

      </div>

      {/* CONTROLS */}

      <section className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">

        <h2 className="text-xl font-semibold">

          Chart Controls

        </h2>

        <div className="mt-6 flex flex-wrap gap-4">

          {/* BAR */}

          <button
            onClick={() =>
              setShowBar(!showBar)
            }
            className={`flex items-center gap-3 rounded-2xl px-5 py-3 transition ${
              showBar
                ? "bg-white text-black"
                : "bg-white/5 text-white hover:bg-white/10"
            }`}
          >

            <BarChart3 size={18} />

            Bar Chart

          </button>

          {/* LINE */}

          <button
            onClick={() =>
              setShowLine(!showLine)
            }
            className={`flex items-center gap-3 rounded-2xl px-5 py-3 transition ${
              showLine
                ? "bg-white text-black"
                : "bg-white/5 text-white hover:bg-white/10"
            }`}
          >

            <LineChart size={18} />

            Line Chart

          </button>

          {/* PIE */}

          <button
            onClick={() =>
              setShowPie(!showPie)
            }
            className={`flex items-center gap-3 rounded-2xl px-5 py-3 transition ${
              showPie
                ? "bg-white text-black"
                : "bg-white/5 text-white hover:bg-white/10"
            }`}
          >

            <PieChart size={18} />

            Pie Chart

          </button>

        </div>

      </section>

      {/* CHARTS */}

      <section className="grid gap-6 lg:grid-cols-2">

        {showBar && (

          <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">

            <h3 className="text-xl font-semibold">

              Bar Chart

            </h3>

            <div className="mt-6 h-72 rounded-2xl bg-white/5" />

          </div>

        )}

        {showLine && (

          <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">

            <h3 className="text-xl font-semibold">

              Line Chart

            </h3>

            <div className="mt-6 h-72 rounded-2xl bg-white/5" />

          </div>

        )}

        {showPie && (

          <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6 lg:col-span-2">

            <h3 className="text-xl font-semibold">

              Pie Chart

            </h3>

            <div className="mt-6 h-80 rounded-2xl bg-white/5" />

          </div>

        )}

      </section>

    </main>
  );
}