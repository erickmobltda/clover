import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import type { HallOfFameEntry } from '../components/admin/HallOfFameManager'

export const useHallOfFame = () => {
  const [entries, setEntries] = useState<HallOfFameEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        // Try to order by litters first (descending for highest first)
        let q
        try {
          q = query(collection(db, 'hallOfFame'), orderBy('litters', 'desc'))
        } catch (indexError: any) {
          // If index doesn't exist, fetch all and sort in memory
          console.warn('Index for litters not found, fetching all and sorting in memory...')
          q = query(collection(db, 'hallOfFame'))
        }
        
        const querySnapshot = await getDocs(q)
        const loadedEntries: HallOfFameEntry[] = []
        querySnapshot.forEach((doc) => {
          loadedEntries.push({ id: doc.id, ...doc.data() } as HallOfFameEntry)
        })
        
        // Sort by litters descending (highest first) and take top 3
        const sortedEntries = loadedEntries
          .sort((a, b) => b.litters - a.litters)
          .slice(0, 3)
        
        setEntries(sortedEntries)
        setError(null)
      } catch (err) {
        console.error('Error fetching hall of fame:', err)
        setError(err as Error)
        // Fallback to empty array if Firebase fails
        setEntries([])
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  return { entries, loading, error }
}

