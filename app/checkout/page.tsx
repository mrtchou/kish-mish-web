'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/lib/store'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Empêche les erreurs d'hydratation (différence entre serveur et client)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      console.log("Tentative d'insertion commande...")
      
      // 1. Insertion dans 'orders'
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: formData.get('name'),
          customer_email: formData.get('email'),
          delivery_address: formData.get('address'),
          total_price: typeof total === 'function' ? total() : total,
          status: 'en_attente',
          payment_method: 'cash_on_delivery'
        }])
        .select()
        .single()

      if (orderError) throw orderError

      // 2. Insertion dans 'order_items'
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        weight_grams: 1000, 
        price_at_purchase: item.price_per_kg
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      toast.success('Succès !')
      clearCart()
      router.push('/checkout/success')

    } catch (error: any) {
      console.error('DEBUG ERROR:', error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Si le composant n'est pas encore monté sur le client, on ne rend rien (évite les bugs)
  if (!isMounted) return null

  // Si le panier est vide
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Votre panier est vide. Ajoutez des délices pour continuer !</p>
      </div>
    )
  }

  return (
    <main className="max-w-4xl mx-auto p-8 pt-24"> {/* pt-24 pour éviter que le header cache le titre */}
      <h1 className="text-3xl font-serif text-amber-900 mb-8">Finaliser ma commande</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" placeholder="Nom complet" required className="w-full p-3 border rounded-xl text-black" />
          <input name="email" type="email" placeholder="Email" required className="w-full p-3 border rounded-xl text-black" />
          <textarea name="address" placeholder="Adresse de livraison" required className="w-full p-3 border rounded-xl text-black h-32"></textarea>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-amber-900 text-white py-4 rounded-xl font-bold hover:bg-amber-800 disabled:bg-gray-400"
          >
            {loading ? 'Chargement...' : `Confirmer la commande`}
          </button>
        </form>

        <div className="bg-stone-100 p-6 rounded-2xl h-fit">
          <h2 className="font-bold mb-4 text-black">Résumé du panier</h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2 text-stone-700">
              <span>{item.name} x{item.quantity}</span>
              <span>{(item.price_per_kg * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}