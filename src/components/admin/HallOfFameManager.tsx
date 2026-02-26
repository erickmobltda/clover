import { useState, useEffect } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi'

export interface HallOfFameEntry {
  id?: string
  name: string
  litters: number
  date: string
  image: string
}

const HallOfFameManager = () => {
  const [entries, setEntries] = useState<HallOfFameEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEntry, setEditingEntry] = useState<HallOfFameEntry | null>(null)
  const [formData, setFormData] = useState<Omit<HallOfFameEntry, 'id'>>({
    name: '',
    litters: 0,
    date: '',
    image: '',
  })

  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    try {
      const q = query(collection(db, 'hallOfFame'), orderBy('date', 'desc'))
      const querySnapshot = await getDocs(q)
      const loadedEntries: HallOfFameEntry[] = []
      querySnapshot.forEach((doc) => {
        loadedEntries.push({ id: doc.id, ...doc.data() } as HallOfFameEntry)
      })
      setEntries(loadedEntries)
    } catch (error) {
      console.error('Error loading entries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingEntry?.id) {
        await updateDoc(doc(db, 'hallOfFame', editingEntry.id), formData)
      } else {
        await addDoc(collection(db, 'hallOfFame'), formData)
      }
      resetForm()
      loadEntries()
    } catch (error) {
      console.error('Error saving entry:', error)
      alert('Erro ao salvar entrada')
    }
  }

  const handleEdit = (entry: HallOfFameEntry) => {
    setEditingEntry(entry)
    setFormData({
      name: entry.name,
      litters: entry.litters,
      date: entry.date,
      image: entry.image,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta entrada?')) return
    try {
      await deleteDoc(doc(db, 'hallOfFame', id))
      loadEntries()
    } catch (error) {
      console.error('Error deleting entry:', error)
      alert('Erro ao excluir entrada')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', litters: 0, date: '', image: '' })
    setEditingEntry(null)
    setShowForm(false)
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Carregando...</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#134a32' }}>Gerenciar Hall of Fame</h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#134a32',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px'
          }}
        >
          <FiPlus /> Adicionar Entrada
        </button>
      </div>

      {showForm && (
        <div style={{
          backgroundColor: 'white',
          color: '#333',
          padding: '30px',
          borderRadius: '8px',
          marginBottom: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#134a32' }}>
              {editingEntry ? 'Editar Entrada' : 'Nova Entrada'}
            </h3>
            <button
              onClick={resetForm}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: '#666'
              }}
            >
              <FiX />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Nome</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Quantidade de Litros
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.litters}
                onChange={(e) => setFormData({ ...formData, litters: parseFloat(e.target.value) || 0 })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Data</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>URL da Imagem</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#134a32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                {editingEntry ? 'Atualizar' : 'Salvar'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ccc',
                  color: '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {entry.image && (
              <img
                src={entry.image}
                alt={entry.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
            )}
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#134a32' }}>{entry.name}</h3>
              <p style={{ margin: '5px 0', color: '#666' }}>
                <strong>Litros:</strong> {entry.litters}L
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                <strong>Data:</strong> {new Date(entry.date).toLocaleDateString('pt-BR')}
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button
                  onClick={() => handleEdit(entry)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#c6a15b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <FiEdit /> Editar
                </button>
                <button
                  onClick={() => entry.id && handleDelete(entry.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <FiTrash2 /> Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          Nenhuma entrada cadastrada ainda.
        </div>
      )}
    </div>
  )
}

export default HallOfFameManager

