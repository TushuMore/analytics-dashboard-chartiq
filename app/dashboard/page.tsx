"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import UploadCard from "@/components/dashboard/UploadCard";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentFiles from "@/components/dashboard/RecentFiles";
import DataTable from "@/components/dashboard/DataTable";
import ChartsSection from "@/components/dashboard/ChartsSection";
import AnalyticsControls from "@/components/dashboard/AnalyticsControls";

import { supabase } from "@/lib/supabase";

import { useRouter } from "next/navigation";

import { Dataset } from "@/types/dataset";

export default function DashboardPage() {
  const router = useRouter();

  // DATASETS

  const [datasets, setDatasets] = useState<Dataset[]>([]);

  const [selectedData, setSelectedData] = useState<any[]>([]);

  // ANALYTICS CONTROLS

  const [showBar, setShowBar] = useState(true);

  const [showLine, setShowLine] = useState(true);

  const [showPie, setShowPie] = useState(false);

  // LOAD DATASETS

  useEffect(() => {
    const loadDatasets = async () => {
      // CHECK USER

      const {
        data: { user },
      } = await supabase.auth.getUser();

      // REDIRECT IF NOT LOGGED IN

      if (!user) {
        router.push("/login");

        return;
      }

      // FETCH DATASETS

      const { data, error } = await supabase
        .from("datasets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.log(error);

        return;
      }

      setDatasets(data);

      // AUTO SELECT FIRST DATASET

      if (data.length > 0) {
        setSelectedData(data[0].data);
      }
    };

    loadDatasets();
  }, [router]);

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <main className="flex-1 overflow-y-auto p-6">
        <Navbar />

        <div className="mt-6 space-y-6">
          {/* UPLOAD */}

          <UploadCard
            setDatasets={setDatasets}
            setSelectedData={setSelectedData}
          />

          {/* STATS */}

          <StatsCards />

          {/* DATA TABLE */}

          {selectedData.length > 0 && <DataTable data={selectedData} />}

          {/* ANALYTICS CONTROLS */}

          <AnalyticsControls
            showBar={showBar}
            setShowBar={setShowBar}
            showLine={showLine}
            setShowLine={setShowLine}
            showPie={showPie}
            setShowPie={setShowPie}
          />

          {/* CHART PREVIEW */}

          <ChartsSection
            data={selectedData}
            showBar={showBar}
            showLine={showLine}
            showPie={showPie}
          />

          {/* RECENT FILES */}

          <RecentFiles
            datasets={datasets}
            setSelectedData={setSelectedData}
            setDatasets={setDatasets}
          />
        </div>
      </main>
    </div>
  );
}
