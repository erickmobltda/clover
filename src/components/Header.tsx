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
          {/* Home link */}
          {navLinks.slice(0, 1).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          {/* Cardapio button */}
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
          {/* Other nav links */}
          {navLinks.slice(1).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header

