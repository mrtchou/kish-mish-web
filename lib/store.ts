import { create } from 'zustand'
import { persist } from 'zustand/middleware' // Middleware qui permet de sauvegarder le store dans le navigateur

/**
 * STRUCTURE D'UN ARTICLE DANS LE PANIER
 * On définit les propriétés dont on a besoin pour l'affichage et les calculs.
 */
interface CartItem {
  id: string
  name: string
  price_per_kg: number
  quantity: number
  image_url?: string // Le "?" signifie que cette propriété est optionnelle
}

/**
 * STRUCTURE GLOBALE DU STORE (ÉTAT + ACTIONS)
 * On liste tout ce que le store contient (les données) et tout ce qu'il peut faire (les fonctions).
 */
interface CartStore {
  items: CartItem[] // Le tableau qui contient nos produits ajoutés
  addItem: (product: any) => void // Fonction pour ajouter ou incrémenter
  removeItem: (id: string) => void // Fonction pour supprimer un produit
  clearCart: () => void // Fonction pour vider le panier d'un coup
}

/**
 * CRÉATION DU STORE AVEC PERSISTANCE
 * 'persist' va emballer notre store pour qu'à chaque changement, 
 * une copie soit enregistrée dans le localStorage du navigateur.
 */
export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      // État initial : le panier est vide
      items: [],
      
      // AJOUTER UN PRODUIT
      addItem: (product) => set((state) => {
        // 1. On vérifie si l'article existe déjà dans le panier grâce à son ID
        const existingItem = state.items.find((item) => item.id === product.id)
        
        if (existingItem) {
          // 2. S'il existe : on parcourt le panier et on augmente uniquement la quantité du produit concerné
          return {
            items: state.items.map((item) =>
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ),
          }
        }
        
        // 3. S'il n'existe pas : on prépare un nouvel objet CartItem
        // On utilise Number() pour s'assurer que le prix est bien traité comme un chiffre (mathématiques)
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price_per_kg: Number(product.price_per_kg),
          quantity: 1,
          image_url: product.image_url
        }

        // 4. On ajoute le nouveau produit à la liste existante (...state.items)
        return { items: [...state.items, newItem] }
      }),

      // SUPPRIMER OU DIMINUER LA QUANTITÉ
      removeItem: (id) => set((state) => {
        const existingItem = state.items.find((item) => item.id === id)
        
        // Si l'article a une quantité supérieure à 1, on baisse juste la quantité
        if (existingItem && existingItem.quantity > 1) {
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
          }
        }
        
        // Sinon (si c'est le dernier), on le supprime complètement de la liste
        return {
          items: state.items.filter((item) => item.id !== id),
        }
      }),

      // VIDER LE PANIER
      // On remet simplement le tableau d'items à vide
      clearCart: () => set({ items: [] }),
    }),
    {
      // CONFIGURATION DE LA PERSISTANCE
      name: 'kish-mish-cart', // Nom unique de la clé dans le LocalStorage
    }
  )
)