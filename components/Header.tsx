'use client' // Nécessaire car on utilise le store Zustand (côté client)

import Link from 'next/link'
import { useCart } from '@/lib/store'

/**
 * COMPOSANT HEADER GLOBAL
 * Ce menu sera visible sur toutes les pages du site.
 */
export default function Header() {
  // On récupère les articles du panier pour afficher le badge dynamique
  const cartItems = useCart((state) => state.items)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
        
        {/* SECTION GAUCHE : LOGO */}
        <Link href="/" className="flex flex-col group">
          <span className="text-3xl font-serif text-amber-900 group-hover:text-amber-800 transition-colors">
            Kish Mish
          </span>
          <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">
            L'excellence des fruits secs
          </span>
        </Link>

        {/* SECTION CENTRALE : NAVIGATION */}
        <nav className="hidden md:flex gap-8 text-stone-600 font-semibold uppercase text-sm tracking-wide">
          <Link href="/" className="hover:text-amber-900 transition-colors">Boutique</Link>
          <Link href="/about" className="hover:text-amber-900 transition-colors">Notre Histoire</Link>
          <Link href="/contact" className="hover:text-amber-900 transition-colors">Contact</Link>
        </nav>

        {/* SECTION DROITE : PANIER */}
        <Link href="/cart" className="relative p-2 hover:bg-stone-50 rounded-full transition-colors group">
          <span className="text-2xl">🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-md">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}