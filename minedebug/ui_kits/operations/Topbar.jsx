/* global React */
const { useState } = React;

function Topbar() {
  const [activeNav, setActiveNav] = useState('operacoes');

  function logout() {
    try { sessionStorage.removeItem('md-auth'); } catch(e) {}
    window.location.href = '../../site/login.html';
  }

  function handleNav(e, id, label) {
    e.preventDefault();
    setActiveNav(id);
    if (id !== 'operacoes' && window.showToast) {
      window.showToast('Módulo ' + label + ' em desenvolvimento');
    }
  }

  const navItems = [
    { id: 'operacoes', label: 'Operações' },
    { id: 'frota', label: 'Frota' },
    { id: 'telemetria', label: 'Telemetria' },
    { id: 'relatorios', label: 'Relatórios' },
    { id: 'configuracoes', label: 'Configurações' },
  ];

  return (
    <header className="topbar">
      <div className="topbar-brand">
        <img src="../../assets/logo.svg" alt="" className="topbar-logo" style={{borderRadius:'50%'}} />
        <div className="topbar-wordmark">MINE<span>DEBUG</span></div>
      </div>
      <nav className="topbar-nav">
        {navItems.map(item => (
          <a
            key={item.id}
            href="#"
            className={activeNav === item.id ? 'active' : ''}
            onClick={e => handleNav(e, item.id, item.label)}
          >{item.label}</a>
        ))}
      </nav>
      <div className="topbar-right">
        <div className="topbar-status">
          <span className="dot dot-ok" />
          <span className="t-mono">SISTEMA · OK</span>
        </div>
        <button className="topbar-logout" onClick={logout} title="Sair do painel">
          <i data-lucide="log-out" />
        </button>
        <div className="topbar-avatar">RC</div>
      </div>
    </header>
  );
}

window.Topbar = Topbar;
