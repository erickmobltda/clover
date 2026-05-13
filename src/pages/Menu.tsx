import { useState, useEffect, useMemo, useCallback, useRef, Fragment } from 'react'
import { FiSearch } from 'react-icons/fi'
import type { MenuItem, MenuCategory } from '../data/content'
import { useMenuItems } from '../hooks/useMenuItems'

const formatPrice = (price: number | string): string => {
  if (typeof price === 'string') return price
  return Number.isInteger(price) ? String(price) : price.toFixed(2).replace('.', ',')
}

const MENU_TABS = [
  {
    id: 'food',
    label: 'Food',
    categories: ['entradas', 'burgers', 'carnes-e-pratos', 'sobremesas', 'petiscos'],
  },
  {
    id: 'tap-beers',
    label: 'Tap Beers',
    categories: ['cervejas-no-tap'],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    categories: [
      'gintonica',
      'caipirinhas',
      'negroni',
      'drinks-classicos',
      'drinks-autorais',
      'drinks-premium',
      'doses-whiskey',
      'whiskey-premium',
      'outras-doses',
    ],
  },
  {
    id: 'non-alcohol',
    label: 'Non Alcohol',
    categories: ['drinks-sem-alcool', 'soda-italiana', 'outras-bebidas'],
  },
] as const

type TabId = (typeof MENU_TABS)[number]['id']

const KNOWN_CATEGORY_IDS = new Set<string>(MENU_TABS.flatMap((t) => t.categories))

const tabIdForCategory = (categoryId: string): TabId => {
  for (const tab of MENU_TABS) {
    if ((tab.categories as readonly string[]).includes(categoryId)) return tab.id
  }
  return 'non-alcohol'
}

const CATEGORY_HEROES: Record<string, string> = {
  entradas:
    'https://lh3.googleusercontent.com/u/0/d/1vmV8ZYFEU1ET5Srb-YWZl-od9-aGJ8dV=w642-h480-p-k-nu-iv2?auditContext=thumbnail',
  sobremesas:
    'https://lh3.googleusercontent.com/u/0/d/1RVheynmA6c93xWJO3wLdgNYFp3q7PneW=w642-h480-p-k-nu-iv2?auditContext=thumbnail',
  'cervejas-no-tap':
    'https://lh3.google.com/u/0/d/17sU2HnnTPgC2yg82Vn4L7oF3onp1b4-G=w2342-h1814-iv1?auditContext=prefetch',
  'drinks-classicos':
    'https://lh3.googleusercontent.com/u/0/d/1qRmcfqjKred9wmRwSt3DcJZRGKDU9OuM=w642-h480-p-k-nu-iv2?auditContext=thumbnail',
}

const findCategoryImage = (category: MenuCategory): string | undefined => {
  const curated = CATEGORY_HEROES[category.id]
  if (curated) return curated
  for (const item of category.items) {
    if (item.image) return item.image
  }
  if (category.subcategories) {
    for (const sub of category.subcategories) {
      for (const item of sub.items) {
        if (item.image) return item.image
      }
    }
  }
  return undefined
}

