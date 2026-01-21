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
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { ContactService } from "@/services/ContactService";
import FormInput from "@/components/forms/FormInput";

const contactSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Required"),
  message: z.string().min(1, "Required"),
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
      toast.success("Success!");
      methods.reset();
    } catch (error: any) {
      toast.error("Failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-24 pb-16 bg-[#fcfcfc] min-h-screen relative overflow-hidden">
      {/* --- Subtle Background Animation --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        {/* --- Header Area --- */}
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-brand-yellow" />
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.4em]">
              Connect With Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-brand-blue leading-[0.9] tracking-tighter">
            Let’s Start <br />
            <span className="text-brand-yellow italic">Your Journey.</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* --- Contact Channels (Left) --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: <Mail size={20} />,
                  label: "Email Address",
                  val: "contact@er-ett.com",
                  delay: 0.1,
                },
                {
                  icon: <Phone size={20} />,
                  label: "Phone Support",
                  val: "+351 920 019 186",
                  delay: 0.2,
                },
                {
                  icon: <MapPin size={20} />,
                  label: "Main Office",
                  val: "Sintra, Lisbon, Portugal",
                  delay: 0.3,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay }}
                  className="flex items-start gap-5 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-brand-yellow transition-all duration-300 group">
                  <div className="p-3 rounded-xl bg-brand-blue/5 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      {item.label}
                    </h4>
                    <p className="text-lg font-bold text-brand-blue">
                      {item.val}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-brand-blue text-white relative overflow-hidden group">
              <Globe
                className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700"
                size={120}
              />
              <h4 className="text-xl text-white mb-2">Global Operations</h4>
              <p className="text-blue-100/60 text-xs leading-relaxed max-w-50">
                Providing skilled workforce solutions across 16+ European
                countries.
              </p>
            </div>
          </div>

          {/* --- Interactive Form (Right) --- */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-slate-100 p-6 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-12 text-center">
                    <CheckCircle
                      size={60}
                      className="text-emerald-500 mx-auto mb-6"
                    />
                    <h2 className="text-3xl font-black text-brand-blue mb-2">
                      Message Sent
                    </h2>
                    <p className="text-slate-500 text-sm mb-8">
                      We will get back to you within one business day.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-brand-yellow font-black uppercase text-xs tracking-[0.2em] border-b-2 border-brand-yellow pb-1">
                      New Message
                    </button>
                  </motion.div>
                ) : (
                  <FormProvider {...methods}>
                    <form
                      onSubmit={methods.handleSubmit(onSubmit)}
                      className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative">
                          <FormInput
                            name="name"
                            label="Full Name"
                            placeholder="Enter name"
                          />
                        </div>
                        <div className="relative">
                          <FormInput
                            name="email"
                            label="Email Address"
                            type="email"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>

                      <FormInput
                        name="subject"
                        label="Subject"
                        placeholder="How can we help?"
                      />

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-brand-blue uppercase tracking-widest ml-1">
                          Message
                        </label>
                        <textarea
                          {...methods.register("message")}
                          rows={4}
                          className="w-full p-4 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-brand-yellow/10 focus:border-brand-yellow outline-none transition-all resize-none shadow-inner"
                          placeholder="Tell us about your needs..."
                        />
                        {methods.formState.errors.message && (
                          <span className="text-[10px] font-bold text-red-500 mt-1">
                            {methods.formState.errors.message.message}
                          </span>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-brand-blue text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] md:text-xs flex items-center justify-center gap-3 shadow-xl shadow-brand-blue/20 transition-all hover:bg-brand-blue/90 disabled:opacity-50">
                        {isSubmitting ? "Transmitting..." : "Send Message"}
                        <ArrowRight
                          size={16}
                          className="text-brand-yellow"
                        />
                      </motion.button>

                      <div className="flex justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Subtle indicators for professionalism */}
                        <div className="text-[9px] font-bold tracking-widest uppercase">
                          GDPR Protected
                        </div>
                        <div className="text-[9px] font-bold tracking-widest uppercase">
                          SSL Encrypted
                        </div>
                      </div>
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
