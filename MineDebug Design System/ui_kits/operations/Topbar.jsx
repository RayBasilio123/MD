/* global React */
const { useState } = React;

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <img src="../../assets/logo.svg" alt="" className="topbar-logo" />
        <div className="topbar-wordmark">MINE<span>DEBUG</span></div>
      </div>
      <nav className="topbar-nav">
        <a className="active" href="#">Operações</a>
        <a href="#">Frota</a>
        <a href="#">Telemetria</a>
        <a href="#">Relatórios</a>
        <a href="#">Configurações</a>
      </nav>
      <div className="topbar-right">
        <div className="topbar-status">
          <span className="dot dot-ok" />
          <span className="t-mono">SISTEMA · OK</span>
        </div>
        <div className="topbar-user">
          <div className="topbar-avatar">RC</div>
        </div>
      </div>
    </header>
  );
}

window.Topbar = Topbar;
