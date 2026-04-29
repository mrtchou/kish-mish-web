'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/lib/store'
import { toast } from 'react-hot-toast'
import Link from 'next/link' // <--- IMPORTANT : On importe Link pour la navigation

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const addItem = useCart((state) => state.addItem)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*')
        if (error) throw error
        if (data) setProducts(data)
      } catch (error) {
        console.error("Erreur :", error)
        toast.error("Impossible de charger les produits.")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin text-4xl">🥜</div>
        <p className="ml-4 font-serif text-amber-900 text-xl">Préparation de l'étalage...</p>
      </div>
    )
  }

  return (
    <main className="p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <article 
            key={product.id} 
            className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* ZONE IMAGE CLIQUABLE */}
            <Link href={`/products/${product.id}`} className="cursor-pointer">
              <div className="h-64 w-full bg-stone-100 relative overflow-hidden">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300 text-5xl">🥜</div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-amber-900 shadow-sm border border-amber-100 uppercase tracking-widest">
                  Voir détails
                </div>
              </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
              {/* TITRE CLIQUABLE */}
              <Link href={`/products/${product.id}`}>
                <h2 className="text-2xl font-bold text-stone-800 font-serif hover:text-amber-700 transition-colors cursor-pointer">
                  {product.name}
                </h2>
              </Link>
              
              <p className="text-stone-500 text-sm mt-3 flex-grow italic">
                {product.description || "Sélectionné avec soin par nos experts."}
              </p>
              
              <div className="mt-6 pt-5 border-t border-stone-100 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-amber-900">
                    {product.price_per_kg} €
                  </span>
                  <span className="text-[10px] uppercase tracking-tighter text-stone-400 font-bold">le kilogramme</span>
                </div>
                
                <button 
                  onClick={() => {
                    addItem(product);
                    toast.success(`${product.name} ajouté !`, {
                      style: { border: '1px solid #451a03', padding: '16px', color: '#451a03' },
                      iconTheme: { primary: '#451a03', secondary: '#FFFAEE' },
                    });
                  }}
                  className="bg-amber-900 text-white px-6 py-3 rounded-xl hover:bg-amber-800 transition-all active:scale-95 shadow-md font-bold text-sm uppercase tracking-wide"
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
