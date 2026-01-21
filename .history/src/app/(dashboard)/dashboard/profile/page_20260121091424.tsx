"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { Save, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { UserService } from "@/services/UserService";
import { AuthService } from "@/services/AuthService";
import FormInput from "@/components/forms/FormInput";

// Validation Schemas
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

  const isSuperAdmin = user?.role === "super_admin";
  const tabs = isSuperAdmin ? ["general", "security"] : ["general"];

  useEffect(() => {
    if (!isSuperAdmin && activeTab === "security") {
      setActiveTab("general");
    }
  }, [isSuperAdmin, activeTab]);

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
    const targetId = user?.userId || user?._id;
    if (!targetId) {
      toast.error("User ID not found. Please re-login.");
      return;
    }

    setLoading(true);
    try {
      const res = await UserService.updateUser(targetId, data);
      if (res.success) {
        const updatedUser = { ...user, ...res.data };
        setAuth(updatedUser, token!);
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-brand-blue tracking-tighter italic uppercase">
          Account Settings
        </h1>
        <p className="text-gray-400 font-medium">
          Manage your personal details {isSuperAdmin && "and security"}.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100">
        {tabs.map((tab) => (
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

      {/* Content Section */}
      <div className="w-full">
        {activeTab === "general" ? (
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm transition-all duration-300">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-brand-yellow/10 rounded-2xl text-brand-yellow">
                <UserIcon size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-brand-blue tracking-tight leading-none">
                  Basic Information
                </h2>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">
                  Public ID: {user?.role?.replace("_", " ")}
                </p>
              </div>
            </div>

            <FormProvider {...profileMethods}>
              <form
                onSubmit={profileMethods.handleSubmit(onUpdateProfile)}
                className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    name="name"
                    label="Full Name"
                    placeholder="Enter your name"
                  />
                  <FormInput
                    name="email"
                    label="Email Address"
                    placeholder="admin@example.com"
                  />
                </div>

                <div className="pt-4 border-t border-gray-50 flex justify-end">
                  <button
                    disabled={loading}
                    className="w-full md:w-auto px-12 py-4 bg-brand-blue text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-yellow hover:text-brand-blue transition-all disabled:opacity-50 shadow-lg shadow-brand-blue/10">
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Save size={20} />
                    )}
                    Update Profile
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        ) : (
          isSuperAdmin && (
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-brand-yellow/10 rounded-2xl text-brand-yellow">
                  <Lock size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-brand-blue tracking-tight leading-none">
                    Security & Privacy
                  </h2>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">
                    Last password change: Recently
                  </p>
                </div>
              </div>

              <FormProvider {...passwordMethods}>
                <form
                  onSubmit={passwordMethods.handleSubmit(onChangePassword)}
                  className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex justify-end">
                    <button
                      disabled={loading}
                      className="w-full md:w-auto px-12 py-4 bg-brand-blue text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-yellow hover:text-brand-blue transition-all disabled:opacity-50 shadow-lg shadow-brand-blue/10">
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
          )
        )}
      </div>
    </div>
  );
};

export default MyProfile;
