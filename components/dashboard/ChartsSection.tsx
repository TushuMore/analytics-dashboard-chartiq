"use client";

import {

  ResponsiveContainer,

  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,

  LineChart,
  Line,

  PieChart,
  Pie,
  Cell,

} from "recharts";

type ChartsSectionProps = {

  data: any[];

  showBar: boolean;

  showLine: boolean;

  showPie: boolean;
};

export default function ChartsSection({

  data,

  showBar,
  showLine,
  showPie,

}: ChartsSectionProps) {

  // NO DATA

  if (!data.length) return null;

  // GET COLUMNS

  const columns =
    Object.keys(data[0]);

  // FIND NUMERIC COLUMN

 const numericColumn =
  columns.find((column) => {

    return data.some((row) => {

      const value = row[column];

      return !isNaN(Number(value));

    });

  });
  // FIRST COLUMN FOR LABELS

  const labelColumn =
    columns[0];

  // IF NO NUMERIC DATA

  if (!numericColumn) {

    return (

      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">

        No numeric columns found for charts.

      </div>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-2">

      {/* BAR CHART */}

      {showBar && (

        <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">

          <h3 className="text-xl font-semibold">

            Bar Chart

          </h3>

          <div className="mt-6 h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={data}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey={labelColumn} />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey={numericColumn}
                  fill="#ffffff"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      )}

      {/* LINE CHART */}

      {showLine && (

        <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">

          <h3 className="text-xl font-semibold">

            Line Chart

          </h3>

          <div className="mt-6 h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={data}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey={labelColumn} />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey={numericColumn}
                  stroke="#ffffff"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      )}

      {/* PIE CHART */}

      {showPie && (

        <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-6 lg:col-span-2">

          <h3 className="text-xl font-semibold">

            Pie Chart

          </h3>

          <div className="mt-6 h-96">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={data}
                  dataKey={numericColumn}
                  nameKey={labelColumn}
                  outerRadius={140}
                  fill="#ffffff"
                  label
                >

                  {data.map(
                    (_, index) => (

                      <Cell
                        key={index}
                        fill={`hsl(${
                          index * 40
                        }, 70%, 60%)`}
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      )}

    </section>
  );
}