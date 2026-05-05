/* global React */

function Sparkline({ data, color = "#19E27A", width = 120, height = 32 }) {
  if (!data || !data.length) return null;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const path = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * height;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{display:"block"}}>
      <defs>
        <linearGradient id={`sp-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#sp-${color.replace("#","")})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

function MetricCard({ eyebrow, label, value, unit, delta, deltaDir = "down", isGood = true, spark, sparkColor }) {
  const arrow = deltaDir === "down" ? "↓" : "↑";
  const color = isGood ? "var(--status-ok)" : "var(--status-err)";
  return (
    <div className="metric-card">
      <div className="metric-head">
        <span className="t-eyebrow">{eyebrow}</span>
        {spark && <Sparkline data={spark} color={sparkColor || "#19E27A"} />}
      </div>
      <div className="metric-label">{label}</div>
      <div className="metric-value t-num">
        {value}<span className="metric-unit">{unit ? ` ${unit}` : ""}</span>
      </div>
      {delta && (
        <div className="metric-delta t-mono" style={{color}}>
          {arrow} {delta}
        </div>
      )}
    </div>
  );
}

window.MetricCard = MetricCard;
window.Sparkline = Sparkline;
