"use client";

import { UploadCloud } from "lucide-react";

import Papa from "papaparse";

import * as XLSX from "xlsx";

import { supabase } from "@/lib/supabase";

import { Dataset } from "@/types/dataset";

type UploadCardProps = {

  setDatasets: React.Dispatch<
    React.SetStateAction<Dataset[]>
  >;

  setSelectedData: React.Dispatch<
    React.SetStateAction<any[]>
  >;
};

export default function UploadCard({

  setDatasets,
  setSelectedData,

}: UploadCardProps) {

  // SAVE DATASET

  const saveDataset = async (

    fileName: string,

    data: any[]

  ) => {

    // GET CURRENT USER

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      alert("Please login");

      return;
    }

    // SAVE TO DATABASE

    const {
      data: insertedData,
      error,
    } = await supabase
      .from("datasets")
      .insert([
        {
          user_id: user.id,

          file_name: fileName,

          data,
        },
      ])
      .select()
      .single();

    if (error) {

      console.log(error);

      alert("Upload failed");

      return;
    }

    // UPDATE UI

    setDatasets((prev) => [
      insertedData,
      ...prev,
    ]);

    setSelectedData(data);
  };

  // FORMAT DATA

  const formatData = (
    rawData: any[]
  ) => {

    return rawData.map((row) => {

      const newRow: any = {};

      Object.keys(row).forEach(
        (key) => {

          const value = row[key];

          // CONVERT NUMERIC STRINGS

          const numericValue =
            Number(value);

          newRow[key] =
            !isNaN(numericValue) &&
            value !== ""
              ? numericValue
              : value;
        }
      );

      return newRow;
    });
  };

  // FILE UPLOAD

  const handleFileUpload = (

    event: React.ChangeEvent<HTMLInputElement>

  ) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase();

    // CSV FILE

    if (extension === "csv") {

      Papa.parse(file, {

        header: true,

        skipEmptyLines: true,

        complete: (results) => {

          const formattedData =
            formatData(
              results.data as any[]
            );

          saveDataset(
            file.name,
            formattedData
          );
        },
      });
    }

    // EXCEL FILE

    else if (

      extension === "xlsx" ||

      extension === "xls"

    ) {

      const reader =
        new FileReader();

      reader.onload = (e) => {

        const data =
          e.target?.result;

        const workbook =
          XLSX.read(data, {
            type: "binary",
          });

        const sheetName =
          workbook.SheetNames[0];

        const worksheet =
          workbook.Sheets[sheetName];

        const jsonData =
          XLSX.utils.sheet_to_json(
            worksheet,
            {
              raw: false,
            }
          );

        const formattedData =
          formatData(
            jsonData as any[]
          );

        saveDataset(
          file.name,
          formattedData
        );
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <section className="rounded-3xl border border-dashed border-white/20 bg-[#0f172a] p-10 text-center">

      <div className="flex justify-center">

        <div className="rounded-full bg-white/10 p-5">

          <UploadCloud size={40} />

        </div>

      </div>

      <h3 className="mt-5 text-2xl font-semibold">

        Upload CSV or Excel File

      </h3>

      <p className="mt-2 text-gray-400">

        Upload datasets for visualization

      </p>

      <label className="mt-6 inline-block cursor-pointer rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90">

        Choose File

        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={handleFileUpload}
        />

      </label>

    </section>
  );
}