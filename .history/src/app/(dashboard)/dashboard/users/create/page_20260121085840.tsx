"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserService } from "@/services/UserService";
import FormInput from "@/components/forms/FormInput";
import { toast } from "sonner";
import { UserPlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be 6+ characters"),
  role: z.enum(["admin", "super_admin"]),
});

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: { role: "admin" },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await UserService.createUser(data);
      toast.success("New Team Member Added!");
      router.push("/dashboard/users");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-black text-brand-blue tracking-tighter italic uppercase">
        Add Team Member
      </h1>
      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-6">
            <FormInput
              name="name"
              label="Full Name"
              placeholder="John Doe"
            />
            <FormInput
              name="email"
              label="Email Address"
              placeholder="admin@example.com"
            />
            <FormInput
              name="password"
              label="Initial Password"
              type="password"
              placeholder="••••••••"
            />

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-brand-blue uppercase tracking-widest">
                Assign Role
              </label>
              <select
                {...methods.register("role")}
                className="p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-yellow outline-none font-bold text-brand-blue">
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

            <button
              disabled={loading}
              className="w-full py-5 bg-brand-yellow text-brand-blue font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-blue hover:text-white transition-all">
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <UserPlus size={20} />
              )}{" "}
              Create Member
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateUser;
