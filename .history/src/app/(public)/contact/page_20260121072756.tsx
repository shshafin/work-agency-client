"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import FormInput from "@/components/form/FormInput";
import { ContactService } from "@/services/contact.service";
import { toast } from "sonner";

// Frontend Validation Schema (Matches Backend)
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
      toast.success("Message sent successfully!");
      methods.reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-28 pb-20 bg-[#FDFDFD]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* --- Left: Contact Info --- */}
          <div className="space-y-10">
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-brand-blue tracking-tighter mb-6 italic underline decoration-brand-yellow">
                Get In Touch.
              </h1>
              <p className="text-gray-500 text-lg max-w-md">
                Have a question or looking to hire? Our team is here to help you
                24/7.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <Mail />,
                  title: "Email Us",
                  detail: "contact@er-ett.com",
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  icon: <Phone />,
                  title: "Call Us",
                  detail: "+351 920 019 186",
                  color: "bg-orange-50 text-orange-600",
                },
                {
                  icon: <MapPin />,
                  title: "Visit Office",
                  detail: "Sintra, Lisbon, Portugal",
                  color: "bg-green-50 text-green-600",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      {item.title}
                    </p>
                    <p className="text-xl font-bold text-brand-blue">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- Right: Contact Form --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-blue p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 text-white py-20">
                <CheckCircle
                  size={80}
                  className="text-brand-yellow animate-bounce"
                />
                <h2 className="text-3xl font-black">Message Sent!</h2>
                <p className="text-blue-100/60">
                  We will get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-brand-yellow font-bold underline">
                  Send another message
                </button>
              </div>
            ) : (
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      name="name"
                      label="Full Name"
                      placeholder="John Doe"
                    />
                    <FormInput
                      name="email"
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                  <FormInput
                    name="subject"
                    label="Subject"
                    placeholder="How can we help?"
                  />

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-white uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      {...methods.register("message")}
                      rows={5}
                      placeholder="Your message here..."
                      className="p-4 rounded-xl border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
                    />
                    {methods.formState.errors.message && (
                      <span className="text-xs text-red-400">
                        {methods.formState.errors.message.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-brand-yellow text-brand-blue font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50">
                    {isSubmitting ? "Sending..." : "Send Message"}{" "}
                    <Send size={20} />
                  </button>
                </form>
              </FormProvider>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
