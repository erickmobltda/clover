import { contactInfo } from '../data/content'

const Footer = () => (
  <footer className="site-footer">
    <div>
      <p className="footer-eyebrow">Horário</p>
      <p>{contactInfo.hours}</p>
    </div>
    <div>
      <p className="footer-eyebrow">Contato</p>
      <a href={contactInfo.phoneHref}>{contactInfo.phoneLabel}</a>
    </div>
    <div>
      <p className="footer-eyebrow">Endereço</p>
      <a href={contactInfo.mapsHref} target="_blank" rel="noreferrer">
        {contactInfo.addressLabel}
      </a>
    </div>
  </footer>
)

export default Footer

