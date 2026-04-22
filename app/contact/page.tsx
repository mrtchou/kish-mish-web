'use client' // Obligatoire car on gère un formulaire (onSubmit) et des Toasts

import { toast } from 'react-hot-toast'

export default function ContactPage() {
  /**
   * GESTION DE L'ENVOI DU FORMULAIRE
   * Pour l'instant, on simule l'envoi. Plus tard, on pourra brancher 
   * un service comme Formspree ou Supabase Edge Functions.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Empêche le rechargement de la page
    
    // On affiche une petite bulle de chargement
    const loadingToast = toast.loading("Envoi de votre message...")

    // On simule un délai réseau de 1.5 seconde
    setTimeout(() => {
      toast.dismiss(loadingToast)
      toast.success("Message envoyé ! Nous vous répondrons sous 24h.", {
        duration: 5000,
        icon: '✉️',
      })
      // On réinitialise le formulaire
      const target = e.target as HTMLFormElement
      target.reset()
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* COLONNE GAUCHE : INFOS DE CONTACT */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-serif text-amber-900 mb-4">Contactez-nous</h1>
              <p className="text-stone-600 text-lg">
                Une question sur nos dattes ? Une demande pour un événement ? 
                Notre équipe est à votre écoute.
              </p>
            </div>

            <div className="space-y-6">
              {/* Carte Adresse */}
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-xl text-2xl">📍</div>
                <div>
                  <h3 className="font-bold text-stone-800">Boutique Kish Mish</h3>
                  <p className="text-stone-500">123 Avenue des Saveurs<br />75011 Paris, France</p>
                </div>
              </div>

              {/* Carte Email */}
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-xl text-2xl">✉️</div>
                <div>
                  <h3 className="font-bold text-stone-800">Email</h3>
                  <p className="text-stone-500">contact@kishmish.com</p>
                </div>
              </div>

              {/* Carte Horaires */}
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-xl text-2xl">🕒</div>
                <div>
                  <h3 className="font-bold text-stone-800">Horaires d'ouverture</h3>
                  <p className="text-stone-500">Lundi - Samedi : 09h00 - 19h00</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : LE FORMULAIRE */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">
                  Nom Complet
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Jean Dupont"
                  className="w-full p-4 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-stone-300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">
                  Adresse Email
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="jean@exemple.com"
                  className="w-full p-4 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-stone-300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">
                  Votre Message
                </label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full p-4 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-stone-300"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-amber-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-amber-800 transition-all shadow-lg active:scale-95"
              >
                Envoyer le message
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  )
}