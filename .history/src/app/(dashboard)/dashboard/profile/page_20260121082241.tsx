"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { Save, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { UserService } from "@/services/UserService";
import { AuthService } from "@/services/AuthService";
import FormInput from "@/components/forms/FormInput";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

const passwordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: z.string().min(6, "Must be at least 6 characters"),
});

const MyProfile = () => {
  const { user, setAuth, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const profileMethods = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const passwordMethods = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onUpdateProfile = async (data: any) => {
    // চেক করে নিচ্ছি ইউজার বা আইডি নাল কি না
    if (!user || !user.userId) {
      toast.error("User session not found. Please login again.");
      return;
    }

    setLoading(true);
    try {
      // user.userId এখন টোকেন থেকে আসবে
      const res = await UserService.updateUser(user.userId, data);

      if (res.success) {
        // নতুন ডাটা দিয়ে স্টোর আপডেট করা
        // নোট: ব্যাকএন্ড থেকে আসা ডাটা আর টোকেনের ডাটা মার্জ করা ভালো
        const updatedUser = { ...user, ...res.data };
        setAuth(updatedUser, token!);
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async (data: any) => {
    setLoading(true);
    try {
      await AuthService.changePassword(data);
      toast.success("Password changed successfully!");
      passwordMethods.reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to change password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-brand-blue tracking-tighter italic uppercase">
          Account Settings
        </h1>
        <p className="text-gray-400 font-medium">
          Manage your personal details and security.
        </p>
      </div>

      <div className="flex gap-4 border-b border-gray-100">
        {["general", "security"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${
              activeTab === tab
                ? "text-brand-blue"
                : "text-gray-400 hover:text-brand-blue"
            }`}>
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-yellow rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form Sections */}
        <div className="lg:col-span-2">
          {activeTab === "general" ? (
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                <UserIcon
                  className="text-brand-yellow"
                  size={24}
                />
                <h2 className="text-2xl font-black text-brand-blue tracking-tight">
                  Basic Info
                </h2>
              </div>

              <FormProvider {...profileMethods}>
                <form
                  onSubmit={profileMethods.handleSubmit(onUpdateProfile)}
                  className="space-y-6">
                  <FormInput
                    name="name"
                    label="Full Name"
                    placeholder="Enter name"
                  />
                  <FormInput
                    name="email"
                    label="Email Address"
                    placeholder="Email"
                  />
                  <div className="pt-4">
                    <button
                      disabled={loading}
                      className="w-full md:w-auto px-10 py-4 bg-brand-blue text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-yellow hover:text-brand-blue transition-all disabled:opacity-50 shadow-lg shadow-brand-blue/10">
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Save size={20} />
                      )}
                      Save Profile
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          ) : (
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                <Lock
                  className="text-brand-yellow"
                  size={24}
                />
                <h2 className="text-2xl font-black text-brand-blue tracking-tight">
                  Change Password
                </h2>
              </div>

              <FormProvider {...passwordMethods}>
                <form
                  onSubmit={passwordMethods.handleSubmit(onChangePassword)}
                  className="space-y-6">
                  <FormInput
                    name="oldPassword"
                    label="Current Password"
                    type="password"
                    placeholder="••••••••"
                  />
                  <FormInput
                    name="newPassword"
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                  />
                  <div className="pt-4">
                    <button
                      disabled={loading}
                      className="w-full md:w-auto px-10 py-4 bg-brand-blue text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-yellow hover:text-brand-blue transition-all disabled:opacity-50">
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Save size={20} />
                      )}
                      Update Security
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
