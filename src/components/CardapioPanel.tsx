import { FiX } from 'react-icons/fi'
import { menuImages, WHATSAPP_NUMBER } from '../data/content'
import { buildWhatsAppUrl } from '../utils/whatsapp'

type CardapioPanelProps = {
  open: boolean
  onClose: () => void
}

const message = 'Olá! Acabei de ver o cardápio do site e quero fazer um pedido.'

const CardapioPanel = ({ open, onClose }: CardapioPanelProps) => {
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

        <p className="cardapio-eyebrow">Menu Visual</p>
        <h2>Cardápio Clover Pub</h2>
        <p className="cardapio-description">
          Nossos taps giram semanalmente para oferecer sempre novos estilos. Os destaques abaixo
          apresentam as harmonizações e drinks autorais disponíveis via atendimento presencial ou
          pelo WhatsApp.
        </p>

        <div className="cardapio-grid">
          {menuImages.map((src, index) => (
            <figure key={src} className="cardapio-photo">
              <img src={src} alt={`Página do cardápio ${index + 1}`} loading="lazy" />
              <figcaption>Página {index + 1}</figcaption>
            </figure>
          ))}
        </div>

        <a
          className="cta whatsapp"
          href={buildWhatsAppUrl(message, WHATSAPP_NUMBER)}
          target="_blank"
          rel="noreferrer"
        >
          Pedir pelo WhatsApp
        </a>
      </div>
    </div>
  )
}

export default CardapioPanel

