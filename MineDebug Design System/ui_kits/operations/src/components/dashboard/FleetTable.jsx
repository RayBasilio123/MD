import { useState } from 'react'
import { FLEET } from '../../data/mock.js'

function StatusDot({ status }) {
  return <span className={`dot dot-${status}`} />
}

function DoseChip({ value }) {
  if (value === 'OK')   return <span className="chip chip-ok t-mono">OK</span>
  if (value === 'FORA') return <span className="chip chip-warn t-mono">FORA</span>
  return <span className="chip chip-off t-mono">—</span>
}

function SensorChip({ value }) {
  if (value === 'ONLINE') return <span className="chip chip-ok t-mono"><span className="dot dot-ok" />ONLINE</span>
  return <span className="chip chip-err t-mono"><span className="dot dot-err" />OFF</span>
}

function formatLast(ms) {
  return ms < 60 ? `${ms}s` : `${Math.round(ms / 60)}m`
}

export default function FleetTable({ onSelect }) {
  const [selected, setSelected] = useState('CAM-407')

  function handleClick(row) {
    setSelected(row.id)
    onSelect?.(row)
  }

  return (
    <div className="fleet-table">
      <div className="fleet-thead t-eyebrow">
        <span style={{ width: 28 }} />
        <span style={{ flex: '0 0 110px' }}>Equipamento</span>
        <span style={{ flex: 1 }}>Modelo</span>
        <span style={{ flex: '0 0 110px', textAlign: 'right' }}>Consumo</span>
        <span style={{ flex: '0 0 90px',  textAlign: 'right' }}>Baseline</span>
        <span style={{ flex: '0 0 80px',  textAlign: 'center' }}>Dosagem</span>
        <span style={{ flex: '0 0 110px', textAlign: 'center' }}>Sensor</span>
        <span style={{ flex: '0 0 100px', textAlign: 'right' }}>CO₂ 24h</span>
        <span style={{ flex: '0 0 70px',  textAlign: 'right' }}>Última</span>
      </div>
      {FLEET.map(row => (
        <div
          key={row.id}
          className={`fleet-row${selected === row.id ? ' selected' : ''}`}
          onClick={() => handleClick(row)}
        >
          <span style={{ width: 28 }}><StatusDot status={row.status} /></span>
          <span style={{ flex: '0 0 110px' }} className="t-mono fleet-id">{row.id}</span>
          <span style={{ flex: 1 }} className="fleet-model">{row.model}</span>
          <span style={{ flex: '0 0 110px', textAlign: 'right' }} className="t-num">
            {row.consumo != null ? `${row.consumo.toFixed(1)} L/h` : '—'}
          </span>
          <span style={{ flex: '0 0 90px', textAlign: 'right' }} className="t-num fleet-baseline">
            {row.baseline.toFixed(1)}
          </span>
          <span style={{ flex: '0 0 80px', textAlign: 'center' }}><DoseChip value={row.dose} /></span>
          <span style={{ flex: '0 0 110px', textAlign: 'center' }}><SensorChip value={row.sensor} /></span>
          <span
            className="t-num"
            style={{ flex: '0 0 100px', textAlign: 'right', color: row.co2 < 0 ? 'var(--status-ok)' : 'var(--fg-3)' }}
          >
            {row.co2 ? `${row.co2} kg` : '—'}
          </span>
          <span style={{ flex: '0 0 70px', textAlign: 'right' }} className="t-mono fleet-last">
            {formatLast(row.lastMs)}
          </span>
        </div>
      ))}
    </div>
  )
}
