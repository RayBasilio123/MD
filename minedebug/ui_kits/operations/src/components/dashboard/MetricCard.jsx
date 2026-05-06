function Sparkline({ data, color = '#19E27A', width = 120, height = 32 }) {
  if (!data?.length) return null
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)
  const pts = data.map((v, i) => ({ x: i * step, y: height - ((v - min) / range) * height }))
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const area = `${path} L ${width} ${height} L 0 ${height} Z`
  const gradId = `sp-${color.replace('#', '')}`
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

export default function MetricCard({ eyebrow, label, value, unit, delta, deltaDir = 'down', isGood = true, spark, sparkColor }) {
  const arrow = deltaDir === 'down' ? '↓' : '↑'
  const deltaColor = isGood ? 'var(--status-ok)' : 'var(--status-err)'
  return (
    <div className="metric-card">
      <div className="metric-head">
        <span className="t-eyebrow">{eyebrow}</span>
        {spark && <Sparkline data={spark} color={sparkColor} />}
      </div>
      <div className="metric-label">{label}</div>
      <div className="metric-value t-num">
        {value}<span className="metric-unit">{unit ? ` ${unit}` : ''}</span>
      </div>
      {delta && (
        <div className="metric-delta t-mono" style={{ color: deltaColor }}>
          {arrow} {delta}
        </div>
      )}
    </div>
  )
}
