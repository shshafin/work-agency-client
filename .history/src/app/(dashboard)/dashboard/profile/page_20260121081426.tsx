"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { Save, Lock, User as UserIcon, Camera, Loader2 } from "lucide-react";
import { UserService } from "@/services/UserService";
import { AuthService } from "@/services/AuthService";
import FormInput from "@/components/forms/FormInput";

// Validation Schemas
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
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
    defaultValues: { name: user?.name || "", image: user?.image || "" },
  });

  const passwordMethods = useForm({
    resolver: zodResolver(passwordSchema),
  });

  // ১. জেনারেল প্রোফাইল আপডেট (Name)
  const onUpdateProfile = async (data: any) => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const res = await UserService.updateUser(user.userId, data); // userId stored in JWT payload
      setAuth(res.data, token!); // Zustand আপডেট করা
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ২. পাসওয়ার্ড আপডেট
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-brand-blue tracking-tighter italic uppercase">
            Account Settings
          </h1>
          <p className="text-gray-400 font-medium">
            Manage your professional identity and security.
          </p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-100 pb-1">
        {["general", "security"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-black uppercase tracking-widest transition-all relative ${
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Mini Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm text-center sticky top-24">
            <div className="relative w-32 h-32 mx-auto mb-6 group">
              <div className="w-full h-full bg-brand-blue rounded-4xl flex items-center justify-center text-brand-yellow text-5xl font-black shadow-2xl">
                {user?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-2 right-2 p-3 bg-brand-yellow text-brand-blue rounded-2xl shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>
            <h3 className="text-2xl font-black text-brand-blue">
              {user?.name || "Admin"}
            </h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">
              {user?.role?.replace("_", " ")}
            </p>
          </div>
        </div>

        {/* Right: Forms */}
        <div className="lg:col-span-2">
          {activeTab === "general" ? (
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                <UserIcon
                  className="text-brand-yellow"
                  size={24}
                />
                <h2 className="text-2xl font-black text-brand-blue tracking-tight">
                  Personal Information
                </h2>
              </div>
              <FormProvider {...profileMethods}>
                <form
                  onSubmit={profileMethods.handleSubmit(onUpdateProfile)}
                  className="space-y-8">
                  <FormInput
                    name="name"
                    label="Display Name"
                    placeholder="Your Name"
                  />
                  <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Email Address
                    </p>
                    <p className="text-brand-blue font-bold">
                      {user?.email}{" "}
                      <span className="ml-2 text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full uppercase">
                        Verified
                      </span>
                    </p>
                  </div>
                  <button
                    disabled={loading}
                    className="w-full md:w-auto px-10 py-4 bg-brand-blue text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-yellow hover:text-brand-blue transition-all disabled:opacity-50">
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Save size={20} />
                    )}{" "}
                    Update Profile
                  </button>
                </form>
              </FormProvider>
            </div>
          ) : (
            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-10">
                <Lock
                  className="text-brand-yellow"
                  size={24}
                />
                <h2 className="text-2xl font-black text-brand-blue tracking-tight">
                  Password & Security
                </h2>
              </div>
              <FormProvider {...passwordMethods}>
                <form
                  onSubmit={passwordMethods.handleSubmit(onChangePassword)}
                  className="space-y-8">
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
                  <button
                    disabled={loading}
                    className="w-full md:w-auto px-10 py-4 bg-brand-blue text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-yellow hover:text-brand-blue transition-all disabled:opacity-50">
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Save size={20} />
                    )}{" "}
                    Change Password
                  </button>
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
