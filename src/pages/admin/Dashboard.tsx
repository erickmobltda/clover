import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useAuth } from '../../contexts/AuthContext'
import HallOfFameManager from '../../components/admin/HallOfFameManager'
import MenuManager from '../../components/admin/MenuManager'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'hall' | 'menu'>('hall')

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/admin')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', color: '#333' }}>
      <header style={{
        backgroundColor: '#134a32',
        color: 'white',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '14px' }}>{user.email}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          borderBottom: '2px solid #ddd'
        }}>
          <button
            onClick={() => setActiveTab('hall')}
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'hall' ? '#134a32' : 'transparent',
              color: activeTab === 'hall' ? 'white' : '#134a32',
              border: 'none',
              borderBottom: activeTab === 'hall' ? '3px solid #c6a15b' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            Hall of Fame
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'menu' ? '#134a32' : 'transparent',
              color: activeTab === 'menu' ? 'white' : '#134a32',
              border: 'none',
              borderBottom: activeTab === 'menu' ? '3px solid #c6a15b' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            Menu
          </button>
        </div>

        {activeTab === 'hall' && <HallOfFameManager />}
        {activeTab === 'menu' && <MenuManager />}
      </div>
    </div>
  )
}

export default Dashboard

