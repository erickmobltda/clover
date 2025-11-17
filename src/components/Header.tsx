import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

type HeaderProps = {
  onOpenCardapio: () => void
}

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Eventos', path: '/eventos' },
  { label: 'Recrutamento', path: '/recrutamento' },
]

const Header = ({ onOpenCardapio }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <Link to="/">
            <span className="brand-title">Clover Pub</span>
            <span className="brand-subtitle">Pub europeu em Joinville</span>
          </Link>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Alternar menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        <nav className={`primary-nav ${isOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            className="cardapio-link"
            type="button"
            onClick={() => {
              closeMenu()
              onOpenCardapio()
            }}
          >
            Cardápio
          </button>
        </nav>

        <button
          className="cardapio-cta"
          type="button"
          onClick={onOpenCardapio}
        >
          Cardápio
        </button>
      </div>
    </header>
  )
}

export default Header

