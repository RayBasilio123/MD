import { useState } from 'react'
import Topbar from './components/layout/Topbar.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import MetricCard from './components/dashboard/MetricCard.jsx'
import FleetTable from './components/dashboard/FleetTable.jsx'
import AlertList from './components/dashboard/AlertList.jsx'
import DiagModal from './components/ui/DiagModal.jsx'
import { ToastProvider } from './hooks/useToast.jsx'
import { METRICS } from './data/mock.js'

function Dashboard() {
  const [diagOpen, setDiagOpen] = useState(false)

  function exportar() {
    const rows = [
      ['ID', 'Modelo', 'Status', 'Consumo L/h', 'CO2 evitado kg', 'Última leitura'],
      ['CAM-407', 'Cat 793F', 'ONLINE', '38.4', '-118', '4s'],
      ['CAM-412', 'Cat 793F', 'ONLINE', '41.2', '-94', '2s'],
      ['CAM-219', 'Cat 785D', 'OFFLINE', '—', '—', '12min'],
      ['CAM-301', 'Komatsu 830E', 'ONLINE', '52.1', '-210', '6s'],
      ['CAM-318', 'Komatsu 830E', 'ALERTA', '58.7', '-42', '8s'],
      ['CAM-405', 'Cat 793F', 'ONLINE', '39.8', '-99', '5s'],
      ['CAM-510', 'Cat 777G', 'ONLINE', '28.1', '-72', '3s'],
      ['PC-1250-A', 'Komatsu PC1250', 'ALERTA', '71.4', '-34', '9s'],
    ]
    const csv = rows.map(r => r.join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = Object.assign(document.createElement('a'), { href: url, download: 'frota-caraja-setor4.csv' })
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Topbar onExport={exportar} onDiag={() => setDiagOpen(true)} />
      <div className="shell">
        <Sidebar />
        <main className="main">
          <div className="page-head">
            <div>
              <div className="sub">Operações · ao vivo</div>
              <h1>Frota · Carajás Setor 4</h1>
            </div>
            <div className="actions">
              <button className="btn btn-ghost" onClick={exportar}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Exportar
              </button>
              <button className="btn btn-primary" onClick={() => setDiagOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Iniciar diagnóstico
              </button>
            </div>
          </div>

          <div className="metrics">
            {METRICS.map((m, i) => <MetricCard key={i} {...m} />)}
          </div>

          <div className="content">
            <div className="panel">
              <div className="panel-head">
                <h3>Equipamentos</h3>
                <div className="filter">
                  <button className="filter-btn active">TODOS</button>
                  <button className="filter-btn">ONLINE</button>
                  <button className="filter-btn">ALERTA</button>
                </div>
              </div>
              <FleetTable />
            </div>
            <div className="panel">
              <div className="panel-head">
                <h3>Alertas recentes</h3>
                <span className="t-mono" style={{ fontSize: 10, color: 'var(--md-ink-400)' }}>5 ITENS</span>
              </div>
              <AlertList />
            </div>
          </div>
        </main>
      </div>
      <DiagModal open={diagOpen} onClose={() => setDiagOpen(false)} />
    </>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <Dashboard />
    </ToastProvider>
  )
}
