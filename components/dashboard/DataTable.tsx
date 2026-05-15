type DataTableProps = {
  data: any[];
};

export default function DataTable({
  data,
}: DataTableProps) {

  if (!data.length) return null;

  const columns =
    Object.keys(data[0]);

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">

      <div className="flex items-center justify-between">

        <h3 className="text-xl font-semibold">

          Dataset Preview

        </h3>

        <span className="text-sm text-gray-400">

          {data.length} rows

        </span>

      </div>

      {/* TABLE CONTAINER */}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">

        {/* VERTICAL SCROLL */}

        <div className="max-h-[500px] overflow-y-auto">

          <table className="w-full min-w-[800px]">

            {/* HEADER */}

            <thead className="sticky top-0 z-10 bg-[#111827]">

              <tr>

                {columns.map((column) => (

                  <th
                    key={column}
                    className="whitespace-nowrap border-b border-white/10 px-4 py-3 text-left text-sm font-semibold text-white"
                  >

                    {column}

                  </th>

                ))}

              </tr>

            </thead>

            {/* BODY */}

            <tbody>

              {data.map((row, index) => (

                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >

                  {columns.map((column) => (

                    <td
                      key={column}
                      className="whitespace-nowrap px-4 py-3 text-sm text-gray-300"
                    >

                      {String(
                        row[column]
                      )}

                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
}