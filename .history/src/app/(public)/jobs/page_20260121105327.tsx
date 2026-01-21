
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { JobService } from "@/services/JobService";
import {
  MapPin,
  Briefcase,
  Search,
  ArrowRight,
  Loader2,
  Filter,
  Euro,
} from "lucide-react";
import Link from "next/link";

// মেইন কন্টেন্ট কম্পোনেন্ট
const BrowseJobsContent = () => {
  const searchParams = useSearchParams();
  const initialSector = searchParams.get("sector") || "";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState(initialSector);

  const sectors = [
    "Agriculture",
    "Construction",
    "Logistics",
    "HoReCa",
    "Production",
    "Others",
  ];

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const query: any = {};
      if (searchTerm.trim()) query.searchTerm = searchTerm;
      if (selectedSector) query.sector = selectedSector;

      const res = await JobService.getActiveJobs(query);
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedSector]);

  useEffect(() => {
    const delay = setTimeout(() => fetchJobs(), 500);
    return () => clearTimeout(delay);
  }, [fetchJobs]);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <h1 className="text-5xl font-black text-brand-blue tracking-tighter italic uppercase leading-[0.9]">
            Find Your <br />{" "}
            <span className="text-brand-yellow">Dream Career</span>
          </h1>
          <p className="text-gray-500 mt-6 font-medium text-lg">
            Browse through our latest job openings in Europe and take the next
            step in your professional life.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12 bg-white p-4 rounded-[2.5rem] shadow-xl shadow-brand-blue/5 border border-gray-100">
          <div className="flex-1 relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search job title, location..."
              className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-[1.8rem] outline-none text-brand-blue font-bold"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="lg:w-64 relative">
            <Filter
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              value={selectedSector}
              className="w-full pl-14 pr-10 py-5 bg-gray-50 border-none rounded-[1.8rem] outline-none text-brand-blue font-bold appearance-none cursor-pointer"
              onChange={(e) => setSelectedSector(e.target.value)}>
              <option value="">All Sectors</option>
              {sectors.map((s) => (
                <option
                  key={s}
                  value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Job List Display */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2
              className="animate-spin text-brand-yellow"
              size={50}
            />
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job: any) => (
              <Link
                key={job._id}
                href={`/jobs/${job._id}`}
                className="group bg-white p-8 rounded-[3rem] border border-gray-100 hover:border-brand-yellow hover:shadow-2xl hover:shadow-brand-blue/10 transition-all flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                  <span className="px-4 py-1.5 bg-brand-light text-brand-blue text-[10px] font-black uppercase rounded-full tracking-widest">
                    {job.sector}
                  </span>
                  <div className="flex items-center gap-1 text-brand-blue font-black italic">
                    <Euro
                      size={16}
                      className="text-brand-yellow"
                    />{" "}
                    {job.salary}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-brand-blue leading-tight mb-6 group-hover:text-brand-yellow transition-colors">
                  {job.title}
                </h3>
                <div className="space-y-4 mb-8 text-gray-400 font-bold text-sm">
                  <div className="flex items-center gap-3">
                    <MapPin
                      size={18}
                      className="text-brand-yellow"
                    />{" "}
                    {job.location}
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase
                      size={18}
                      className="text-brand-yellow"
                    />{" "}
                    {job.jobType}
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                  <span className="text-[10px] font-black uppercase text-gray-300 tracking-[0.2em]">
                    REF: {job.jobId}
                  </span>
                  <div className="p-4 bg-gray-50 rounded-2xl text-brand-blue group-hover:bg-brand-yellow transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-gray-100">
            <h3 className="text-2xl font-black text-brand-blue uppercase italic">
              No Jobs Found!
            </h3>
            <p className="text-gray-400 mt-2 font-medium">
              Try changing your search keywords or sector filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Suspense Wrapper
const BrowseJobs = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Loader2
            className="animate-spin text-brand-yellow"
            size={50}
          />
        </div>
      }>
      <BrowseJobsContent />
    </Suspense>
  );
};

export default BrowseJobs;
