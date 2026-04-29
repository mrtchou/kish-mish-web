'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation' // Pour récupérer l'ID dans l'URL
import { supabase } from '@/lib/supabase'
import { useCart } from '@/lib/store'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const addItem = useCart((state) => state.addItem)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // On récupère le produit dont l'ID correspond à celui de l'URL
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single() // On ne veut qu'un seul résultat

        if (error) throw error
        setProduct(data)
      } catch (error) {
        console.error("Erreur :", error)
        toast.error("Produit introuvable")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) fetchProduct()
  }, [params.id])

  if (loading) return <div className="p-20 text-center font-serif text-amber-900">Chargement du trésor...</div>
  if (!product) return <div className="p-20 text-center">Produit non trouvé.</div>

  return (
    <main className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* BOUTON RETOUR */}
        <Link href="/" className="text-amber-900 font-bold mb-8 inline-block hover:underline">
          ← Retour à la boutique
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-xl border border-stone-100">
          
          {/* COLONNE GAUCHE : IMAGE */}
          <div className="h-[400px] bg-stone-100 rounded-2xl overflow-hidden shadow-inner">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">🥜</div>
            )}
          </div>

          {/* COLONNE DROITE : INFOS & ACHAT */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-serif text-stone-800 mb-2">{product.name}</h1>
            <div className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full w-fit mb-6 uppercase tracking-widest">
              Sélection Premium
            </div>

            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              {product.description || "Un produit d'exception sélectionné pour sa qualité et son goût unique. Parfait pour vos collations saines ou vos recettes gourmandes."}
            </p>

            <div className="mt-auto border-t border-stone-100 pt-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-stone-400 text-sm uppercase font-bold tracking-tighter">Prix au kilo</p>
                  <span className="text-4xl font-bold text-amber-900">{product.price_per_kg} €</span>
                </div>
                <span className="text-stone-400 italic text-sm">TVA incluse</span>
              </div>

              <button 
                onClick={() => {
                  addItem(product)
                  toast.success(`${product.name} ajouté au panier !`)
                }}
                className="w-full bg-amber-900 text-white py-4 rounded-2xl font-bold text-xl hover:bg-amber-800 transition-all shadow-lg active:scale-95"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}