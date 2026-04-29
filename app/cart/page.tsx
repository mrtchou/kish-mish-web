'use client' // Toujours nécessaire pour l'interactivité et l'accès au Store (Zustand)

import { useCart } from '@/lib/store' // On importe notre gestionnaire d'état
import Link from 'next/link' // Pour naviguer vers la boutique
import { toast } from 'react-hot-toast' // Pour les retours visuels
import { useRouter } from 'next/navigation'

export default function CartPage() {
  /**
   * ACCÈS AU STORE ZUSTAND
   * On récupère les données (items) et les fonctions de modification.
   */
  const { items, removeItem, addItem, clearCart } = useCart()

  const router = useRouter()
  /**
   * CALCUL DU MONTANT TOTAL
   * On multiplie le prix par la quantité pour chaque article.
   * On utilise 0 comme valeur de départ.
   */
  const totalPrice = items.reduce((acc, item) => acc + (item.price_per_kg * item.quantity), 0)

  return (
    /**
     * NOTE : Le <Header /> global est déjà au-dessus (dans layout.tsx).
     * On commence donc directement par le contenu du panier.
     */
    <main className="p-8 bg-stone-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-4xl mx-auto">
        
        {/* FIL D'ARIANE / NAVIGATION INTERNE */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-amber-900 font-semibold flex items-center gap-2 hover:translate-x-[-4px] transition-transform duration-200"
          >
            ← Continuer mes achats
          </Link>
        </div>

        <h1 className="text-4xl font-serif text-amber-900 mb-8 flex items-center gap-4">
          Votre Panier 
          <span className="text-sm font-sans bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
            {items.length} article(s)
          </span>
        </h1>

        {/**
         * AFFICHAGE CONDITIONNEL :
         * 1. Si le panier est vide
         * 2. Si le panier contient des articles
         */}
        {items.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl shadow-sm text-center border border-stone-200 border-dashed">
            <div className="text-6xl mb-6">🧺</div>
            <p className="text-stone-500 text-xl mb-8 font-medium">
              Il semble que votre panier soit vide pour le moment.
            </p>
            <Link 
              href="/" 
              className="bg-amber-900 text-white px-8 py-4 rounded-2xl hover:bg-amber-800 transition-all shadow-lg font-bold"
            >
              Parcourir la boutique
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* LISTE DES ARTICLES */}
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
              {items.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`p-6 flex justify-between items-center transition-colors hover:bg-stone-50 ${
                    index !== items.length - 1 ? 'border-b border-stone-100' : ''
                  }`}
                >
                  {/* INFOS PRODUIT */}
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                      ) : '🥜'}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-stone-800">{item.name}</h3>
                      <p className="text-amber-700 font-medium">{item.price_per_kg} € / kg</p>
                    </div>
                  </div>

                  {/* CONTRÔLES ET PRIX UNITAIRE */}
                  <div className="flex items-center gap-8">
                    
                    {/* SÉLECTEUR DE QUANTITÉ OPTIMISÉ */}
                    <div className="flex items-center border-2 border-stone-100 rounded-xl bg-white shadow-sm overflow-hidden">
                      <button 
                        onClick={() => {
                          removeItem(item.id);
                          toast.error(`${item.name} diminué`, { icon: '📉' });
                        }}
                        className="px-4 py-2 hover:bg-red-50 hover:text-red-600 transition-colors font-bold text-lg"
                      >
                        -
                      </button>
                      <span className="px-4 font-bold text-stone-700 min-w-[45px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => {
                          addItem(item);
                          toast.success(`${item.name} ajouté`, { icon: '📈' });
                        }}
                        className="px-4 py-2 hover:bg-green-50 hover:text-green-600 transition-colors font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* TOTAL DE LA LIGNE */}
                    <p className="font-bold text-amber-900 w-28 text-right text-xl">
                      {(item.price_per_kg * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RÉCAPITULATIF FINAL */}
            <div className="bg-amber-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center md:text-left">
                <p className="text-amber-200 uppercase tracking-widest text-sm font-bold mb-1">
                  Total à régler
                </p>
                <h2 className="text-5xl font-serif font-bold">
                  {totalPrice.toFixed(2)} €
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto text-center">
                <button 
                  onClick={() => {
                    clearCart();
                    toast.error("Panier entièrement vidé", { icon: '🧹' });
                  }}
                  className="px-6 py-4 rounded-xl font-bold text-amber-200 hover:text-white transition-colors uppercase text-xs tracking-widest"
                >
                  Vider le panier
                </button>
                <button 
  onClick={() => router.push('/checkout')} // On redirige vers le checkout
  className="bg-white text-amber-900 px-10 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg text-lg"
>
  Commander Maintenant
</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}