const Menu = () => {
  const [activeTab, setActiveTab] = useState<TabId>('food')
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({})
  const { menuCategories, loading, error } = useMenuItems()

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const isSearching = searchQuery.trim().length > 0

  const orderedCategories = useMemo<MenuCategory[]>(() => {
    const order: string[] = MENU_TABS.flatMap((t) => [...t.categories])
    const rankOf = (id: string) => {
      const i = order.indexOf(id)
      return i === -1 ? Number.MAX_SAFE_INTEGER : i
    }
    return [...menuCategories].sort((a, b) => rankOf(a.id) - rankOf(b.id))
  }, [menuCategories])

  const visibleCategories = useMemo<MenuCategory[]>(() => {
    if (!isSearching) return orderedCategories
    const query = searchQuery.toLowerCase().trim()
    return orderedCategories
      .map((category) => {
        const filteredItems = category.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query))
        )
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
        return { ...category, items: filteredItems, subcategories: filteredSubcategories }
      })
      .filter(
        (category) =>
          category.items.length > 0 ||
          (category.subcategories && category.subcategories.some((sub) => sub.items.length > 0))
      )
  }, [orderedCategories, searchQuery, isSearching])

  useEffect(() => {
    if (visibleCategories.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible?.target.id) {
          setActiveTab(tabIdForCategory(visible.target.id))
        }
      },
      { rootMargin: '-220px 0px -55% 0px', threshold: 0 }
    )
    visibleCategories.forEach((category) => {
      const el = categoryRefs.current[category.id]
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [visibleCategories])

  const scrollToTab = (tabId: TabId) => {
    const tab = MENU_TABS.find((t) => t.id === tabId)
    if (!tab) return
    setActiveTab(tabId)
    const targetCategoryId = tab.categories.find((id) =>
      visibleCategories.some((c) => c.id === id)
    )
    const fallbackId = tabId === 'non-alcohol'
      ? visibleCategories.find((c) => !KNOWN_CATEGORY_IDS.has(c.id))?.id
      : undefined
    const id = targetCategoryId ?? fallbackId
    if (!id) return
    const el = categoryRefs.current[id]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
      <div className={`menu-sticky-header${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="menu-search-wrapper">
          <FiSearch className="menu-search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar pratos, drinks ou bebidas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="menu-search-input"
          />
        </div>

        <nav className="menu-tabs" aria-label="Seções do cardápio">
          {MENU_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`menu-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => scrollToTab(tab.id)}
              aria-current={activeTab === tab.id ? 'true' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {menuCategories.length === 0 ? (
        <div className="menu-empty">
          <p>Nenhum item no cardápio ainda.</p>
        </div>
      ) : visibleCategories.length === 0 ? (
        <div className="menu-empty">
          <p>Nenhum item encontrado para "{searchQuery}".</p>
        </div>
      ) : (
        <div className="menu-content">
          {visibleCategories.map((category, idx) => {
            const heroImage = findCategoryImage(category)
            const prev = visibleCategories[idx - 1]
            const showBreak =
              !isSearching &&
              idx > 0 &&
              !!prev &&
              tabIdForCategory(prev.id) !== tabIdForCategory(category.id)
            return (
              <Fragment key={category.id}>
                {showBreak && <div className="brochure-tab-break" aria-hidden="true" />}
                <section
                  id={category.id}
                  ref={(el) => {
                    categoryRefs.current[category.id] = el
                  }}
                  className="brochure-card"
                >
                  <h2 className="brochure-card-title">{category.name}</h2>

                  {heroImage && <CategoryHero src={heroImage} alt={category.name} />}

                  {category.subcategories ? (
                    category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="brochure-subcategory">
                        <h3 className="brochure-subcategory-title">{subcategory.name}</h3>
                        <ul className="brochure-items">
                          {subcategory.items.map((item, index) => (
                            <MenuItemRow key={`${subcategory.id}-${index}`} item={item} />
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <ul className="brochure-items">
                      {category.items.map((item, index) => (
                        <MenuItemRow key={`${category.id}-${index}`} item={item} />
                      ))}
                    </ul>
                  )}
                </section>
              </Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}

type MenuItemRowProps = {
  item: MenuItem
}

const MenuItemRow = ({ item }: MenuItemRowProps) => (
  <li className="brochure-item">
    <div className="brochure-item-head">
      <span className="brochure-item-name">{item.name}</span>
      <span className="brochure-item-price">{formatPrice(item.price)}</span>
    </div>
    {item.description && <p className="brochure-item-desc">{item.description}</p>}
  </li>
)

type CategoryHeroProps = {
  src: string
  alt: string
}

const CategoryHero = ({ src, alt }: CategoryHeroProps) => {
  const [errored, setErrored] = useState(false)
  if (errored) return null
  return (
    <div className="brochure-hero">
      <img src={src} alt={alt} loading="lazy" onError={() => setErrored(true)} />
    </div>
  )
}

export default Menu
