'use client' // Optionnel ici, mais utile si tu veux ajouter des animations plus tard

import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* SECTION HÉROS : Image et Titre */}
        <div className="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden mb-12 shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1596501048547-e90b83cc9b21?q=80&w=2070&auto=format&fit=crop" 
            alt="Épices et fruits secs" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent flex items-end p-8">
            <h1 className="text-4xl md:text-6xl font-serif text-white">Notre Histoire</h1>
          </div>
        </div>

        {/* CONTENU TEXTUEL : Organisé en deux colonnes sur grand écran */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-stone-700 leading-relaxed">
          
          {/* COLONNE GAUCHE : La Vision */}
          <div className="md:col-span-2 space-y-6 text-lg">
            <h2 className="text-3xl font-serif text-amber-900">L'Excellence du Terroir</h2>
            <p>
              Fondée avec la volonté de partager les trésors des terres ensoleillées, 
              <strong> Kish Mish</strong> n'est pas seulement une boutique, c'est un voyage gustatif. 
              Le nom "Kish Mish" évoque la douceur universelle du raisin sec, symbole de générosité et de partage.
            </p>
            <p>
              Nous sélectionnons chaque produit selon trois critères immuables : 
              la <strong>provenance éthique</strong>, la <strong>fraîcheur absolue</strong> et le 
              <strong> respect des méthodes traditionnelles</strong> de séchage. 
            </p>
            <blockquote className="border-l-4 border-amber-600 pl-6 italic text-stone-500 py-2">
              "Apporter le meilleur de la nature, de l'arbre à votre table, sans artifice."
            </blockquote>
          </div>

          {/* COLONNE DROITE : Nos Valeurs (Cartes) */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
              <span className="text-3xl mb-2 block">🌿</span>
              <h3 className="font-bold text-amber-900 uppercase text-sm tracking-widest">100% Naturel</h3>
              <p className="text-sm text-stone-500 mt-2">Aucun additif, juste le goût pur du fruit.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
              <span className="text-3xl mb-2 block">🤝</span>
              <h3 className="font-bold text-amber-900 uppercase text-sm tracking-widest">Équitable</h3>
              <p className="text-sm text-stone-500 mt-2">Soutien direct aux producteurs locaux.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
              <span className="text-3xl mb-2 block">📦</span>
              <h3 className="font-bold text-amber-900 uppercase text-sm tracking-widest">Eco-Responsable</h3>
              <p className="text-sm text-stone-500 mt-2">Emballages recyclables et durables.</p>
            </div>
          </div>
        </div>

        {/* BOUTON DE RETOUR */}
        <div className="mt-16 text-center">
          <Link 
            href="/" 
            className="bg-amber-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-amber-800 transition-all shadow-xl inline-block"
          >
            Découvrir nos produits
          </Link>
        </div>
      </div>
    </main>
  )
}