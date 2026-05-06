import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { useToast } from '../../hooks/useToast.jsx'
import logoSrc from '../../../../../assets/logo.svg'

const NAV_ITEMS = [
  { id: 'operacoes',    label: 'Operações' },
  { id: 'frota',       label: 'Frota' },
  { id: 'telemetria',  label: 'Telemetria' },
  { id: 'relatorios',  label: 'Relatórios' },
  { id: 'configuracoes', label: 'Configurações' },
]

export default function Topbar() {
  const [activeNav, setActiveNav] = useState('operacoes')
  const showToast = useToast()

  function logout() {
    try { sessionStorage.removeItem('md-auth') } catch {}
    window.location.href = window.location.protocol === 'file:' 
      ? '../../site/login.html' 
      : '/minedebug/site/login.html'
  }

  function handleNav(e, item) {
    e.preventDefault()
    setActiveNav(item.id)
    if (item.id !== 'operacoes') showToast(`Módulo ${item.label} em desenvolvimento`)
  }

  return (
    <header className="topbar">
      <div className="topbar-brand">
        <img src={logoSrc} alt="" className="topbar-logo" style={{borderRadius: '50%'}} />
        <div className="topbar-wordmark">MINE<span>DEBUG</span></div>
      </div>
      <nav className="topbar-nav">
        {NAV_ITEMS.map(item => (
          <a
            key={item.id}
            href="#"
            className={activeNav === item.id ? 'active' : ''}
            onClick={e => handleNav(e, item)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="topbar-right">
        <div className="topbar-status">
          <span className="dot dot-ok" />
          <span className="t-mono">SISTEMA · OK</span>
        </div>
        <button className="topbar-logout" onClick={logout} title="Sair do painel">
          <LogOut size={16} />
        </button>
        <div className="topbar-avatar">RC</div>
      </div>
    </header>
  )
}
