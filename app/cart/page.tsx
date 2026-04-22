'use client' // Obligatoire car on utilise des clics (interactions) et le Store (Zustand)

import { useCart } from '@/lib/store' // Importation du "cerveau" pour lire et modifier le panier
import Link from 'next/link' // Importation du composant de navigation pour changer de page sans recharger

export default function CartPage() {
  /**
   * RÉCUPÉRATION DES DONNÉES ET ACTIONS
   * On "extrait" ce dont on a besoin depuis notre store global :
   * - items : la liste des produits
   * - removeItem, addItem, clearCart : les outils pour manipuler le panier
   */
  const { items, removeItem, addItem, clearCart } = useCart()

  /**
   * CALCUL DU PRIX TOTAL DU PANIER
   * La méthode .reduce() parcourt le tableau 'items'.
   * acc (accumulateur) : la somme qui s'accumule au fur et à mesure.
   * item : l'article actuel dans la boucle.
   * On commence à 0.
   */
  const totalPrice = items.reduce((acc, item) => {
    return acc + (item.price_per_kg * item.quantity)
  }, 0)

  return (
    <main className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* NAVIGATION : Lien de retour à l'accueil */}
        <Link href="/" className="text-amber-900 hover:underline mb-8 inline-block font-medium">
          ← Retour à la boutique
        </Link>

        <h1 className="text-4xl font-serif text-amber-900 mb-8">Mon Panier</h1>

        {/**
         * AFFICHAGE CONDITIONNEL (Ternaire)
         * SI le panier est vide (items.length === 0) -> On affiche le message vide
         * SINON -> On affiche la liste des articles
         */}
        {items.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-stone-200">
            <p className="text-stone-500 mb-6">Votre panier est encore vide.</p>
            <Link href="/" className="bg-amber-900 text-white px-6 py-3 rounded-xl hover:bg-amber-800 transition-colors inline-block">
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* BOUCLE : On affiche chaque article du panier un par un */}
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex justify-between items-center animate-in fade-in slide-in-from-bottom-2"
              >
                {/* Infos produit (Gauche) */}
                <div>
                  <h3 className="text-xl font-bold text-stone-800">{item.name}</h3>
                  <p className="text-stone-500">{item.price_per_kg} € / kg</p>
                </div>

                {/* Contrôles et Prix (Droite) */}
                <div className="flex items-center gap-6">
                  
                  {/* SÉLECTEUR DE QUANTITÉ */}
                  <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                    {/* Bouton Moins */}
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="px-3 py-1 hover:bg-stone-200 transition-colors border-r border-stone-200"
                      title="Diminuer ou retirer"
                    >
                      -
                    </button>
                    
                    {/* Quantité actuelle */}
                    <span className="px-4 font-bold text-stone-700 min-w-[40px] text-center">
                      {item.quantity}
                    </span>
                    
                    {/* Bouton Plus */}
                    <button 
                      onClick={() => addItem(item)}
                      className="px-3 py-1 hover:bg-stone-200 transition-colors border-l border-stone-200"
                      title="Ajouter un article"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* SOUS-TOTAL PAR ARTICLE
                      .toFixed(2) permet de forcer l'affichage de 2 chiffres après la virgule (ex: 12.50 €)
                  */}
                  <p className="font-bold text-amber-900 w-24 text-right text-lg">
                    {(item.price_per_kg * item.quantity).toFixed(2)} €
                  </p>
                </div>
              </div>
            ))}

            {/* SECTION RÉCAPITULATIVE (Bas de page) */}
            <div className="mt-8 pt-8 border-t border-stone-200 flex flex-col items-end">
              <div className="text-2xl font-serif mb-6">
                Total de votre commande : 
                <span className="font-bold text-amber-900 ml-4">
                  {totalPrice.toFixed(2)} €
                </span>
              </div>
              
              <div className="flex items-center gap-6">
                {/* Action : Vider tout le panier */}
                <button 
                  onClick={clearCart}
                  className="text-stone-400 hover:text-red-500 text-sm transition-colors uppercase tracking-wider font-semibold"
                >
                  Vider mon panier
                </button>
                
                {/* Action : Finaliser la commande */}
                <button className="bg-amber-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-amber-800 transition-all shadow-lg active:scale-95">
                  Procéder au paiement
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}