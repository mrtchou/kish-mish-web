/**
 * FICHIER : app/layout.tsx
 * RÔLE : Le "Squelette" (Root Layout). 
 * Ce fichier définit la structure HTML de base qui entoure CHAQUE page de ton site.
 * Tout ce qui est ici (Header, Footer, Toaster) ne sera jamais rechargé lors de la navigation.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Importation des polices optimisées de Google
import { Toaster } from "react-hot-toast"; // Importation du système de notifications
import Header from "@/components/Header"; // Importation du menu de navigation (Haut de page)
import Footer from "@/components/Footer"; // Importation du pied de page (Bas de page)
import "./globals.css"; // Importation des styles Tailwind globaux

/**
 * CONFIGURATION DES POLICES (Google Fonts)
 * On crée des variables CSS pour utiliser ces polices partout dans le projet.
 */
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
 * Ces informations sont lues par Google et les réseaux sociaux.
 * Elles définissent le titre de l'onglet du navigateur.
 */
export const metadata: Metadata = {
  title: "Kish Mish | L'excellence des fruits secs",
  description: "Boutique en ligne premium : Noix, dattes et fruits secs sélectionnés avec passion.",
};

/**
 * COMPOSANT ROOT LAYOUT
 * @param children : Représente le contenu de la page actuelle (ex: page d'accueil, panier, etc.)
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /**
     * Balise HTML racine : 
     * - 'lang="fr"' évite les propositions de traduction automatique de Chrome.
     * - 'h-full' et 'antialiased' assurent une base de design propre.
     */
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Le body utilise 'flex flex-col' et 'min-h-full' pour forcer 
        le Footer à rester en bas même si la page est presque vide.
      */}
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-sans">
        
        {/* 1. LE TOASTER (Notifications)
          Placé à la racine pour être visible au-dessus de n'importe quel élément.
          Il reste en attente d'un appel type 'toast.success()' dans ton code.
        */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#451a03', // Couleur Marron/Ambre foncée (Identité Kish Mish)
              color: '#fff',         // Texte blanc pour le contraste
              borderRadius: '12px',  // Bords arrondis modernes
            },
            duration: 4000,          // Temps d'affichage par défaut (4 sec)
          }}
        />

        {/* 2. LE HEADER (Navigation)
          Étant hors du <main>, il est persistant. 
          L'utilisateur peut naviguer sans perdre de vue le logo ou son panier.
        */}
        <Header />

        {/* 3. LE CONTENU PRINCIPAL (Le cœur du site)
          - 'flex-grow' : C'est l'astuce magique. Ce bloc va "grandir" pour occuper 
            tout l'espace entre le Header et le Footer.
          - {children} : C'est ici que Next.js injecte le code de 'page.tsx'.
        */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 4. LE FOOTER (Bas de page)
          Contient les liens secondaires, les réseaux sociaux et le copyright.
        */}
        <Footer />

      </body>
    </html>
  );
}