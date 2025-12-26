import { useState, useEffect, useRef } from 'react'
import { FiX, FiChevronRight } from 'react-icons/fi'
import { menuCategories, WHATSAPP_NUMBER } from '../data/content'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import type { MenuItem } from '../data/content'

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
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    if (open && menuCategories.length > 0) {
      setSelectedCategory(menuCategories[0].id)
    }
  }, [open])

  const scrollToCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const element = categoryRefs.current[categoryId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleItemClick = (item: MenuItem, categoryName: string) => {
    const message = `Olá! Gostaria de pedir: ${item.name}${item.description ? ` - ${item.description}` : ''} (${categoryName})`
    window.open(buildWhatsAppUrl(message, WHATSAPP_NUMBER), '_blank')
  }

  if (!open) return null

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
            Navegue pelas categorias e descubra nossos pratos, drinks e bebidas. Clique em qualquer
            item para pedir pelo WhatsApp.
          </p>
        </div>

        <div className="cardapio-container">
          <nav className="cardapio-nav" aria-label="Navegação do cardápio">
            <ul className="cardapio-nav-list">
              {menuCategories.map((category) => (
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
            {menuCategories.map((category) => (
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
                            categoryName={category.name}
                            onItemClick={handleItemClick}
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
                        categoryName={category.name}
                        onItemClick={handleItemClick}
                      />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        <div className="cardapio-footer">
          <a
            className="cta whatsapp"
            href={buildWhatsAppUrl('Olá! Quero fazer um pedido.', WHATSAPP_NUMBER)}
            target="_blank"
            rel="noreferrer"
          >
            Pedir pelo WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

type MenuItemCardProps = {
  item: MenuItem
  categoryName: string
  onItemClick: (item: MenuItem, categoryName: string) => void
}

const MenuItemCard = ({ item, categoryName, onItemClick }: MenuItemCardProps) => {
  return (
    <article className="menu-item-card" onClick={() => onItemClick(item, categoryName)}>
      {item.image && (
        <div className="menu-item-image-wrapper">
          <img src={item.image} alt={item.name} className="menu-item-image" loading="lazy" />
        </div>
      )}
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
