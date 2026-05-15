"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSignup = async () => {

    setLoading(true);

    const { error } =
      await supabase.auth.signUp({

        email,
        password,
      });

    setLoading(false);

    if (error) {

      alert(error.message);

      return;
    }

    alert(
      "Signup successful! Please login."
    );

    router.push("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020617] p-6 text-white">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f172a] p-8">

        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-gray-400">
          Start using your analytics SaaS
        </p>

        <div className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 font-medium text-black transition hover:opacity-90"
          >

            {loading
              ? "Creating Account..."
              : "Sign Up"}

          </button>

        </div>

      </div>

    </main>
  );
}