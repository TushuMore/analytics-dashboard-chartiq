"use client";

import {
  BarChart3,
  LineChart,
  PieChart,
} from "lucide-react";

type AnalyticsControlsProps = {

  showBar: boolean;

  setShowBar: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  showLine: boolean;

  setShowLine: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  showPie: boolean;

  setShowPie: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function AnalyticsControls({

  showBar,
  setShowBar,

  showLine,
  setShowLine,

  showPie,
  setShowPie,

}: AnalyticsControlsProps) {

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-semibold text-white">

            Analytics Controls

          </h2>

          <p className="mt-2 text-sm text-gray-400">

            Enable or disable charts dynamically

          </p>

        </div>

      </div>

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
  );
}