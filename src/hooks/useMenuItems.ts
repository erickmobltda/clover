import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import type { MenuItem } from '../components/admin/MenuManager'
import type { MenuCategory } from '../data/content'

// Category name mapping - maps category IDs to display names
const CATEGORY_NAMES: Record<string, string> = {
  'sobremesas': 'SOBREMESAS',
  'petiscos': 'PETISCOS',
  'entradas': 'ENTRADAS',
  'burgers': 'BURGERS',
  'carnes-e-pratos': 'CARNES E PRATOS',
  'drinks-sem-alcool': 'DRINKS SEM ÁLCOOL',
  'soda-italiana': 'SODA ITALIANA (473 ML)',
  'outras-bebidas': 'OUTRAS BEBIDAS',
  'cervejas-no-tap': 'CERVEJAS NO TAP',
  'gintonica': 'GINTÔNICA',
  'caipirinhas': 'CAIPIRINHAS*',
  'negroni': 'NEGRONI',
  'drinks-classicos': 'DRINKS CLÁSSICOS',
  'drinks-autorais': 'DRINKS AUTORAIS',
  'drinks-premium': 'DRINKS PREMIUM',
  'doses-whiskey': 'DOSES WHISKEY (60ML)',
  'whiskey-premium': 'WHISKEY PREMIUM (50ML)',
  'outras-doses': 'OUTRAS DOSES (60ML)',
}

export const useMenuItems = () => {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Use a simpler query that doesn't require composite index
        // We'll sort in memory instead
        const q = query(collection(db, 'menuItems'), orderBy('category'))
        const querySnapshot = await getDocs(q)
        const loadedItems: MenuItem[] = []
        querySnapshot.forEach((doc) => {
          loadedItems.push({ id: doc.id, ...doc.data() } as MenuItem)
        })

        // Sort items by name within each category
        loadedItems.sort((a, b) => {
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category)
          }
          return a.name.localeCompare(b.name)
        })

        // Group items by category
        const categoriesMap = new Map<string, MenuCategory>()
        
        loadedItems.forEach((item) => {
          if (!categoriesMap.has(item.category)) {
            const categoryName = CATEGORY_NAMES[item.category] || item.category.toUpperCase()
            categoriesMap.set(item.category, {
              id: item.category,
              name: categoryName,
              items: [],
            })
          }
          const category = categoriesMap.get(item.category)!
          category.items.push({
            name: item.name,
            description: item.description || '',
            price: item.value,
            image: item.img_url || '',
          })
        })

        const categories = Array.from(categoriesMap.values())
        setMenuCategories(categories)
        setError(null)
      } catch (err: any) {
        console.error('Error fetching menu items:', err)
        setError(err as Error)
        // If it's a missing index error, try without orderBy
        if (err?.code === 'failed-precondition' || err?.message?.includes('index')) {
          console.warn('Composite index missing, fetching without orderBy...')
          try {
            const querySnapshot = await getDocs(collection(db, 'menuItems'))
            const loadedItems: MenuItem[] = []
            querySnapshot.forEach((doc) => {
              loadedItems.push({ id: doc.id, ...doc.data() } as MenuItem)
            })

            // Sort in memory
            loadedItems.sort((a, b) => {
              if (a.category !== b.category) {
                return a.category.localeCompare(b.category)
              }
              return a.name.localeCompare(b.name)
            })

            // Group items by category
            const categoriesMap = new Map<string, MenuCategory>()
            
            loadedItems.forEach((item) => {
              if (!categoriesMap.has(item.category)) {
                const categoryName = CATEGORY_NAMES[item.category] || item.category.toUpperCase()
                categoriesMap.set(item.category, {
                  id: item.category,
                  name: categoryName,
                  items: [],
                })
              }
              const category = categoriesMap.get(item.category)!
              category.items.push({
                name: item.name,
                description: item.description || '',
                price: item.value,
                image: item.img_url || '',
              })
            })

            const categories = Array.from(categoriesMap.values())
            setMenuCategories(categories)
            setError(null)
          } catch (retryErr) {
            console.error('Error fetching menu items (retry):', retryErr)
            setError(retryErr as Error)
            setMenuCategories([])
          }
        } else {
          // Fallback to empty array if Firebase fails
          setMenuCategories([])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  return { menuCategories, loading, error }
}

