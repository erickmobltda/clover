import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import type { MenuItem } from '../components/admin/MenuManager'
import type { MenuCategory } from '../data/content'

export const useMenuItems = () => {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const q = query(collection(db, 'menuItems'), orderBy('category'), orderBy('name'))
        const querySnapshot = await getDocs(q)
        const loadedItems: MenuItem[] = []
        querySnapshot.forEach((doc) => {
          loadedItems.push({ id: doc.id, ...doc.data() } as MenuItem)
        })

        // Group items by category
        const categoriesMap = new Map<string, MenuCategory>()
        
        loadedItems.forEach((item) => {
          if (!categoriesMap.has(item.category)) {
            categoriesMap.set(item.category, {
              id: item.category,
              name: item.category.toUpperCase(),
              items: [],
            })
          }
          const category = categoriesMap.get(item.category)!
          category.items.push({
            name: item.name,
            description: item.description,
            price: item.value,
            image: item.img_url,
          })
        })

        const categories = Array.from(categoriesMap.values())
        setMenuCategories(categories)
        setError(null)
      } catch (err) {
        console.error('Error fetching menu items:', err)
        setError(err as Error)
        // Fallback to empty array if Firebase fails
        setMenuCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  return { menuCategories, loading, error }
}

