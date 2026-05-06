import { useState } from 'react'
import { X, Radio, Fuel, Gauge, Cpu, Play } from 'lucide-react'
import { DIAG_STEPS } from '../../data/mock.js'
import { useToast } from '../../hooks/useToast.jsx'

const ICON_MAP = { Radio, Fuel, Gauge, Cpu }

function DiagStep({ step, status }) {
  const Icon = ICON_MAP[step.icon]
  return (
    <div className="diag-step">
      <div className="diag-icon">{Icon && <Icon size={14} />}</div>
      <span className="diag-label">{step.label}</span>
      <span className={`diag-status ${status.cls}`}>{status.text}</span>
    </div>
  )
}

export default function DiagModal({ open, onClose }) {
  const showToast = useToast()
  const [statuses, setStatuses] = useState({})
  const [running, setRunning] = useState(false)

  function reset() {
    setStatuses({})
    setRunning(false)
  }

  function handleClose() {
    if (running) return
    onClose()
    setTimeout(reset, 300)
  }

  function run() {
    if (running) return
    setRunning(true)
    DIAG_STEPS.forEach((step, i) => {
      setTimeout(() => {
        setStatuses(prev => ({ ...prev, [step.id]: { cls: 'running', text: 'VERIFICANDO...' } }))
        setTimeout(() => {
          setStatuses(prev => ({ ...prev, [step.id]: { cls: 'ok', text: step.result } }))
          if (i === DIAG_STEPS.length - 1) {
            setRunning(false)
            showToast('Diagnóstico concluído — todos os sistemas OK')
          }
        }, 900)
      }, i * 1100)
    })
  }

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && handleClose()}>
      <div className="modal">
        <div className="modal-head">
          <h2>Iniciar diagnóstico</h2>
          <button className="modal-close" onClick={handleClose}><X size={18} /></button>
        </div>
        {DIAG_STEPS.map(step => (
          <DiagStep
            key={step.id}
            step={step}
            status={statuses[step.id] || { cls: 'pending', text: 'AGUARDANDO' }}
          />
        ))}
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={handleClose} disabled={running}>Cancelar</button>
          <button className="btn btn-primary" onClick={run} disabled={running}>
            <Play size={14} />
            {running ? 'Executando...' : 'Executar'}
          </button>
        </div>
      </div>
    </div>
  )
}
