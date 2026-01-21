export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased bg-brand-light text-brand-dark`}>
        {/* প্রোভাইডার দিয়ে পুরো অ্যাপ র‍্যাপ করা হয়েছে */}
        <GoogleTranslateProvider>
          <GoogleTranslateCleanup />
          <Navbar />
          <main className="min-h-screen pt-20 md:pt-24">{children}</main>
          <Footer />
        </GoogleTranslateProvider>

        <Toaster position="top-center" richColors theme="light" closeButton />
      </body>
    </html>
  );
}