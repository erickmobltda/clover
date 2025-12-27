import { useState, useEffect } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi'

export interface MenuItem {
  id?: string
  category: string
  name: string
  description: string
  value: number
  img_url: string
}

const MENU_CATEGORIES = [
  'sobremesas',
  'petiscos',
  'entradas',
  'burgers',
  'carnes-e-pratos',
  'drinks-sem-alcool',
  'soda-italiana',
  'outras-bebidas',
  'cervejas-no-tap',
  'gintonica',
  'caipirinhas',
  'negroni',
  'drinks-classicos',
  'drinks-autorais',
  'drinks-premium',
  'doses-whiskey',
  'whiskey-premium',
  'outras-doses',
]

const MenuManager = () => {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>({
    category: '',
    name: '',
    description: '',
    value: 0,
    img_url: '',
  })

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      const q = query(collection(db, 'menuItems'), orderBy('category'), orderBy('name'))
      const querySnapshot = await getDocs(q)
      const loadedItems: MenuItem[] = []
      querySnapshot.forEach((doc) => {
        loadedItems.push({ id: doc.id, ...doc.data() } as MenuItem)
      })
      setItems(loadedItems)
    } catch (error) {
      console.error('Error loading items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingItem?.id) {
        await updateDoc(doc(db, 'menuItems', editingItem.id), formData)
      } else {
        await addDoc(collection(db, 'menuItems'), formData)
      }
      resetForm()
      loadItems()
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Erro ao salvar item')
    }
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      category: item.category,
      name: item.name,
      description: item.description,
      value: item.value,
      img_url: item.img_url,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) return
    try {
      await deleteDoc(doc(db, 'menuItems', id))
      loadItems()
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Erro ao excluir item')
    }
  }

  const resetForm = () => {
    setFormData({ category: '', name: '', description: '', value: 0, img_url: '' })
    setEditingItem(null)
    setShowForm(false)
    setSelectedCategory('')
  }

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Carregando...</div>
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#134a32' }}>Gerenciar Menu</h2>
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
          <FiPlus /> Adicionar Item
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Filtrar por categoria:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            minWidth: '200px'
          }}
        >
          <option value="">Todas as categorias</option>
          {MENU_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {showForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          marginBottom: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#134a32' }}>
              {editingItem ? 'Editar Item' : 'Novo Item'}
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
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Selecione uma categoria</option>
                {MENU_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
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
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
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
                value={formData.img_url}
                onChange={(e) => setFormData({ ...formData, img_url: e.target.value })}
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
                {editingItem ? 'Atualizar' : 'Salvar'}
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

      {Object.keys(groupedItems).length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          Nenhum item cadastrado ainda.
        </div>
      ) : (
        Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              color: '#134a32', 
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '2px solid #c6a15b'
            }}>
              {category.toUpperCase()}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {item.img_url && (
                    <img
                      src={item.img_url}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  <div style={{ padding: '20px' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#134a32' }}>{item.name}</h4>
                    {item.description && (
                      <p style={{ margin: '5px 0 10px 0', color: '#666', fontSize: '14px' }}>
                        {item.description}
                      </p>
                    )}
                    <p style={{ margin: '5px 0', color: '#134a32', fontWeight: '600', fontSize: '18px' }}>
                      R$ {item.value.toFixed(2).replace('.', ',')}
                    </p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                      <button
                        onClick={() => handleEdit(item)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#c6a15b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '14px'
                        }}
                      >
                        <FiEdit /> Editar
                      </button>
                      <button
                        onClick={() => item.id && handleDelete(item.id)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '14px'
                        }}
                      >
                        <FiTrash2 /> Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default MenuManager

