"use client";

import { useEffect, useRef, useState } from "react";

import {
  Bell,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import { useRouter } from "next/navigation";

export default function Navbar() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  // GET USER

  useEffect(() => {

    const getUser = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {

        setEmail(user.email || "");
      }
    };

    getUser();

  }, []);

  // CLOSE DROPDOWN OUTSIDE CLICK

  useEffect(() => {

    const handleClickOutside = (
      event: MouseEvent
    ) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {

        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  // LOGOUT

  const handleLogout = async () => {

    await supabase.auth.signOut();

    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-400">
          Analyze your uploaded datasets
        </p>

      </div>

      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}

        <button className="rounded-full border border-white/10 bg-[#0f172a] p-3 hover:bg-white/10 transition">

          <Bell size={20} />

        </button>

        {/* PROFILE */}

        <div
          className="relative"
          ref={dropdownRef}
        >

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-2 hover:bg-white/10 transition"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">

              <User size={18} />

            </div>

            <div className="hidden text-left md:block">

              <p className="text-sm font-medium">
                My Account
              </p>

              <span className="text-xs text-gray-400">

                {email}

              </span>

            </div>

            <ChevronDown size={16} />

          </button>

          {/* DROPDOWN */}

          {open && (

            <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-white/10 bg-[#0f172a] p-3 shadow-2xl">

              <div className="border-b border-white/10 pb-3">

                <p className="text-sm font-medium">
                  Signed in as
                </p>

                <p className="mt-1 text-xs text-gray-400 break-all">

                  {email}

                </p>

              </div>

              <div className="mt-3 space-y-2">

                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-white/10 transition">

                  <User size={16} />

                  Profile

                </button>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
                >

                  <LogOut size={16} />

                  Logout

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}