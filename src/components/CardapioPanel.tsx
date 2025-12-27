import { useState, useEffect, useRef, useMemo } from 'react'
import { FiX, FiChevronRight, FiSearch, FiImage } from 'react-icons/fi'
import type { MenuItem } from '../data/content'
import { useMenuItems } from '../hooks/useMenuItems'

type CardapioPanelProps = {
  open: boolean
  onClose: () => void
}

const formatPrice = (price: number | string): string => {
  if (typeof price === 'string') return price
  return `R$ ${price.toFixed(2).replace('.', ',')}`
}

const CardapioPanel = ({ open, onClose }: CardapioPanelProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({})
  const { menuCategories, loading, error } = useMenuItems()

  useEffect(() => {
    if (open && menuCategories.length > 0) {
      setSelectedCategory(menuCategories[0].id)
    }
  }, [open, menuCategories])

  // Filter menu categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return menuCategories
    }

    const query = searchQuery.toLowerCase().trim()
    return menuCategories
      .map((category) => {
        const filteredItems = category.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query))
        )

        // Also check subcategories if they exist
        const filteredSubcategories = category.subcategories
          ? category.subcategories.map((subcategory) => ({
              ...subcategory,
              items: subcategory.items.filter(
                (item) =>
                  item.name.toLowerCase().includes(query) ||
                  (item.description && item.description.toLowerCase().includes(query))
              ),
            }))
          : undefined

        return {
          ...category,
          items: filteredItems,
          subcategories: filteredSubcategories,
        }
      })
      .filter(
        (category) =>
          category.items.length > 0 ||
          (category.subcategories && category.subcategories.some((sub) => sub.items.length > 0))
      )
  }, [menuCategories, searchQuery])

  const scrollToCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const element = categoryRefs.current[categoryId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (!open) return null

  if (loading) {
    return (
      <div className="cardapio-overlay" role="dialog" aria-modal="true" aria-label="Cardápio">
        <div className="cardapio-panel">
          <div style={{ textAlign: 'center', padding: '40px' }}>Carregando cardápio...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="cardapio-overlay" role="dialog" aria-modal="true" aria-label="Cardápio">
        <div className="cardapio-panel">
          <button
            className="cardapio-close"
            type="button"
            aria-label="Fechar cardápio"
            onClick={onClose}
          >
            <FiX size={24} />
          </button>
          <div style={{ textAlign: 'center', padding: '40px', color: '#dc3545' }}>
            <p>Erro ao carregar o cardápio.</p>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>
              {error.message || 'Por favor, tente novamente mais tarde.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cardapio-overlay" role="dialog" aria-modal="true" aria-label="Cardápio">
      <div className="cardapio-panel">
        <button
          className="cardapio-close"
          type="button"
          aria-label="Fechar cardápio"
          onClick={onClose}
        >
          <FiX size={24} />
        </button>

        <div className="cardapio-header">
          <p className="cardapio-eyebrow">Menu Completo</p>
          <h2>Cardápio Clover Pub</h2>
          <p className="cardapio-description">
            Navegue pelas categorias e descubra nossos pratos, drinks e bebidas.
          </p>
          <div style={{ marginTop: '20px', position: 'relative' }}>
            <FiSearch
              size={20}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Buscar pratos, drinks ou bebidas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#134a32'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd'
              }}
            />
          </div>
        </div>

        <div className="cardapio-container">
          {menuCategories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Nenhum item no cardápio ainda.
            </div>
          ) : filteredCategories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Nenhum item encontrado para "{searchQuery}".
            </div>
          ) : (
            <>
              <nav className="cardapio-nav" aria-label="Navegação do cardápio">
                <ul className="cardapio-nav-list">
                  {filteredCategories.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    className={`cardapio-nav-item ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => scrollToCategory(category.id)}
                    aria-current={selectedCategory === category.id ? 'page' : undefined}
                  >
                    {category.name}
                    <FiChevronRight size={16} />
                  </button>
                </li>
                  ))}
                </ul>
              </nav>

              <div className="cardapio-content">
                {filteredCategories.map((category) => (
              <section
                key={category.id}
                id={category.id}
                ref={(el) => {
                  categoryRefs.current[category.id] = el
                }}
                className="cardapio-category"
              >
                {category.headerImage && (
                  <div className="cardapio-category-header">
                    <img
                      src={category.headerImage}
                      alt={category.name}
                      className="cardapio-category-image"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="cardapio-category-title">{category.name}</h3>

                {category.subcategories ? (
                  category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="cardapio-subcategory">
                      <h4 className="cardapio-subcategory-title">{subcategory.name}</h4>
                      <div className="cardapio-items-grid">
                        {subcategory.items.map((item, index) => (
                          <MenuItemCard
                            key={`${subcategory.id}-${index}`}
                            item={item}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="cardapio-items-grid">
                    {category.items.map((item, index) => (
                      <MenuItemCard
                        key={`${category.id}-${index}`}
                        item={item}
                      />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

type MenuItemCardProps = {
  item: MenuItem
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const [imageError, setImageError] = useState(false)

  const hasImage = item.image && !imageError

  return (
    <article className="menu-item-card">
      <div className="menu-item-image-wrapper">
        {hasImage ? (
          <img
            src={item.image}
            alt={item.name}
            className="menu-item-image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : null}
        {!hasImage && (
          <div className="menu-item-image-placeholder">
            <FiImage size={48} style={{ marginBottom: '8px' }} />
            <span style={{ fontSize: '12px', textAlign: 'center', padding: '0 16px' }}>
              {item.name}
            </span>
          </div>
        )}
      </div>
      <div className="menu-item-content">
        <div className="menu-item-header">
          <h4 className="menu-item-name">{item.name}</h4>
          <span className="menu-item-price">{formatPrice(item.price)}</span>
        </div>
        {item.description && (
          <p className="menu-item-description">{item.description}</p>
        )}
      </div>
    </article>
  )
}

export default CardapioPanel
