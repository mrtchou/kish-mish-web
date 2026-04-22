'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/lib/store'
import Link from 'next/link'
import { toast } from 'react-hot-toast' // 1. ON IMPORTE TOAST

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  const addItem = useCart((state) => state.addItem)
  const cartItems = useCart((state) => state.items)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*')
        if (error) throw error
        if (data) setProducts(data)
      } catch (error) {
        console.error("Erreur de récupération :", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <div className="p-20 text-center font-serif text-amber-900">Préparation de l'étalage...</div>

  return (
    <main className="min-h-screen bg-stone-50 p-8">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-5xl font-serif text-amber-900">Kish Mish</h1>
          <p className="text-stone-600 italic">L'excellence des fruits secs</p>
        </div>
        
        <Link href="/cart">
          <div className="relative bg-white p-4 rounded-full shadow-sm border border-stone-200 cursor-pointer hover:bg-stone-50 transition-colors group">
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce shadow-md">
                {totalItems}
              </span>
            )}
          </div>
        </Link>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <article key={product.id} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
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

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-stone-800">{product.name}</h2>
              <p className="text-stone-500 text-sm mt-2 flex-grow">
                {product.description || "Description à venir."}
              </p>
              
              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center">
                <span className="text-xl font-bold text-amber-900">
                  {product.price_per_kg} € <span className="text-sm font-normal text-stone-400">/ kg</span>
                </span>
                
                {/* 2. ON DÉCLENCHE LE TOAST AU CLIC */}
                <button 
                  onClick={() => {
                    addItem(product);
                    toast.success(`${product.name} ajouté !`, {
                      icon: '🥜', // On peut même mettre un petit emoji personnalisé
                    });
                  }}
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