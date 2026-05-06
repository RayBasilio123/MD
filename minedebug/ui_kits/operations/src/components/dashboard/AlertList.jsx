import { WifiOff, AlertTriangle, TrendingUp, CheckCircle, Download } from 'lucide-react'
import { ALERTS } from '../../data/mock.js'

const ICONS = { WifiOff, AlertTriangle, TrendingUp, CheckCircle, Download }

export default function AlertList() {
  return (
    <div className="alert-list">
      {ALERTS.map(a => {
        const Icon = ICONS[a.icon]
        return (
          <div key={a.id} className={`alert-item alert-${a.kind}`}>
            <div className="alert-icon">{Icon && <Icon size={14} />}</div>
            <div className="alert-body">
              <div className="alert-title">{a.title}</div>
              <div className="alert-detail t-mono">{a.detail}</div>
            </div>
            <div className="alert-time t-mono">{a.time}</div>
          </div>
        )
      })}
    </div>
  )
}
