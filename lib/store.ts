import { create } from 'zustand'
import { persist } from 'zustand/middleware' // Permet de garder le panier en mémoire après un rafraîchissement (LocalStorage)

/**
 * STRUCTURE D'UN ARTICLE (INTERFACE)
 * Définit la forme d'un produit lorsqu'il est dans le panier.
 */
interface CartItem {
  id: string
  name: string
  price_per_kg: number
  quantity: number
  image_url?: string // Optionnel
}

/**
 * DÉFINITION DU STORE (INTERFACE)
 * Liste toutes les données (états) et les fonctions (actions) disponibles.
 */
interface CartStore {
  items: CartItem[]
  addItem: (product: any) => void
  removeItem: (id: string) => void
  clearCart: () => void
  total: () => number     // Calcul du prix total global
  itemCount: () => number // Calcul du nombre d'articles (ex: pour badge sur icône)
}

/**
 * CRÉATION DU STORE ZUSTAND
 * On utilise 'get' en plus de 'set' pour pouvoir lire l'état actuel lors des calculs.
 */
export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      // --- ÉTAT INITIAL ---
      items: [],
      
      /**
       * AJOUTER UN PRODUIT
       * Logique : Si le produit existe, quantité + 1. Sinon, on l'ajoute.
       */
      addItem: (product) => set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id)
        
        if (existingItem) {
          // Produit déjà présent : on crée un nouveau tableau avec la quantité mise à jour
          return {
            items: state.items.map((item) =>
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ),
          }
        }
        
        // Nouveau produit : on l'ajoute à la liste avec une quantité de 1
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price_per_kg: Number(product.price_per_kg),
          quantity: 1,
          image_url: product.image_url
        }
        return { items: [...state.items, newItem] }
      }),

      /**
       * SUPPRIMER OU RÉDUIRE
       * Logique : Si quantité > 1, on décrémente. Si quantité = 1, on retire l'objet.
       */
      removeItem: (id) => set((state) => {
        const existingItem = state.items.find((item) => item.id === id)
        
        if (existingItem && existingItem.quantity > 1) {
          // On réduit juste la quantité de 1
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
          }
        }
        // On filtre le tableau pour supprimer complètement l'article
        return { items: state.items.filter((item) => item.id !== id) }
      }),

      /**
       * VIDER LE PANIER
       * Réinitialise le tableau à vide.
       */
      clearCart: () => set({ items: [] }),

      /**
       * CALCUL DU TOTAL GÉNÉRAL
       * Additionne (prix * quantité) de chaque ligne du panier.
       */
      total: () => {
        const items = get().items // On récupère la liste actuelle des produits
        return items.reduce((acc, item) => acc + (item.price_per_kg * item.quantity), 0)
      },

      /**
       * COMPTEUR D'ARTICLES TOTAL
       * Utile pour afficher "3 articles" dans le récapitulatif ou le header.
       */
      itemCount: () => {
        const items = get().items
        return items.reduce((acc, item) => acc + item.quantity, 0)
      }
    }),
    {
      // Nom de la clé de stockage dans le navigateur (LocalStorage)
      name: 'kish-mish-cart',
    }
  )
)