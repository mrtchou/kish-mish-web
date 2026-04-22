'use client' // PRÉCISION : Indique que ce composant est interactif (clics, état, etc.)

import { useCart } from '@/lib/store' // On importe notre "cerveau" (Store Zustand)
import Link from 'next/link' // Composant Next.js pour naviguer entre les pages sans rechargement
import { toast } from 'react-hot-toast' // On importe l'outil pour afficher des messages d'alerte (Toasts)

export default function CartPage() {
  /**
   * RÉCUPÉRATION DU STORE
   * On extrait les données (items) et les actions (removeItem, addItem, clearCart)
   */
  const { items, removeItem, addItem, clearCart } = useCart()

  /**
   * CALCUL MATHÉMATIQUE DU TOTAL
   * .reduce() parcourt le panier pour additionner le (prix * quantité) de chaque produit.
   * On démarre le compteur à 0.
   */
  const totalPrice = items.reduce((acc, item) => {
    return acc + (item.price_per_kg * item.quantity)
  }, 0)

  /**
   * FONCTION : VIDER LE PANIER AVEC CONFIRMATION
   * On demande une confirmation visuelle via un toast avant de tout effacer.
   */
  const handleClearCart = () => {
    if (items.length > 0) {
      clearCart()
      toast.error("Panier vidé", { icon: '🗑️' })
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* LIEN DE RETOUR : Utilisation de Link pour une navigation instantanée */}
        <Link href="/" className="text-amber-900 hover:underline mb-8 inline-block font-medium">
          ← Retour à la boutique
        </Link>

        <h1 className="text-4xl font-serif text-amber-900 mb-8 border-b border-stone-200 pb-4">
          Mon Panier
        </h1>

        {/**
         * LOGIQUE D'AFFICHAGE :
         * SI le panier est vide (items.length === 0) -> Message d'accueil vide
         * SINON -> Liste des produits
         */}
        {items.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-stone-200">
            <p className="text-stone-500 mb-6 text-lg">Votre panier est encore vide.</p>
            <Link href="/" className="bg-amber-900 text-white px-8 py-3 rounded-xl hover:bg-amber-800 transition-all inline-block shadow-md">
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* BOUCLE (Map) : On génère un bloc HTML pour chaque article présent dans le store */}
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex justify-between items-center transition-all hover:border-amber-200"
              >
                {/* PARTIE GAUCHE : Informations textuelles */}
                <div>
                  <h3 className="text-xl font-bold text-stone-800">{item.name}</h3>
                  <p className="text-stone-500 font-medium">{item.price_per_kg} € / kg</p>
                </div>

                {/* PARTIE DROITE : Contrôles de quantité et Prix total de la ligne */}
                <div className="flex items-center gap-6">
                  
                  {/* BLOC SÉLECTEUR DE QUANTITÉ */}
                  <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50 shadow-inner">
                    {/* BOUTON MOINS : Diminue la quantité (ou supprime l'objet si qté = 1) */}
                    <button 
                      onClick={() => {
                        removeItem(item.id)
                        toast.error(`Retiré : ${item.name}`, { icon: '➖' })
                      }} 
                      className="px-4 py-2 hover:bg-stone-200 transition-colors border-r border-stone-200 font-bold text-lg"
                    >
                      -
                    </button>
                    
                    {/* QUANTITÉ ACTUELLE : Récupérée en temps réel depuis Zustand */}
                    <span className="px-5 font-bold text-stone-800 min-w-[50px] text-center">
                      {item.quantity}
                    </span>
                    
                    {/* BOUTON PLUS : Augmente la quantité via l'action addItem du store */}
                    <button 
                      onClick={() => {
                        addItem(item)
                        toast.success(`Ajouté : ${item.name}`, { icon: '➕' })
                      }}
                      className="px-4 py-2 hover:bg-stone-200 transition-colors border-l border-stone-200 font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* CALCUL DU SOUS-TOTAL : (Prix * Quantité) 
                      toFixed(2) : Force 2 chiffres après la virgule pour l'aspect monétaire.
                  */}
                  <p className="font-bold text-amber-900 w-28 text-right text-xl">
                    {(item.price_per_kg * item.quantity).toFixed(2)} €
                  </p>
                </div>
              </div>
            ))}

            {/* SECTION FINALE : Récapitulatif et Actions de fin */}
            <div className="mt-8 pt-8 border-t-2 border-stone-200 flex flex-col items-end">
              <div className="text-2xl font-serif mb-6 text-stone-800">
                Total de votre commande : 
                <span className="font-bold text-amber-900 ml-4 underline decoration-amber-200 decoration-4 underline-offset-4">
                  {totalPrice.toFixed(2)} €
                </span>
              </div>
              
              <div className="flex items-center gap-8">
                {/* ACTION : Vider tout le panier */}
                <button 
                  onClick={handleClearCart}
                  className="text-stone-400 hover:text-red-600 text-sm transition-colors uppercase tracking-widest font-bold border-b border-transparent hover:border-red-600"
                >
                  Vider mon panier
                </button>
                
                {/* ACTION : Bouton final (pourra mener vers Stripe ou un formulaire) */}
                <button 
                  onClick={() => toast.loading("Redirection vers le paiement...")}
                  className="bg-amber-900 text-white px-12 py-4 rounded-2xl font-bold hover:bg-amber-800 transition-all shadow-xl hover:shadow-amber-900/20 active:scale-95 text-lg"
                >
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