/* global React */
const { useState: useStateFT } = React;

const FLEET = [
  { id: "CAM-407", model: "Cat 793F", status: "ok",   consumo: 38.4, baseline: 47.0, dose: "OK",   sensor: "ONLINE", co2: -118, lastMs: 4 },
  { id: "CAM-412", model: "Cat 793F", status: "ok",   consumo: 41.2, baseline: 47.0, dose: "OK",   sensor: "ONLINE", co2: -94,  lastMs: 2 },
  { id: "CAM-219", model: "Cat 785D", status: "err",  consumo: null, baseline: 42.0, dose: "—",    sensor: "OFF",    co2: 0,    lastMs: 720 },
  { id: "CAM-301", model: "Komatsu 830E", status: "ok", consumo: 52.1, baseline: 61.0, dose: "OK", sensor: "ONLINE", co2: -210, lastMs: 6 },
  { id: "CAM-318", model: "Komatsu 830E", status: "warn", consumo: 58.7, baseline: 61.0, dose: "FORA", sensor: "ONLINE", co2: -42, lastMs: 8 },
  { id: "CAM-405", model: "Cat 793F",  status: "ok",  consumo: 39.8, baseline: 47.0, dose: "OK",   sensor: "ONLINE", co2: -99, lastMs: 5 },
  { id: "CAM-510", model: "Cat 777G",  status: "ok",  consumo: 28.1, baseline: 33.0, dose: "OK",   sensor: "ONLINE", co2: -72, lastMs: 3 },
  { id: "PC-1250-A", model: "Komatsu PC1250", status: "warn", consumo: 71.4, baseline: 75.0, dose: "FORA", sensor: "ONLINE", co2: -34, lastMs: 9 },
];

function StatusDot({ status }) {
  const map = { ok: "ok", warn: "warn", err: "err", off: "off" };
  return <span className={`dot dot-${map[status] || "off"}`} />;
}

function DoseChip({ value }) {
  if (value === "OK") return <span className="chip chip-ok t-mono">OK</span>;
  if (value === "FORA") return <span className="chip chip-warn t-mono">FORA</span>;
  return <span className="chip chip-off t-mono">—</span>;
}

function SensorChip({ value }) {
  if (value === "ONLINE") return <span className="chip chip-ok t-mono"><span className="dot dot-ok"/>ONLINE</span>;
  return <span className="chip chip-err t-mono"><span className="dot dot-err"/>OFF</span>;
}

function FleetTable({ onSelect }) {
  const [selected, setSelected] = useStateFT("CAM-407");
  return (
    <div className="fleet-table">
      <div className="fleet-thead t-eyebrow">
        <span style={{width: 28}}/>
        <span style={{flex: "0 0 110px"}}>Equipamento</span>
        <span style={{flex: 1}}>Modelo</span>
        <span style={{flex: "0 0 110px", textAlign: "right"}}>Consumo</span>
        <span style={{flex: "0 0 90px", textAlign: "right"}}>Baseline</span>
        <span style={{flex: "0 0 80px", textAlign: "center"}}>Dosagem</span>
        <span style={{flex: "0 0 110px", textAlign: "center"}}>Sensor</span>
        <span style={{flex: "0 0 100px", textAlign: "right"}}>CO₂ 24h</span>
        <span style={{flex: "0 0 70px", textAlign: "right"}}>Última</span>
      </div>
      {FLEET.map(row => (
        <div
          key={row.id}
          className={"fleet-row " + (selected === row.id ? "selected" : "")}
          onClick={() => { setSelected(row.id); onSelect && onSelect(row); }}
        >
          <span style={{width: 28}}><StatusDot status={row.status} /></span>
          <span style={{flex: "0 0 110px"}} className="t-mono fleet-id">{row.id}</span>
          <span style={{flex: 1}} className="fleet-model">{row.model}</span>
          <span style={{flex: "0 0 110px", textAlign: "right"}} className="t-num">
            {row.consumo != null ? `${row.consumo.toFixed(1)} L/h` : "—"}
          </span>
          <span style={{flex: "0 0 90px", textAlign: "right"}} className="t-num fleet-baseline">
            {row.baseline.toFixed(1)}
          </span>
          <span style={{flex: "0 0 80px", textAlign: "center"}}><DoseChip value={row.dose}/></span>
          <span style={{flex: "0 0 110px", textAlign: "center"}}><SensorChip value={row.sensor}/></span>
          <span style={{flex: "0 0 100px", textAlign: "right"}} className="t-num" style={{flex: "0 0 100px", textAlign: "right", color: row.co2 < 0 ? "var(--status-ok)" : "var(--fg-3)"}}>
            {row.co2 ? `${row.co2} kg` : "—"}
          </span>
          <span style={{flex: "0 0 70px", textAlign: "right"}} className="t-mono fleet-last">
            {row.lastMs < 60 ? `${row.lastMs}s` : `${Math.round(row.lastMs/60)}m`}
          </span>
        </div>
      ))}
    </div>
  );
}

window.FleetTable = FleetTable;
window.FLEET_DATA = FLEET;
