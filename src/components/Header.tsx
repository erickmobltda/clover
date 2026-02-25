import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { openWhatsApp } from '../utils/whatsapp'
import { WHATSAPP_NUMBER } from '../data/content'

const navLinks = [
  { label: 'Cardápio', path: '/menu' },
  { label: 'Eventos', path: '/eventos' },
  { label: 'Recrutamento', path: '/recrutamento' },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="header-logo-link" aria-label="Voltar para a home">
          <img src="/logo-header.png" alt="Clover European Pub" className="header-logo" />
        </Link>
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
              openWhatsApp('Olá! Gostaria de falar com o Clover Pub.', WHATSAPP_NUMBER)
            }}
          >
            Fale Conosco
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
