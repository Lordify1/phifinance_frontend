// LoginPage.tsx
import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-toastify";
import axiosClient from "@/axiosClient";
import SendRequest from "@/components/Tools/SendRequest"

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  

  

  

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white px-6">
      <Head title="Admin Login"/>
      <div className="w-full max-w-md bg-[#111111] border border-[#1f1f1f] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded"
            />
          </div>
          <SendRequest
            url="/login"
            method="post"
            data={form}
            className="w-full"
            redirect={true}
            onResponse={(res: any) => console.log(res)}
            text="Login"
          />
        </form>
      </div>
    </div>
  );
};


export default AdminLogin