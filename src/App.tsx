import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import CardapioPanel from './components/CardapioPanel'
import Footer from './components/Footer'
import Header from './components/Header'
import WhatsAppFab from './components/WhatsAppFab'
import Eventos from './pages/Eventos'
import Franquia from './pages/Franquia'
import Home from './pages/Home'
import Recrutamento from './pages/Recrutamento'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminRoute from './pages/admin/AdminRoute'

const App = () => {
  const [cardapioOpen, setCardapioOpen] = useState(false)

  return (
    <div className="app-shell">
      <Routes>
        {/* Admin routes - no header/footer */}
        <Route path="/admin" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        {/* Public routes */}
        <Route
          path="/*"
          element={
            <>
              <a className="skip-link" href="#conteudo-principal">
                Ir para o conteúdo
              </a>
              <Header onOpenCardapio={() => setCardapioOpen(true)} />
              <main id="conteudo-principal" className="page-wrapper">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/eventos" element={<Eventos />} />
                  <Route path="/recrutamento" element={<Recrutamento />} />
                  <Route path="/franquia" element={<Franquia />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppFab />
              <CardapioPanel open={cardapioOpen} onClose={() => setCardapioOpen(false)} />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
