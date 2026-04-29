'use client'

import { useState } from 'react'
import { useCart } from '@/lib/store'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart() // On récupère les données du panier
  const [loading, setLoading] = useState(false)

  // Gestion du formulaire de livraison
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // On récupère les données du formulaire
    const formData = new FormData(e.currentTarget)
    
    // Préparation de l'objet de commande pour la base de données
    const orderData = {
      customer_name: formData.get('name'),
      customer_email: formData.get('email'),
      shipping_address: formData.get('address'),
      total_amount: total(),
      items: items, // On enregistre tout le panier en JSON
      status: 'pending'
    }

    try {
      // Insertion dans la table 'orders' de Supabase
      const { error } = await supabase.from('orders').insert([orderData])

      if (error) throw error

      // Si ça marche :
      toast.success('Commande enregistrée !')
      clearCart() // On vide le panier
      router.push('/') // On redirige vers l'accueil (ou une page de succès)
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de la validation de la commande.')
    } finally {
      setLoading(false)
    }
  }

  // Si le panier est vide, on n'affiche pas le formulaire
  if (items.length === 0) {
    return <div className="p-20 text-center">Votre panier est vide.</div>
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-serif text-amber-900 mb-8">Finaliser ma commande</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* FORMULAIRE DE LIVRAISON */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            name="name" 
            type="text" 
            placeholder="Nom complet" 
            required 
            className="w-full p-3 border rounded-xl" 
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
            className="w-full p-3 border rounded-xl" 
          />
          <textarea 
            name="address" 
            placeholder="Adresse de livraison complète" 
            required 
            className="w-full p-3 border rounded-xl h-32"
          ></textarea>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-amber-900 text-white py-4 rounded-xl font-bold hover:bg-amber-800 disabled:opacity-50"
          >
            {loading ? 'Validation...' : `Payer ${total()} €`}
          </button>
        </form>

        {/* RÉCAPITULATIF RAPIDE */}
        <div className="bg-stone-100 p-6 rounded-2xl h-fit">
          <h2 className="font-bold mb-4">Résumé</h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span>{item.name} x{item.quantity}</span>
              <span>{(item.price_per_kg * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4 font-bold text-lg flex justify-between">
            <span>Total</span>
            <span>{total()} €</span>
          </div>
        </div>
      </div>
    </main>
  )
}