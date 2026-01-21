"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { JobService } from "@/services/JobService";
import FormInput from "@/components/forms/FormInput";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const jobSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  title: z.string().min(1, "Title is required"),
  sector: z.enum([
    "Agriculture",
    "Construction",
    "Logistics",
    "HoReCa",
    "Production",
    "Others",
  ]),
  location: z.string().min(1, "Location is required"),
  jobType: z.enum(["Full-time", "Temporary", "Contract"]),
  salary: z.string().min(1, "Salary is required"),
  description: z.string().min(1, "Description is required"),
  requirements: z.array(z.object({ value: z.string().min(1, "Required") })),
  benefits: z.object({
    accommodation: z.boolean().default(false),
    transport: z.boolean().default(false),
    insurance: z.boolean().default(false),
    meals: z.boolean().default(false),
  }),
  status: z.enum(["active", "closed"]),
});

const EditJob = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(jobSchema),
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: methods.control,
    name: "requirements",
  });

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await JobService.getSingleJob(id as string);
        const jobData = res.data;

        // ফর্ম ভ্যালু সেট করা
        methods.reset({
          ...jobData,
          requirements: jobData.requirements.map((r: string) => ({ value: r })),
        });
      } catch (error) {
        toast.error("Failed to load job details");
        router.push("/dashboard/jobs");
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id, methods, router]);

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      requirements: data.requirements.map((r: any) => r.value),
    };

    setSubmitting(true);
    try {
      await JobService.updateJob(id as string, payload);
      toast.success("Job updated successfully!");
      router.push("/dashboard/jobs");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2
          className="animate-spin text-brand-yellow"
          size={40}
        />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/jobs"
          className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-brand-blue transition-all">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-3xl font-black text-brand-blue tracking-tighter italic uppercase">
          Edit Job Post
        </h1>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-8">
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-brand-blue flex items-center gap-2">
                <CheckCircle2 className="text-brand-yellow" /> Basic Information
              </h2>
              <select
                {...methods.register("status")}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none border-none ${methods.watch("status") === "active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                name="jobId"
                label="Job ID"
                placeholder="Unique ID"
              />
              <FormInput
                name="title"
                label="Job Title"
                placeholder="Construction Worker"
              />
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-400">
                  Sector
                </label>
                <select
                  {...methods.register("sector")}
                  className="p-4 bg-gray-50 border-none rounded-2xl font-bold text-brand-blue outline-none">
                  {[
                    "Agriculture",
                    "Construction",
                    "Logistics",
                    "HoReCa",
                    "Production",
                    "Others",
                  ].map((s) => (
                    <option
                      key={s}
                      value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <FormInput
                name="location"
                label="Location"
                placeholder="Lisbon, Portugal"
              />
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-brand-blue flex items-center gap-2">
              <CheckCircle2 className="text-brand-yellow" /> Benefits Included
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["accommodation", "transport", "insurance", "meals"].map((b) => (
                <label
                  key={b}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-brand-yellow/10 transition-all">
                  <input
                    type="checkbox"
                    {...methods.register(`benefits.${b}` as any)}
                    className="w-5 h-5 accent-brand-blue"
                  />
                  <span className="text-xs font-black uppercase text-brand-blue">
                    {b}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Requirements Section */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-brand-blue">
                Update Requirements
              </h2>
              <button
                type="button"
                onClick={() => append({ value: "" })}
                className="p-2 bg-brand-blue text-white rounded-lg">
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-2">
                  <input
                    {...methods.register(`requirements.${index}.value` as any)}
                    className="flex-1 p-4 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none"
                    placeholder="Requirement"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-400 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            disabled={submitting}
            className="w-full py-5 bg-brand-blue text-white font-black rounded-[2rem] flex items-center justify-center gap-2 hover:bg-brand-yellow hover:text-brand-blue transition-all">
            {submitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={20} />
            )}{" "}
            Update Job Details
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditJob;
