'use client'

import Link from 'next/link'

/**
 * COMPOSANT FOOTER GLOBAL
 * S'affiche en bas de chaque page pour la navigation secondaire et les infos légales.
 */
export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 pt-16 pb-8 mt-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* COLONNE 1 : LOGO & DESCRIPTION */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-serif text-amber-900">Kish Mish</span>
            </Link>
            <p className="text-stone-500 text-sm leading-relaxed">
              Sélectionneur de fruits secs d'exception depuis 2024. 
              La qualité du terroir, directement chez vous.
            </p>
          </div>

          {/* COLONNE 2 : NAVIGATION RAPIDE */}
          <div>
            <h4 className="font-bold text-stone-800 uppercase text-xs tracking-widest mb-6">Boutique</h4>
            <ul className="space-y-4 text-sm text-stone-600">
              <li><Link href="/" className="hover:text-amber-900 transition-colors">Tous les produits</Link></li>
              <li><Link href="/cart" className="hover:text-amber-900 transition-colors">Mon Panier</Link></li>
              <li><Link href="/about" className="hover:text-amber-900 transition-colors">Notre Histoire</Link></li>
            </ul>
          </div>

          {/* COLONNE 3 : AIDE & CONTACT */}
          <div>
            <h4 className="font-bold text-stone-800 uppercase text-xs tracking-widest mb-6">Aide</h4>
            <ul className="space-y-4 text-sm text-stone-600">
              <li><Link href="/contact" className="hover:text-amber-900 transition-colors">Contactez-nous</Link></li>
              <li><Link href="#" className="hover:text-amber-900 transition-colors">Livraison & Retours</Link></li>
              <li><Link href="#" className="hover:text-amber-900 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* COLONNE 4 : RÉSEAUX SOCIAUX */}
          <div>
            <h4 className="font-bold text-stone-800 uppercase text-xs tracking-widest mb-6">Suivez-nous</h4>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors">📸</Link>
              <Link href="#" className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors">📘</Link>
            </div>
          </div>

        </div>

        {/* LIGNE DE COPYRIGHT FINALE */}
        <div className="border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Kish Mish. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-stone-600">Mentions Légales</Link>
            <Link href="#" className="hover:text-stone-600">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}