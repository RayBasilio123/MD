export const FLEET = [
  { id: 'CAM-407', model: 'Cat 793F',       status: 'ok',   consumo: 38.4, baseline: 47.0, dose: 'OK',   sensor: 'ONLINE', co2: -118, lastMs: 4 },
  { id: 'CAM-412', model: 'Cat 793F',       status: 'ok',   consumo: 41.2, baseline: 47.0, dose: 'OK',   sensor: 'ONLINE', co2: -94,  lastMs: 2 },
  { id: 'CAM-219', model: 'Cat 785D',       status: 'err',  consumo: null, baseline: 42.0, dose: '—',    sensor: 'OFF',    co2: 0,    lastMs: 720 },
  { id: 'CAM-301', model: 'Komatsu 830E',   status: 'ok',   consumo: 52.1, baseline: 61.0, dose: 'OK',   sensor: 'ONLINE', co2: -210, lastMs: 6 },
  { id: 'CAM-318', model: 'Komatsu 830E',   status: 'warn', consumo: 58.7, baseline: 61.0, dose: 'FORA', sensor: 'ONLINE', co2: -42,  lastMs: 8 },
  { id: 'CAM-405', model: 'Cat 793F',       status: 'ok',   consumo: 39.8, baseline: 47.0, dose: 'OK',   sensor: 'ONLINE', co2: -99,  lastMs: 5 },
  { id: 'CAM-510', model: 'Cat 777G',       status: 'ok',   consumo: 28.1, baseline: 33.0, dose: 'OK',   sensor: 'ONLINE', co2: -72,  lastMs: 3 },
  { id: 'PC-1250-A', model: 'Komatsu PC1250', status: 'warn', consumo: 71.4, baseline: 75.0, dose: 'FORA', sensor: 'ONLINE', co2: -34, lastMs: 9 },
]

export const ALERTS = [
  { id: 1, kind: 'err',  title: 'Sensor offline',                    detail: 'CAM-219 · MD-220',        time: '12 min',   icon: 'WifiOff' },
  { id: 2, kind: 'warn', title: 'Dosagem fora da faixa',             detail: 'PC-1250-A · linha 2',     time: '4 min',    icon: 'AlertTriangle' },
  { id: 3, kind: 'warn', title: 'Consumo elevado',                   detail: 'CAM-318 · 58.7 L/h',     time: '8 min',    icon: 'TrendingUp' },
  { id: 4, kind: 'ok',   title: 'Calibração concluída',              detail: 'CAM-407',                 time: '32 min',   icon: 'CheckCircle' },
  { id: 5, kind: 'info', title: 'Atualização firmware MD-220 v3.2',  detail: 'Programada · 03:00',      time: '1h 12min', icon: 'Download' },
]

export const METRICS = [
  { eyebrow: 'CONSUMO MÉDIO 24H', label: 'Frota total',         value: '42.6', unit: 'L/h', delta: '12.4% vs baseline', deltaDir: 'down', isGood: true,  spark: [52,50,49,51,48,47,46,45,44,43,42,41,40,39,38], sparkColor: '#19E27A' },
  { eyebrow: 'CO₂ EVITADO 24H',  label: 'Mês corrente',        value: '1 284', unit: 'kg', delta: '8.1%',             deltaDir: 'up',   isGood: true,  spark: [40,60,55,80,90,85,110,130,125,150,170,165,180,200,215], sparkColor: '#19E27A' },
  { eyebrow: 'FROTA ATIVA',      label: 'Equipamentos online',  value: '128',  unit: '/142', delta: '3 desde ontem',  deltaDir: 'up',   isGood: true,  spark: [120,122,125,124,126,128,127,128,130,128], sparkColor: '#4DA3FF' },
  { eyebrow: 'ALERTAS ABERTOS',  label: 'Últimas 4h',          value: '3',    unit: '',     delta: '2 críticos',     deltaDir: 'up',   isGood: false, spark: [2,3,1,4,2,5,3,4,3,3], sparkColor: '#F25C54' },
]

export const DIAG_STEPS = [
  { id: 'connectivity', icon: 'Radio',       label: 'Conectividade dos sensores',     result: 'OK — 142/142 sensores online' },
  { id: 'dosage',       icon: 'Fuel',        label: 'Linha de dosagem de aditivo',   result: 'OK — pressão 2.4 bar' },
  { id: 'calibration',  icon: 'Gauge',       label: 'Calibração de consumo',         result: 'OK — desvio ±0.3%' },
  { id: 'firmware',     icon: 'Cpu',         label: 'Firmware dos módulos embarcados', result: 'OK — v2.4.1 atualizado' },
]
