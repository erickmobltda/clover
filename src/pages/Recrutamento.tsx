import { type FormEvent, useState } from 'react'
import { recruitmentHighlights, WHATSAPP_NUMBER } from '../data/content'
import { openWhatsApp } from '../utils/whatsapp'

const Recrutamento = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
    city: '',
    portfolio: '',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = [
      'Olá Clover Pub! Gostaria de fazer parte da equipe.',
      `Nome: ${form.name}`,
      `Telefone/WhatsApp: ${form.phone}`,
      `E-mail: ${form.email}`,
      `Vaga de interesse: ${form.role}`,
      `Cidade: ${form.city}`,
      `Currículo/Portfólio: ${form.portfolio || 'Envio na sequência.'}`,
    ].join('\n')

    openWhatsApp(message, WHATSAPP_NUMBER)
  }

  return (
    <div className="page recrutamento-page">
      <section className="subpage-hero">
        <p className="eyebrow">Recrutamento</p>
        <h1>Venha fazer parte da nossa equipe</h1>
        <p>
          Buscamos pessoas apaixonadas por hospitalidade, cerveja artesanal, gastronomia e música.
          Envie seu contato pelo formulário que direcionaremos para o WhatsApp e seguiremos o
          processo por lá.
        </p>
      </section>

      <section className="recruitment-grid">
        <div>
          <h2>Por que trabalhar no Clover Pub?</h2>
          <ul>
            {recruitmentHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
          </label>
          <label>
            <span>Telefone com WhatsApp</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              required
            />
          </label>
          <label>
            <span>E-mail</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
          </label>
          <label>
            <span>Vaga de interesse</span>
            <input
              type="text"
              value={form.role}
              onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
              placeholder="Bartender, cozinha, atendimento, produção..."
              required
            />
          </label>
          <label>
            <span>Cidade</span>
            <input
              type="text"
              value={form.city}
              onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
              required
            />
          </label>
          <label>
            <span>Link do currículo ou portfólio</span>
            <input
              type="url"
              value={form.portfolio}
              onChange={(event) => setForm((prev) => ({ ...prev, portfolio: event.target.value }))}
              placeholder="Drive, LinkedIn ou site pessoal"
            />
          </label>
          <button className="cta primary" type="submit">
            Enviar pelo WhatsApp
          </button>
          <p className="small">Caso precise anexar um arquivo, envie após abrir o WhatsApp.</p>
        </form>
      </section>
    </div>
  )
}

export default Recrutamento

