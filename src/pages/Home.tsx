import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { FiCalendar, FiUsers, FiPhone, FiArrowRight } from 'react-icons/fi'
import { FaInstagram } from 'react-icons/fa'
import {
  PiBeerSteinBold,
  PiForkKnifeBold,
  PiFootballBold,
  PiMusicNotesBold,
} from 'react-icons/pi'
import { beerStyles, homeHighlights, WHATSAPP_NUMBER } from '../data/content'
import { openWhatsApp } from '../utils/whatsapp'
import { useHallOfFame } from '../hooks/useHallOfFame'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Home = () => {
  const [reservation, setReservation] = useState({
    name: '',
    phone: '',
    date: '',
    guests: 2,
  })
  const beerTrackRef = useRef<HTMLDivElement>(null)
  const heroSlides = ['/hero-slide-1.jpg', '/hero-slide-2.jpg']
  const [currentSlide, setCurrentSlide] = useState(0)
  const { entries: hallOfFame, loading: hallOfFameLoading } = useHallOfFame()
  useScrollReveal()

  const handleReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = [
      'Olá Clover Pub! Quero reservar uma mesa.',
      `Nome: ${reservation.name}`,
      `Celular: ${reservation.phone}`,
      `Data: ${reservation.date ? reservation.date.split('-').reverse().join('/') : 'a definir'}`,
      `Qtd. pessoas: ${reservation.guests}`,
    ].join('\n')

    openWhatsApp(message, WHATSAPP_NUMBER)
  }

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [heroSlides.length])

  const highlightIcons: Record<string, ReactNode> = {
    'Great Beer': <PiBeerSteinBold />,
    'Great Food': <PiForkKnifeBold />,
    'Great Sports': <PiFootballBold />,
    'Great Music': <PiMusicNotesBold />,
  }

  const scrollBeerTrack = (direction: 'left' | 'right') => {
    const container = beerTrackRef.current
    if (!container) return
    const amount = direction === 'left' ? -240 : 240
    container.scrollBy({ left: amount, behavior: 'smooth' })
  }

  type Highlight = (typeof homeHighlights)[number]
  const highlightRows: Highlight[][] = []
  for (let i = 0; i < homeHighlights.length; i += 2) {
    highlightRows.push(homeHighlights.slice(i, i + 2))
  }

  return (
    <div className="page home-page">
      {/* 1. Hero Slider */}
      <section className="hero-slider" aria-label="Galeria do Clover Pub">
        {heroSlides.map((src, index) => (
          <div
            key={src}
            className={`hero-slide ${index === currentSlide ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
            role="presentation"
          />
        ))}
        <div className="hero-slider-overlay">
          <p>Experiência completa no coração de Joinville</p>
        </div>
      </section>

      {/* 2. Reserva */}
      <section className="reservation reveal">
        <div>
          <p className="eyebrow">Faça sua reserva</p>
          <h2>Garanta sua mesa via WhatsApp</h2>
          <p>
            A confirmação acontece diretamente pelo atendimento. Após enviar, você será direcionado
            para o WhatsApp com os dados preenchidos.
          </p>
          <ul className="reservation-notes">
            <li>Reservas para eventos empresariais ou comemorações específicas</li>
            <li>Ambiente completo com música, esportes e gastronomia autoral</li>
            <li>Atendimento personalizado conforme a sua necessidade</li>
          </ul>
        </div>
        <form onSubmit={handleReservation} className="reservation-form">
          <label>
            <span>Nome</span>
            <input
              type="text"
              value={reservation.name}
              onChange={(event) => setReservation((prev) => ({ ...prev, name: event.target.value }))}
              required
              placeholder="Seu nome"
            />
          </label>
          <label>
            <span>Celular</span>
            <div className="input-icon">
              <FiPhone />
              <input
                type="tel"
                value={reservation.phone}
                onChange={(event) =>
                  setReservation((prev) => ({ ...prev, phone: event.target.value }))
                }
                required
                placeholder="(47) 99999-9999"
              />
            </div>
          </label>
          <label>
            <span>Data</span>
            <div className="input-icon">
              <FiCalendar />
              <input
                type="date"
                value={reservation.date}
                onChange={(event) =>
                  setReservation((prev) => ({ ...prev, date: event.target.value }))
                }
              />
            </div>
          </label>
          <label>
            <span>Quantas pessoas</span>
            <div className="input-icon">
              <FiUsers />
              <input
                type="number"
                min={1}
                max={60}
                value={reservation.guests}
                onChange={(event) =>
                  setReservation((prev) => ({ ...prev, guests: Number(event.target.value) }))
                }
              />
            </div>
          </label>
          <button className="cta primary" type="submit">
            Enviar e abrir WhatsApp
          </button>
          <p className="small">
            A reserva só é concluída após nossa confirmação pelo WhatsApp.
          </p>
        </form>
      </section>

      {/* 3. Hall da Fama */}
      <section className="hall-of-fame reveal">
        <p className="eyebrow">Hall da fama</p>
        <h2>nº de pints em uma noite</h2>
        {hallOfFameLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Carregando...</div>
        ) : (
          <div className="hall-grid">
            {hallOfFame.length > 0 ? (
              hallOfFame.map((person) => (
                <article key={person.id || person.name}>
                  <img src={person.image} alt={`Foto de ${person.name}`} loading="lazy" />
                  <div>
                    <h3>{person.name}</h3>
                    <p>{person.litters}L</p>
                  </div>
                </article>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                Nenhuma entrada no Hall da Fama ainda.
              </div>
            )}
          </div>
        )}
      </section>

      {/* 4. Hero text */}
      <section className="hero reveal">
        <p className="eyebrow">Desde 2015</p>
        <h1>Um tradicional pub europeu em Joinville</h1>
        <p className="lead">
          Inspirado nos bares clássicos da Inglaterra, Irlanda, Bélgica, Alemanha e Holanda. Tap
          list com rotação semanal, drinks autorais, cozinha comfort food e programação musical ao
          vivo.
        </p>
        <div className="hero-ctas">
          <button
            type="button"
            className="cta primary"
            onClick={() =>
              openWhatsApp('Olá! Quero fazer uma reserva.', WHATSAPP_NUMBER)
            }
          >
            Fazer reserva
          </button>
          <a className="cta ghost" href="#cervejas">
            Ver taps semanais
          </a>
        </div>
      </section>

      {/* 5. Highlights */}
      <section className="highlights reveal stagger">
        {highlightRows.map((row, index) => (
          <div key={`row-${index}`} className="highlight-row">
            {row.map((highlight) => (
              <article key={highlight.title} className="highlight-card">
                <div className="icon-circle" aria-hidden="true">
                  {highlightIcons[highlight.title]}
                </div>
                <div>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </div>
              </article>
            ))}
          </div>
        ))}
      </section>

      {/* 6. Experience */}
      <section className="experience reveal">
        <div>
          <p className="eyebrow">Experiência completa</p>
          <h2>Ambiente criado para transportar você aos pubs europeus</h2>
          <p>
            Duas pistas com atmosferas diferentes, cartas de cerveja e drinks em constante evolução
            e um time apaixonado por esportes, música e gastronomia.
          </p>
        </div>
      </section>

      {/* 7. Beer Carousel */}
      <section id="cervejas" className="beer-carousel reveal">
        <div className="beer-header">
          <p className="eyebrow">Cervejas da casa</p>
          <h2>Confira os estilos que passam pelos taps</h2>
          <p>
            Selecionamos rótulos das maiores escolas cervejeiras do mundo. A rotação acontece
            semanalmente para garantir novidades e frescor.
          </p>
        </div>
        <div className="beer-track-wrapper">
          <div className="beer-controls" aria-hidden="true">
            <button
              type="button"
              aria-label="Ver estilos anteriores"
              onClick={() => scrollBeerTrack('left')}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Ver próximos estilos"
              onClick={() => scrollBeerTrack('right')}
            >
              ›
            </button>
          </div>
          <div
            className="beer-track"
            role="list"
            aria-label="Estilos de cerveja"
            ref={beerTrackRef}
          >
            {beerStyles.map((style) => (
              <article key={style.name} role="listitem">
                <img src={style.image} alt={`Estilo ${style.name}`} loading="lazy" />
                <h3>{style.name}</h3>
                <p>{style.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Instagram */}
      <section className="instagram-section reveal">
        <div className="instagram-card">
          <FaInstagram className="instagram-icon" />
          <p className="eyebrow">Siga-nos no Instagram</p>
          <h2>@cloverpub</h2>
          <p>
            Acompanhe nossa programação, bastidores, novidades do tap e momentos especiais no pub.
          </p>
          <a
            href="https://instagram.com/cloverpub"
            target="_blank"
            rel="noopener noreferrer"
            className="cta primary"
          >
            Seguir no Instagram <FiArrowRight />
          </a>
        </div>
      </section>

      {/* 9. CTA Banner */}
      <section className="cta-banner reveal">
        <h2>Come and Share — Great Moments With Great People</h2>
        <button
          type="button"
          className="cta primary"
          onClick={() =>
            openWhatsApp('Olá! Quero saber da programação do Clover Pub.', WHATSAPP_NUMBER)
          }
        >
          Programação completa <FiArrowRight />
        </button>
      </section>
    </div>
  )
}

export default Home

