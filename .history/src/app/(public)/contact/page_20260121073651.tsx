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
      toast.success("Sent!");
      methods.reset();
    } catch (error: any) {
      toast.error("Failed to send.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-24 pb-12 bg-brand-light min-h-screen font-sans">
      <div className="container mx-auto px-4 md:px-6">
        {/* --- Header Section --- */}
        <div className="mb-12 border-b border-slate-200 pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-brand-blue tracking-tighter">
            Contact <span className="text-brand-yellow">Us.</span>
          </motion.h1>
          <p className="text-slate-500 text-sm md:text-lg mt-2 max-w-xl font-medium">
            Ready to hire or looking for work? Send us a message and we will
            reply quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* --- Info Bar (Left) --- */}
          <div className="lg:col-span-4 space-y-3">
            {[
              {
                icon: <Mail size={18} />,
                label: "Email",
                val: "contact@er-ett.com",
              },
              {
                icon: <Phone size={18} />,
                label: "Phone",
                val: "+351 920 019 186",
              },
              {
                icon: <MapPin size={18} />,
                label: "Office",
                val: "Sintra, Lisbon, Portugal",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-lg hover:border-brand-yellow transition-colors shadow-sm">
                <div className="text-brand-blue">{item.icon}</div>
                <div>
                  <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {item.label}
                  </p>
                  <p className="text-sm md:text-base font-bold text-brand-blue">
                    {item.val}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --- Form Section (Right) --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
              <div className="bg-brand-blue py-3 px-6">
                <p className="text-[10px] font-mono font-bold text-white/70 uppercase tracking-[0.2em]">
                  Partner Inquiry Form
                </p>
              </div>

              <div className="p-6 md:p-10">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-10 text-center space-y-4">
                      <CheckCircle
                        size={48}
                        className="text-emerald-500 mx-auto"
                      />
                      <h2 className="text-2xl font-black text-brand-blue">
                        Message Sent!
                      </h2>
                      <p className="text-slate-500 text-sm">
                        We will contact you within 24 hours.
                      </p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="text-brand-yellow font-bold text-xs uppercase tracking-widest hover:underline">
                        Send New Message
                      </button>
                    </motion.div>
                  ) : (
                    <FormProvider {...methods}>
                      <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormInput
                            name="name"
                            label="Your Name"
                            placeholder="Full name"
                          />
                          <FormInput
                            name="email"
                            label="Email Address"
                            type="email"
                            placeholder="name@email.com"
                          />
                        </div>

                        <FormInput
                          name="subject"
                          label="Subject"
                          placeholder="How can we help?"
                        />

                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">
                            Your Message
                          </label>
                          <textarea
                            {...methods.register("message")}
                            rows={4}
                            placeholder="Type your message here..."
                            className="w-full p-3 md:p-4 text-sm md:text-base rounded-lg border border-slate-200 bg-slate-50 text-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-yellow/20 focus:border-brand-yellow outline-none transition-all resize-none"
                          />
                          {methods.formState.errors.message && (
                            <span className="text-[10px] font-bold text-red-500 italic">
                              {methods.formState.errors.message.message}
                            </span>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 bg-brand-blue text-white rounded-lg font-black uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-3 hover:bg-brand-blue/90 transition-all active:scale-[0.99] disabled:opacity-50 shadow-lg">
                          {isSubmitting ? "Sending..." : "Send Message"}
                          <ArrowRight size={18} />
                        </button>

                        <p className="text-[9px] text-slate-400 text-center font-bold uppercase tracking-widest">
                          Strictly Confidential &bull; GDPR Compliant
                        </p>
                      </form>
                    </FormProvider>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
