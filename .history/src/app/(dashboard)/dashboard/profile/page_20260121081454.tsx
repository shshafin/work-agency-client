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

// Frontend Validation (Backend এর সাথে মিল রেখে)
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

  // ১. প্রোফাইল আপডেট (Name & Email)
  const onUpdateProfile = async (data: any) => {
    // তোর ব্যাকএন্ড "body" অবজেক্টের ভেতরে ডেটা খুঁজে, তাই আমরা এখানে wrap করছি
    const payload = { body: data };

    setLoading(true);
    try {
      // আমরা JWT থেকে আসা userId ইউজ করছি
      const res = await UserService.updateUser(user.userId, data);

      // Zustand আপডেট (যাতে ড্যাশবোর্ডে নাম সাথে সাথে চেঞ্জ হয়)
      setAuth(res.data, token!);
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
      <div>
        <h1 className="text-4xl font-black text-brand-blue tracking-tighter italic uppercase">
          My Account
        </h1>
        <p className="text-gray-400 font-medium">
          Update your profile information and security settings.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100 pb-1">
        {["general", "security"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${
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
        {/* Left: Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm text-center">
            <div className="w-24 h-24 bg-brand-blue rounded-[2rem] flex items-center justify-center text-brand-yellow text-4xl font-black mx-auto mb-6 shadow-xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-xl font-black text-brand-blue truncate">
              {user?.name}
            </h3>
            <p className="text-[10px] font-black text-brand-yellow bg-brand-blue px-3 py-1 rounded-full uppercase inline-block mt-2 tracking-widest">
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
                  General Information
                </h2>
              </div>

              <FormProvider {...profileMethods}>
                <form
                  onSubmit={profileMethods.handleSubmit(onUpdateProfile)}
                  className="space-y-6">
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

                  <div className="pt-4">
                    <button
                      disabled={loading}
                      className="w-full md:w-auto px-10 py-4 bg-brand-blue text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-yellow hover:text-brand-blue transition-all disabled:opacity-50">
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Save size={20} />
                      )}
                      Save Changes
                    </button>
                  </div>
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
                  Security & Password
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
                      Update Password
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
