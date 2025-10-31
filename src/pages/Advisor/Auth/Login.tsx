import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import SendRequest from "@/components/Tools/SendRequest";
import { advisorName, advisorUrl } from "@/app";
import { guestCheck } from "@/components/Tools/Misc";

export default function Login({auth}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // guestCheck(auth)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head title="Login" />
      <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome back 👋</h1>
        <p className="text-gray-400 mb-6">Login to your {advisorName} dashboard</p>

        <form className="w-full max-w-md space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full bg-[#1b1b1b] border border-gray-600 rounded px-4 py-2"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-[#1b1b1b] border border-gray-600 rounded px-4 py-2"
          />

          <SendRequest
            url="/login"
            method="post"
            data={form}
            className="w-full"
            redirect={true}
            onResponse={() => {}}
            text="Login"
          />
        </form>

        <p className="text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link href={`${advisorUrl}/register`} className="underline text-[#00FFD1]">
            Register
          </Link>
        </p>
      </div>
    </>
  );
}
