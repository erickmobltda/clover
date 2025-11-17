import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import CardapioPanel from './components/CardapioPanel'
import Footer from './components/Footer'
import Header from './components/Header'
import WhatsAppFab from './components/WhatsAppFab'
import Eventos from './pages/Eventos'
import Home from './pages/Home'
import Recrutamento from './pages/Recrutamento'

const App = () => {
  const [cardapioOpen, setCardapioOpen] = useState(false)

  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo-principal">
        Ir para o conteúdo
      </a>
      <Header onOpenCardapio={() => setCardapioOpen(true)} />
      <main id="conteudo-principal" className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/recrutamento" element={<Recrutamento />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
      <CardapioPanel open={cardapioOpen} onClose={() => setCardapioOpen(false)} />
    </div>
  )
}

export default App
