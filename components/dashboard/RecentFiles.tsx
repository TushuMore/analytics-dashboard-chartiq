"use client";

import { Trash2 } from "lucide-react";

import { supabase } from "@/lib/supabase";

import { Dataset } from "@/types/dataset";

type RecentFilesProps = {

  datasets: Dataset[];

  setDatasets: React.Dispatch<
    React.SetStateAction<Dataset[]>
  >;

  setSelectedData: React.Dispatch<
    React.SetStateAction<any[]>
  >;
};

export default function RecentFiles({

  datasets,
  setDatasets,
  setSelectedData,

}: RecentFilesProps) {

  // DELETE DATASET

  const handleDelete = async (
    id: string
  ) => {

    const confirmed = window.confirm(
      "Delete this dataset permanently?"
    );

    if (!confirmed) return;

    // DELETE FROM DATABASE

    const { error } =
      await supabase
        .from("datasets")
        .delete()
        .eq("id", id);

    // ERROR

    if (error) {

      console.log(error);

      alert("Delete failed");

      return;
    }

    // UPDATE UI

    const updatedDatasets =
      datasets.filter(
        (dataset) =>
          String(dataset.id) !==
          String(id)
      );

    setDatasets(updatedDatasets);

    // UPDATE TABLE DATA

    if (
      updatedDatasets.length > 0
    ) {

      setSelectedData(
        updatedDatasets[0].data
      );

    } else {

      setSelectedData([]);
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-[#0f172a] p-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-xl font-semibold">

            Recent Uploads

          </h3>

          <p className="mt-1 text-sm text-gray-400">

            Recently uploaded datasets

          </p>

        </div>

        <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">

          {datasets.length} Files

        </span>

      </div>

      {/* EMPTY STATE */}

      {datasets.length === 0 && (

        <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-10 text-center">

          <p className="text-gray-400">

            No datasets uploaded yet

          </p>

        </div>

      )}

      {/* DATASETS */}

      <div className="mt-6 space-y-4">

        {datasets.map((dataset) => (

          <div
            key={dataset.id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
          >

            {/* LEFT */}

            <button
              onClick={() =>
                setSelectedData(
                  dataset.data
                )
              }
              className="flex-1 text-left"
            >

              <p className="font-medium text-white">

                {dataset.file_name}

              </p>

              <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">

                <span>

                  {dataset.created_at
                    ? new Date(
                        dataset.created_at
                      ).toLocaleDateString()
                    : "Unknown"}

                </span>

                <span>

                  {dataset.data.length} rows

                </span>

              </div>

            </button>

            {/* DELETE BUTTON */}

            <button
              onClick={() =>
                handleDelete(
                  String(dataset.id)
                )
              }
              className="ml-4 rounded-xl p-3 text-red-400 transition hover:bg-red-500/10"
            >

              <Trash2 size={18} />

            </button>

          </div>

        ))}

      </div>

    </section>
  );
}