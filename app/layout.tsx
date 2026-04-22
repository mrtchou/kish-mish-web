import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header"; // <--- ON IMPORTE LE NOUVEAU HEADER
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kish Mish | L'excellence des fruits secs",
  description: "Découvrez notre sélection premium de noix, dattes et fruits secs de qualité supérieure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        
        {/* 1. SYSTÈME DE NOTIFICATIONS (invisible tant qu'il n'y a pas d'alerte) */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#451a03',
              color: '#fff',
              borderRadius: '12px',
            },
          }}
        />

        {/* 2. LE HEADER GLOBAL (Fixe en haut de chaque page) */}
        <Header />

        {/* 3. LE CONTENU DYNAMIQUE (C'est ici que s'affichent tes pages) 
            On ajoute 'flex-grow' pour que le contenu occupe tout l'espace disponible
        */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 4. OPTIONNEL : On pourrait ajouter un <Footer /> ici plus tard */}

      </body>
    </html>
  );
}