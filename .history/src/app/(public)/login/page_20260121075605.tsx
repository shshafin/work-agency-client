"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthService } from "@/services/auth.service";
import FormInput from "@/components/form/FormInput";
import { toast } from "sonner";
import { LogIn, ShieldLock } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await AuthService.login(data);
      // টোকেন এবং ইউজার ডেটা সেট করা (এটি কুকিও সেট করে দেবে)
      setAuth(res.data.user, res.data.accessToken);

      toast.success("Login Successful!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A192F] px-4">
      <div className="w-full max-w-md bg-[#112240] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-yellow/10 rounded-2xl flex items-center justify-center text-brand-yellow mx-auto mb-4">
            <ShieldLock size={32} />
          </div>
          <h1 className="text-3xl font-black text-white italic">
            Admin Portal
          </h1>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-6">
            <FormInput
              name="email"
              label="Admin Email"
              placeholder="admin@er-ett.com"
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
            />
            <button
              disabled={loading}
              className="w-full py-4 bg-brand-yellow text-brand-blue font-black rounded-xl hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? "Authenticating..." : "Login to Dashboard"}{" "}
              <LogIn size={20} />
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LoginPage;
