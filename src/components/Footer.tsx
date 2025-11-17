import { FiClock, FiMapPin, FiPhone } from 'react-icons/fi'
import { contactInfo } from '../data/content'

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-item">
      <span className="footer-icon">
        <FiClock />
      </span>
      <div>
        <p className="footer-eyebrow">Horário</p>
        <p>{contactInfo.hours}</p>
      </div>
    </div>

    <div className="footer-logo">
      <img src="/logo-footer.png" alt="Clover Pub" />
    </div>

    <div className="footer-contact">
      <a className="footer-item" href={contactInfo.phoneHref}>
        <span className="footer-icon">
          <FiPhone />
        </span>
        <div>
          <p className="footer-eyebrow">Contato</p>
          <p>{contactInfo.phoneLabel}</p>
        </div>
      </a>
      <a className="footer-item" href={contactInfo.mapsHref} target="_blank" rel="noreferrer">
        <span className="footer-icon">
          <FiMapPin />
        </span>
        <div>
          <p className="footer-eyebrow">Endereço</p>
          <p>{contactInfo.addressLabel}</p>
        </div>
      </a>
    </div>
  </footer>
)

export default Footer

