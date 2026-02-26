import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { FiSearch, FiImage, FiChevronRight } from 'react-icons/fi'
import type { MenuItem } from '../data/content'
import { useMenuItems } from '../hooks/useMenuItems'

const formatPrice = (price: number | string): string => {
  if (typeof price === 'string') return price
  return `R$ ${price.toFixed(2).replace('.', ',')}`
}

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({})
  const stickyRef = useRef<HTMLDivElement>(null)
  const { menuCategories, loading, error } = useMenuItems()

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (menuCategories.length > 0) {
      setSelectedCategory(menuCategories[0].id)
    }
  }, [menuCategories])

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

  if (loading) {
    return (
      <div className="menu-page">
        <div className="menu-loading">
          <div>Carregando cardápio...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="menu-page">
        <div className="menu-error">
          <p>Erro ao carregar o cardápio.</p>
          <p>{error.message || 'Por favor, tente novamente mais tarde.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="menu-page">

      <div
        ref={stickyRef}
        className={`menu-sticky-header${isScrolled ? ' is-scrolled' : ''}`}
      >
        <div className="menu-search-wrapper">
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
            className="menu-search-input"
          />
        </div>

        {filteredCategories.length > 0 && (
          <nav className="menu-nav" aria-label="Navegação do cardápio">
            <div className="menu-nav-scroll">
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`menu-nav-item ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => scrollToCategory(category.id)}
                  aria-current={selectedCategory === category.id ? 'page' : undefined}
                >
                  {category.name}
                  <FiChevronRight size={16} />
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>

      {menuCategories.length === 0 ? (
        <div className="menu-empty">
          <p>Nenhum item no cardápio ainda.</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="menu-empty">
          <p>Nenhum item encontrado para "{searchQuery}".</p>
        </div>
      ) : (
        <div className="menu-content">
            {filteredCategories.map((category) => (
              <section
                key={category.id}
                id={category.id}
                ref={(el) => {
                  categoryRefs.current[category.id] = el
                }}
                className="menu-category"
              >
                {category.headerImage && (
                  <div className="menu-category-header">
                    <img
                      src={category.headerImage}
                      alt={category.name}
                      className="menu-category-image"
                      loading="lazy"
                    />
                  </div>
                )}
                <h2 className="menu-category-title">{category.name}</h2>

                {category.subcategories ? (
                  category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="menu-subcategory">
                      <h3 className="menu-subcategory-title">{subcategory.name}</h3>
                      <div className="menu-items-grid">
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
                  <div className="menu-items-grid">
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
      )}
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
    <article className="menu-item-card-mobile">
      <div className="menu-item-image-wrapper-mobile">
        {hasImage ? (
          <img
            src={item.image}
            alt={item.name}
            className="menu-item-image-mobile"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : null}
        {!hasImage && (
          <div className="menu-item-image-placeholder-mobile">
            <FiImage size={32} style={{ marginBottom: '4px' }} />
            <span>{item.name}</span>
          </div>
        )}
      </div>
      <div className="menu-item-content-mobile">
        <div className="menu-item-header-mobile">
          <h4 className="menu-item-name-mobile">{item.name}</h4>
          <span className="menu-item-price-mobile">{formatPrice(item.price)}</span>
        </div>
        {item.description && (
          <p className="menu-item-description-mobile">{item.description}</p>
        )}
      </div>
    </article>
  )
}

export default Menu

