"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type AutoChartsProps = {
  data: any[];
};

export default function AutoCharts({
  data,
}: AutoChartsProps) {

  if (!data.length) return null;

  const columns = Object.keys(data[0]);

  // Find numeric column
  const numericColumn = columns.find((column) =>
    !isNaN(Number(data[0][column]))
  );

  // Find text column
  const textColumn = columns.find(
    (column) => column !== numericColumn
  );

  if (!numericColumn || !textColumn) {
    return (
      <div className="rounded-3xl bg-[#0f172a] p-6 border border-white/10">
        No valid chart data found
      </div>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-2">

      {/* BAR CHART */}

      <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">

        <h3 className="text-xl font-semibold mb-6">
          Bar Chart
        </h3>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={data}>

              <XAxis dataKey={textColumn} />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey={numericColumn}
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* LINE CHART */}

      <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">

        <h3 className="text-xl font-semibold mb-6">
          Line Chart
        </h3>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={data}>

              <XAxis dataKey={textColumn} />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey={numericColumn}
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* PIE CHART */}

      <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6 lg:col-span-2">

        <h3 className="text-xl font-semibold mb-6">
          Pie Chart
        </h3>

        <div className="h-96">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

               <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey={numericColumn}
          nameKey={textColumn}
          label
        />


              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </section>
  );
}