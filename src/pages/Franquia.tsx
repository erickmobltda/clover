import { type FormEvent, useState } from 'react'
import { WHATSAPP_NUMBER } from '../data/content'
import { openWhatsApp } from '../utils/whatsapp'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Franquia = () => {
  useScrollReveal()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    investment: '',
    city: '',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = [
      'Olá Clover Pub! Tenho interesse em abrir uma franquia.',
      `Nome Completo: ${form.name}`,
      `Telefone/WhatsApp: ${form.phone}`,
      `E-mail: ${form.email}`,
      `Idade: ${form.age}`,
      `Recurso financeiro disponível: ${form.investment}`,
      `Cidade que deseja implementar: ${form.city}`,
    ].join('\n')

    openWhatsApp(message, WHATSAPP_NUMBER)
  }

  const benefits = [
    'Acompanhamento Mensal por Indicadores',
    'Know-How de 10 anos de business gastronômico',
    'Treinamento de sua equipe por Time de Lideranças Clover',
    'Produtos Exclusivos para alavancar sua vendas',
    'Processos práticos e funcionais',
    'Auxílio em negociação das compras',
    'Ótima Relação Investimento/Faturamento',
    'Benchmark financeiro entre unidades',
  ]

  return (
    <div className="page franquia-page">
      <section className="subpage-hero">
        <p className="eyebrow">Franquia</p>
        <h1>Venha fazer parte da Cultura Clover com Franqueado!</h1>
        <p>
          Com um modelo de negócio amplamente testado ao longo dos nossos 10 anos de história,
          oferecemos know-how técnico de todos os processos operacionais além de auxílio na sua gestão
          com central de indicadores própria e benchmark entre unidades.
        </p>
      </section>

      <section className="franquia-benefits reveal">
        <div>
          <h2>Benefícios da franquia Clover</h2>
          <ul>
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="franquia-model reveal">
        <div className="model-card">
          <h2>Modelo: Pub Completo</h2>
          <p className="model-price">A partir de R$ 600.000</p>
          <ul>
            <li>Espaço de 300m²</li>
            <li>Implantação</li>
            <li>1ª Compra Inclusa</li>
            <li>Taxa de Franquia Inclusa</li>
            <li>Obra Civil inclusa*</li>
          </ul>
          <p className="small" style={{ marginTop: '1rem' }}>
            *Estimativa para reforma de imóvel já existente
          </p>
        </div>
      </section>

      <section className="cta-banner">
        <h2>Payback a partir de 18 meses com Royalties de 3 a 5%</h2>
      </section>

      <section className="franquia-form-section reveal">
        <div>
          <h2>Tenho interesse em abrir uma franquia</h2>
          <p>
            Preencha o formulário abaixo com seus dados e entraremos em contato via WhatsApp para
            conversarmos sobre sua oportunidade de fazer parte da Cultura Clover.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="franquia-form">
          <label>
            <span>Nome Completo</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              required
              placeholder="Seu nome completo"
            />
          </label>
          <label>
            <span>Telefone com WhatsApp</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              required
              placeholder="(47) 99999-9999"
            />
          </label>
          <label>
            <span>E-mail</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              required
              placeholder="seu@email.com"
            />
          </label>
          <label>
            <span>Idade</span>
            <input
              type="number"
              value={form.age}
              onChange={(event) => setForm((prev) => ({ ...prev, age: event.target.value }))}
              required
              min="18"
              placeholder="Sua idade"
            />
          </label>
          <label>
            <span>Recurso financeiro disponível</span>
            <input
              type="text"
              value={form.investment}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, investment: event.target.value }))
              }
              required
              placeholder="Ex: R$ 600.000 a R$ 800.000"
            />
          </label>
          <label>
            <span>Cidade que deseja implementar</span>
            <input
              type="text"
              value={form.city}
              onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
              required
              placeholder="Nome da cidade"
            />
          </label>
          <button className="cta primary" type="submit">
            Enviar pelo WhatsApp
          </button>
          <p className="small">
            Após enviar, você será direcionado para o WhatsApp com os dados preenchidos.
          </p>
        </form>
      </section>
    </div>
  )
}

export default Franquia

