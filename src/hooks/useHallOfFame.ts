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
        const q = query(collection(db, 'hallOfFame'), orderBy('date', 'desc'))
        const querySnapshot = await getDocs(q)
        const loadedEntries: HallOfFameEntry[] = []
        querySnapshot.forEach((doc) => {
          loadedEntries.push({ id: doc.id, ...doc.data() } as HallOfFameEntry)
        })
        setEntries(loadedEntries)
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

