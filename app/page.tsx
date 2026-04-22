'use client' // Indique que ce composant s'exécute côté client (nécessaire pour Zustand et les clics)

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/lib/store' // Importation du gestionnaire de panier (Store)
import Link from 'next/link' // Importation du composant de navigation de Next.js

export default function Home() {
  // --- ÉTAT LOCAL ---
  const [products, setProducts] = useState<any[]>([]) // Stocke les produits venus de la base
  const [loading, setLoading] = useState(true) // Gère l'affichage pendant le chargement
  
  // --- LOGIQUE DU PANIER ---
  const addItem = useCart((state) => state.addItem) // Fonction pour ajouter un produit
  const cartItems = useCart((state) => state.items) // Récupère la liste actuelle des articles
  
  // Calcul dynamique du nombre total d'articles (somme des quantités)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  // --- RÉCUPÉRATION DES DONNÉES (SUPABASE) ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // On demande tous les produits à Supabase
        const { data, error } = await supabase.from('products').select('*')
        if (error) throw error
        if (data) setProducts(data)
      } catch (error) {
        console.error("Erreur de récupération :", error)
      } finally {
        setLoading(false) // On arrête l'affichage du chargement
      }
    }
    fetchProducts()
  }, [])

  // Affichage transitoire
  if (loading) return <div className="p-20 text-center font-serif text-amber-900">Préparation de l'étalage...</div>

  return (
    <main className="min-h-screen bg-stone-50 p-8">
      
      {/* HEADER : Titre et accès au Panier */}
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-5xl font-serif text-amber-900">Kish Mish</h1>
          <p className="text-stone-600 italic">L'excellence des fruits secs</p>
        </div>
        
        {/* LIEN VERS LE PANIER : On entoure l'icône avec <Link> */}
        <Link href="/cart">
          <div className="relative bg-white p-4 rounded-full shadow-sm border border-stone-200 cursor-pointer hover:bg-stone-50 transition-colors group">
            <span className="text-2xl">🛒</span>
            {/* Le badge ne s'affiche que si le panier n'est pas vide */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce shadow-md">
                {totalItems}
              </span>
            )}
          </div>
        </Link>
      </header>

      {/* GRILLE DE PRODUITS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <article key={product.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            
            {/* IMAGE DU PRODUIT */}
            <div className="h-56 w-full bg-stone-100 relative overflow-hidden">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-300 text-3xl">🥜</div>
              )}
            </div>

            {/* INFOS DU PRODUIT */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-stone-800">{product.name}</h2>
              <p className="text-stone-500 text-sm mt-2 flex-grow">
                {product.description || "Description à venir."}
              </p>
              
              {/* PRIX ET ACTION */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center">
                <span className="text-xl font-bold text-amber-900">
                  {product.price_per_kg} € <span className="text-sm font-normal text-stone-400">/ kg</span>
                </span>
                
                <button 
                  onClick={() => addItem(product)}
                  className="bg-amber-900 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-all active:scale-95 shadow-md font-medium"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}