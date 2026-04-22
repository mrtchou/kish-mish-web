'use client' // Indique que ce fichier contient de l'interactivité (clics, état local)

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  // --- ÉTAT (STATE) ---
  // On crée une "boîte" pour stocker nos produits une fois qu'ils arrivent de Supabase
  const [products, setProducts] = useState<any[]>([])
  // On crée un état pour savoir si on est en train de charger les données
  const [loading, setLoading] = useState(true)

  // --- RÉCUPÉRATION DES DONNÉES (FETCH) ---
  useEffect(() => {
    // Fonction asynchrone qui va chercher les données sur Supabase
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')

        if (error) throw error
        if (data) setProducts(data)
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error)
      } finally {
        setLoading(false) // Le chargement est terminé, qu'il y ait une erreur ou non
      }
    }

    fetchProducts()
  }, []) // Le crochet [] signifie "exécuter une seule fois au chargement de la page"

  // Affichage pendant le chargement
  if (loading) {
    return <div className="p-20 text-center font-serif text-amber-900">Chargement de l'étalage...</div>
  }

  return (
    <main className="min-h-screen bg-stone-50 p-8">
      {/* En-tête de la boutique */}
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-6xl font-serif text-amber-900 mb-2">Kish Mish</h1>
        <p className="text-stone-600 italic">L'excellence des fruits secs à portée de clic</p>
      </header>

      {/* Grille d'affichage des produits */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {products && products.length > 0 ? (
          products.map((product) => (
            <article key={product.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 hover:shadow-lg transition-all overflow-hidden flex flex-col">
              
              {/* Zone Image : Affiche la photo de Supabase ou une icône par défaut */}
              <div className="h-56 w-full bg-stone-100 relative">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-stone-300">
                    <span className="text-4xl mb-2">🥜</span>
                    <p className="text-xs uppercase tracking-widest">Image bientôt disponible</p>
                  </div>
                )}
              </div>

              {/* Contenu textuel du produit */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="inline-block self-start px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
                  {product.category || 'Nature'}
                </div>
                
                <h2 className="text-2xl font-bold text-stone-800">{product.name}</h2>
                
                <p className="text-stone-500 text-sm mt-3 leading-relaxed flex-grow">
                  {product.description || 'Aucune description disponible.'}
                </p>
                
                {/* Pied de carte : Prix et bouton d'action */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center">
                  <span className="text-2xl font-black text-amber-900">
                    {product.price_per_kg} € <span className="text-sm font-normal text-stone-400">/ kg</span>
                  </span>
                  
                  <button 
                    onClick={() => console.log("Ajout au panier de :", product.name)}
                    className="bg-amber-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-800 transition-colors shadow-sm active:scale-95"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          /* Message si la base de données est vide */
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-stone-200">
            <p className="text-stone-400 text-lg">Votre étalage est vide pour le moment.</p>
          </div>
        )}
      </div>
    </main>
  )
}