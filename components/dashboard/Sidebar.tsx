"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Database,
  BarChart3,
  Settings,
} from "lucide-react";

const links = [

  {
    label: "Dashboard",

    href: "/dashboard",

    icon: LayoutDashboard,
  },

  {
    label: "Datasets",

    href: "/dashboard/datasets",

    icon: Database,
  },

  {
    label: "Analytics",

    href: "/dashboard/analytics",

    icon: BarChart3,
  },

  {
    label: "Settings",

    href: "/dashboard/settings",

    icon: Settings,
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (
    <aside className="hidden w-72 border-r border-white/10 bg-[#0b1120] p-6 lg:block">

      {/* LOGO */}

      <div>

        <h1 className="text-3xl font-bold text-white">

          Vizora

        </h1>

        <p className="mt-2 text-sm text-gray-400">

          AI Data Visualization SaaS

        </p>

      </div>

      {/* NAVIGATION */}

      <nav className="mt-10 space-y-2">

        {links.map((link) => {

          const Icon = link.icon;

          const active =
            pathname === link.href;

          return (

            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 rounded-2xl px-4 py-3 transition ${
                active
                  ? "bg-white text-black"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >

              <Icon size={20} />

              <span className="font-medium">

                {link.label}

              </span>

            </Link>
          );
        })}

      </nav>

    </aside>
  );
}