"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { ContactService } from "@/services/ContactService";
import FormInput from "@/components/forms/FormInput";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await ContactService.createContact(data);
      setIsSuccess(true);
      toast.success("Connection established!");
      methods.reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Transmission failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-20 bg-brand-light relative overflow-hidden min-h-screen">
      {/* --- Aesthetic Background Elements --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30L30 0M30 30L60 30M30 30L30 60M30 30L0 30' stroke='%230A2647' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* --- Left Side: Content & Branding --- */}
          <div className="w-full lg:w-5/12 space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                <Sparkles
                  size={14}
                  className="text-brand-yellow animate-pulse"
                />
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.3em]">
                  Communication Hub
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black text-brand-blue leading-[0.85] tracking-tighter">
                Let&apos;s Build <br />
                <span className="text-brand-yellow italic">Bridges.</span>
              </motion.h1>

              <p className="text-slate-500 text-lg font-medium max-w-sm leading-relaxed border-l-4 border-brand-blue pl-6">
                Connect with Portugal&apos;s premier talent architects. We’re
                ready to scale your industrial vision.
              </p>
            </div>

            {/* Interactive Info Cards */}
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: <Mail size={20} />,
                  label: "Digital Mail",
                  val: "contact@er-ett.com",
                  color: "hover:border-blue-400",
                },
                {
                  icon: <Phone size={20} />,
                  label: "Direct Line",
                  val: "+351 920 019 186",
                  color: "hover:border-orange-400",
                },
                {
                  icon: <MapPin size={20} />,
                  label: "HQ Location",
                  val: "Sintra, Lisbon, Portugal",
                  color: "hover:border-emerald-400",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`group flex items-center gap-5 p-5 bg-white border border-slate-100 rounded-3xl transition-all duration-500 ${item.color} hover:shadow-xl hover:-translate-y-1`}>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest block mb-0.5">
                      {item.label}
                    </span>
                    <span className="text-base font-bold text-brand-blue">
                      {item.val}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- Right Side: The "Glorious" Form --- */}
          <div className="w-full lg:w-7/12 relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-brand-blue to-brand-yellow/30 rounded-[4rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />

            <motion.div
              layout
              className="relative bg-white border border-slate-100 p-8 md:p-12 rounded-[3.5rem] shadow-[0_30px_100px_-20px_rgba(10,38,71,0.1)] overflow-hidden">
              {/* Internal Form Background Decoration */}
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                <Send
                  size={200}
                  className="rotate-12"
                />
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-16 text-center space-y-8">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle
                        size={48}
                        className="animate-bounce"
                      />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-brand-blue mb-2">
                        Transmission Successful.
                      </h2>
                      <p className="text-slate-500 font-medium">
                        Our strategic team will respond within 24 operational
                        hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-brand-yellow font-black uppercase text-xs tracking-widest hover:underline">
                      Initialize New Session
                    </button>
                  </motion.div>
                ) : (
                  <FormProvider {...methods}>
                    <form
                      onSubmit={methods.handleSubmit(onSubmit)}
                      className="space-y-8 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group/input">
                          <FormInput
                            name="name"
                            label="Identifying Name"
                            placeholder="Full name"
                          />
                        </div>
                        <div className="group/input">
                          <FormInput
                            name="email"
                            label="Digital Address"
                            type="email"
                            placeholder="email@domain.com"
                          />
                        </div>
                      </div>

                      <FormInput
                        name="subject"
                        label="Inquiry Intent"
                        placeholder="Brief subject"
                      />

                      <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-mono font-black text-brand-blue uppercase tracking-widest ml-1">
                          Detailed Message
                        </label>
                        <textarea
                          {...methods.register("message")}
                          rows={4}
                          placeholder="Explain your requirements..."
                          className="w-full p-5 rounded-2xl border border-slate-100 bg-slate-50/50 text-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-yellow/20 focus:border-brand-yellow outline-none transition-all resize-none font-medium placeholder:text-slate-300 shadow-inner"
                        />
                        {methods.formState.errors.message && (
                          <span className="text-[10px] font-bold text-red-500 ml-2 italic">
                            {methods.formState.errors.message.message}
                          </span>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group/btn relative w-full py-6 bg-brand-blue text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs overflow-hidden transition-all active:scale-[0.98] shadow-2xl shadow-brand-blue/20">
                        <span className="relative z-10 flex items-center justify-center gap-4">
                          {isSubmitting
                            ? "Processing..."
                            : "Establish Connection"}
                          <ArrowRight
                            size={18}
                            className="group-hover/btn:translate-x-2 transition-transform"
                          />
                        </span>
                        <div className="absolute inset-0 bg-brand-yellow -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
                      </button>

                      {/* Professional Legal Footer */}
                      <p className="text-[9px] text-slate-300 text-center font-bold uppercase tracking-widest pt-4">
                        Secure Transmission &bull; GDPR Compliant &bull;
                        End-to-End Professional Privacy
                      </p>
                    </form>
                  </FormProvider>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
