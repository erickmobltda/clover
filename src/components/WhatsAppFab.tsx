import { FiMessageCircle } from 'react-icons/fi'
import { WHATSAPP_NUMBER } from '../data/content'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const WhatsAppFab = () => (
  <a
    className="whatsapp-fab"
    href={buildWhatsAppUrl('Olá, estava navegando no site e quero saber mais!', WHATSAPP_NUMBER)}
    target="_blank"
    rel="noreferrer"
  >
    <FiMessageCircle size={24} />
    <span>Falar no WhatsApp</span>
  </a>
)

export default WhatsAppFab

