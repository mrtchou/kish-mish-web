'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import confetti from 'canvas-confetti' // Une petite touche festive !

export default function SuccessPage() {
  // On lance des confettis au chargement de la page pour féliciter l'acheteur
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#451a03', '#92400e', '#f59e0b'] // Couleurs Kish Mish (Ambre/Marron)
    })
  }, [])

  return (
    <main className="min-h-[70vh] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center bg-white p-12 rounded-3xl shadow-xl border border-stone-100">
        {/* ICÔNE DE SUCCÈS */}
        <div className="text-6xl mb-6">📦</div>
        
        <h1 className="text-3xl font-bold text-stone-800 font-serif mb-4">
          Commande confirmée !
        </h1>
        
        <p className="text-stone-600 mb-8 leading-relaxed">
          Merci pour votre confiance. Nos experts préparent vos produits avec soin. 
          Vous recevrez un e-mail dès que votre colis sera en route.
        </p>

        {/* BOUTON RETOUR */}
        <Link 
          href="/"
          className="inline-block bg-amber-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-800 transition-all shadow-md active:scale-95"
        >
          Retour à la boutique
        </Link>
      </div>
    </main>
  )
}