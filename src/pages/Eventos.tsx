import { type ReactNode } from 'react'
import { PiBeerSteinBold, PiChairBold, PiMicrophoneBold, PiTelevisionBold } from 'react-icons/pi'
import { MdOutlineMusicNote } from 'react-icons/md'
import { eventResources, WHATSAPP_NUMBER } from '../data/content'
import { openWhatsApp } from '../utils/whatsapp'

const iconMap: Record<string, ReactNode> = {
  '60 lugares em mesas': <PiChairBold />,
  'Auditório para 50 pessoas': <PiMicrophoneBold />,
  'Projetor + tela 80"': <PiTelevisionBold />,
  'Palco para apresentações': <MdOutlineMusicNote />,
  'Cardápio personalizável': <PiBeerSteinBold />,
}

const Eventos = () => (
  <div className="page eventos-page">
    <section className="subpage-hero">
      <p className="eyebrow">Eventos</p>
      <h1>Realize seu evento conosco</h1>
      <p>
        Reservamos o pub inteiro ou apenas um dos pavimentos para empresas, casamentos intimistas,
        aniversários, meetups e lançamentos. Nossa equipe cuida do cardápio, som, ambientação e
        atendimento para você focar no momento.
      </p>
      <div className="hero-ctas">
        <button
          type="button"
          className="cta primary"
          onClick={() =>
            openWhatsApp(
              'Olá! Quero reservar o Clover Pub para um evento. Pode me ajudar?',
              WHATSAPP_NUMBER,
            )
          }
        >
          Solicitar proposta
        </button>
      </div>
    </section>

    <section className="event-resources">
      {eventResources.map((item) => (
        <article key={item.title}>
          <div className="event-resource-icon" aria-hidden="true">
            {iconMap[item.title] ?? <PiChairBold />}
          </div>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </section>

    <section className="cta-banner">
      <h2>Come and Share — Great Moments With Great People</h2>
      <p>
        Conte para a gente qual é a ocasião. Montamos um formato sob medida com welcome drink,
        taplist exclusivo e ativações no palco.
      </p>
      <button
        type="button"
        className="cta primary"
        onClick={() =>
          openWhatsApp('Oi! Quero conhecer os pacotes de eventos do Clover Pub.', WHATSAPP_NUMBER)
        }
      >
        Falar com o time
      </button>
    </section>
  </div>
)

export default Eventos

