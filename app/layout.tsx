import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast"; // On importe le composant qui affichera les bulles de notification
import "./globals.css";

// CONFIGURATION DES POLICES
// Geist est la police moderne par défaut de Next.js
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * MÉTADONNÉES (SEO)
 * C'est ce qui apparaît dans l'onglet du navigateur et sur Google.
 */
export const metadata: Metadata = {
  title: "Kish Mish | L'excellence des fruits secs",
  description: "Découvrez notre sélection premium de noix, dattes et fruits secs de qualité supérieure.",
};

/**
 * LE LAYOUT RACINE (Root Layout)
 * C'est le composant parent de toutes les pages de ton site.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // On change 'en' par 'fr' pour indiquer aux navigateurs que le site est en français
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        
        {/* LE TOASTER : 
          Il est placé ici pour être "au-dessus" de toutes les pages.
          position="bottom-right" : les messages apparaîtront en bas à droite.
          toastOptions : on définit le style par défaut (couleurs Kish Mish).
        */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#451a03', // Le amber-900 de ton thème
              color: '#fff',
              borderRadius: '12px',
            },
            success: {
              duration: 3000, // Le message reste 3 secondes
            },
          }}
        />

        {/* {children} représente le contenu de la page actuelle (Home ou Cart).
          Tout ce qui est autour (Toaster, etc.) reste fixe quand on change de page.
        */}
        {children}

      </body>
    </html>
  );
}