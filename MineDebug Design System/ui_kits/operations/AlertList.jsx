/* global React */
const ALERTS = [
  { id: 1, kind: "err",  title: "Sensor offline",   detail: "CAM-219 · MD-220",        time: "12 min", icon: "wifi-off" },
  { id: 2, kind: "warn", title: "Dosagem fora da faixa", detail: "PC-1250-A · linha 2", time: "4 min",  icon: "alert-triangle" },
  { id: 3, kind: "warn", title: "Consumo elevado",  detail: "CAM-318 · 58.7 L/h",     time: "8 min",  icon: "trending-up" },
  { id: 4, kind: "ok",   title: "Calibração concluída", detail: "CAM-407",            time: "32 min", icon: "check-circle" },
  { id: 5, kind: "info", title: "Atualização firmware MD-220 v3.2", detail: "Programada · 03:00", time: "1h 12min", icon: "download" },
];

function AlertList() {
  return (
    <div className="alert-list">
      {ALERTS.map(a => (
        <div key={a.id} className={"alert-item alert-" + a.kind}>
          <div className="alert-icon"><i data-lucide={a.icon}/></div>
          <div className="alert-body">
            <div className="alert-title">{a.title}</div>
            <div className="alert-detail t-mono">{a.detail}</div>
          </div>
          <div className="alert-time t-mono">{a.time}</div>
        </div>
      ))}
    </div>
  );
}

window.AlertList = AlertList;
