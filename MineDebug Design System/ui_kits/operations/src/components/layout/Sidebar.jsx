import { useState } from 'react'
import {
  LayoutDashboard, Truck, AlertTriangle, Activity,
  Fuel, Cpu, Wrench, MapPin
} from 'lucide-react'
import { useToast } from '../../hooks/useToast.jsx'

const SECTIONS = [
  {
    label: 'Operação',
    items: [
      { id: 'overview',  label: 'Visão geral', Icon: LayoutDashboard },
      { id: 'fleet',     label: 'Frota',        Icon: Truck,          count: 142 },
      { id: 'alerts',    label: 'Alertas',      Icon: AlertTriangle,  count: 3, badge: 'warn' },
      { id: 'telemetry', label: 'Telemetria',   Icon: Activity },
    ],
  },
  {
    label: 'Análise',
    items: [
      { id: 'diesel',  label: 'Diesel & CO₂', Icon: Fuel },
      { id: 'sensors', label: 'Sensores',     Icon: Cpu },
      { id: 'maint',   label: 'Manutenção',   Icon: Wrench },
      { id: 'sites',   label: 'Minas',        Icon: MapPin },
    ],
  },
]

export default function Sidebar() {
  const [active, setActive] = useState('fleet')
  const showToast = useToast()

  function handleClick(item) {
    setActive(item.id)
    if (item.id !== 'fleet') showToast(`Módulo ${item.label} em desenvolvimento`)
  }

  return (
    <aside className="sidebar">
      {SECTIONS.map(section => (
        <div key={section.label} className="sidebar-section">
          <div className="t-eyebrow sidebar-heading">{section.label}</div>
          {section.items.map(item => (
            <button
              key={item.id}
              className={`sidebar-item${active === item.id ? ' active' : ''}`}
              onClick={() => handleClick(item)}
            >
              <item.Icon size={16} />
              <span className="sidebar-label">{item.label}</span>
              {item.count != null && (
                <span className={`sidebar-count${item.badge ? ' ' + item.badge : ''}`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      ))}
      <div className="sidebar-foot">
        <div className="t-mono sidebar-site">MINA · CARAJÁS / SETOR 4</div>
        <div className="t-micro" style={{ color: 'var(--md-ink-400)' }}>v2.4.1 · build 2026.05.04</div>
      </div>
    </aside>
  )
}
