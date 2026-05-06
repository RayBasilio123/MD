/* global React, lucide */
const { useEffect, useState } = React;

function Sidebar({ active: initialActive = "fleet" }) {
  const [active, setActive] = useState(initialActive);
  useEffect(() => { if (window.lucide) lucide.createIcons(); });

  const items = [
    { id: "overview",  label: "Visão geral",  icon: "layout-dashboard" },
    { id: "fleet",     label: "Frota",         icon: "truck", count: 142 },
    { id: "alerts",    label: "Alertas",       icon: "alert-triangle", count: 3, badge: "warn" },
    { id: "telemetry", label: "Telemetria",    icon: "activity" },
    { id: "diesel",    label: "Diesel & CO₂",  icon: "fuel" },
    { id: "sensors",   label: "Sensores",      icon: "cpu" },
    { id: "maint",     label: "Manutenção",    icon: "wrench" },
    { id: "sites",     label: "Minas",         icon: "map-pin" },
  ];

  function handleClick(e, item) {
    e.preventDefault();
    setActive(item.id);
    if (item.id !== 'fleet' && window.showToast) {
      window.showToast('Módulo ' + item.label + ' em desenvolvimento');
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="t-eyebrow sidebar-heading">Operação</div>
        {items.slice(0,4).map(it => (
          <a key={it.id} href="#" onClick={e => handleClick(e, it)} className={"sidebar-item " + (it.id === active ? "active" : "")}>
            <i data-lucide={it.icon} />
            <span className="sidebar-label">{it.label}</span>
            {it.count != null && (
              <span className={"sidebar-count " + (it.badge || "")}>{it.count}</span>
            )}
          </a>
        ))}
      </div>
      <div className="sidebar-section">
        <div className="t-eyebrow sidebar-heading">Análise</div>
        {items.slice(4).map(it => (
          <a key={it.id} href="#" onClick={e => handleClick(e, it)} className={"sidebar-item " + (it.id === active ? "active" : "")}>
            <i data-lucide={it.icon} />
            <span className="sidebar-label">{it.label}</span>
          </a>
        ))}
      </div>
      <div className="sidebar-foot">
        <div className="t-mono sidebar-site">MINA · CARAJÁS / SETOR 4</div>
        <div className="t-micro" style={{color:"var(--md-ink-400)"}}>v2.4.1 · build 2026.05.04</div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
