# MineDebug — Arquitetura SaaS IoT e Roadmap de Produto

> Documento vivo. Atualizar conforme decisões técnicas e comerciais evoluírem.

---

## 1. Visão do produto

Plataforma SaaS industrial para mineração:  
sensores embarcados em equipamentos pesados → telemetria em tempo real → dashboard web → alertas e relatórios de consumo de diesel e eficiência.

**Modelo de receita:** assinatura mensal por equipamento monitorado (SaaS B2B).  
**Público:** gestores de frotas e engenheiros de campo em mineradoras de pequeno/médio porte.

---

## 2. Arquitetura alvo

```
╔══════════════════════════════════════════════════════════════╗
║  CAMPO                                                       ║
║                                                              ║
║  [Sensor embarcado]  ──CAN/UART──►  [Gateway de campo]      ║
║  ESP32 / STM32                       RPi / Gateway 4G        ║
║  • Consumo diesel                    • Buffer local          ║
║  • RPM / carga                       • TLS mutual auth       ║
║  • Temperatura motor                 • Retry / queue         ║
║  • Vibração                                                  ║
╚══════════════════════════════════════╦═══════════════════════╝
                                       │ MQTT over TLS (4G/LTE)
╔══════════════════════════════════════▼═══════════════════════╗
║  INGESTÃO                                                    ║
║                                                              ║
║  AWS IoT Core  (MQTT Broker gerenciado)                      ║
║  • Autenticação por certificado X.509 por dispositivo        ║
║  • IoT Rule Engine → roteia tópicos para workers             ║
╚══════════════════════════════════════╦═══════════════════════╝
                                       │
╔══════════════════════════════════════▼═══════════════════════╗
║  PROCESSAMENTO                                               ║
║                                                              ║
║  Node.js Worker (Lambda / ECS)                               ║
║  • Validação e normalização de payloads                      ║
║  • Detecção de alertas (threshold, anomalia simples)         ║
║  • Agregação: janelas de 1 min, 1 h, 1 dia                   ║
║  • Publicação no Redis Pub/Sub → WebSocket                   ║
╚══════════════════════════════════════╦═══════════════════════╝
                                       │
╔══════════════════════════════════════▼═══════════════════════╗
║  ARMAZENAMENTO                                               ║
║                                                              ║
║  TimescaleDB (PostgreSQL)  ← dados de série temporal         ║
║    tabelas: sensor_readings, aggregations, alerts            ║
║                                                              ║
║  PostgreSQL (RDS)  ← dados relacionais                       ║
║    tabelas: organizations, equipment, users, contracts       ║
║                                                              ║
║  Redis  ← cache real-time + pub/sub para WebSocket           ║
╚══════════════════════════════════════╦═══════════════════════╝
                                       │
╔══════════════════════════════════════▼═══════════════════════╗
║  API / BACKEND                                               ║
║                                                              ║
║  Node.js + Express (ou Fastify)                              ║
║  • REST: /v1/equipment, /v1/metrics, /v1/alerts, /v1/reports ║
║  • WebSocket: stream de telemetria em tempo real             ║
║  • Auth: JWT + refresh token (httpOnly cookie)               ║
║  • Multi-tenant: row-level isolation por organization_id     ║
║  • Rate limiting por plano de assinatura                     ║
╚══════════════════════════════════════╦═══════════════════════╝
                                       │
╔══════════════════════════════════════▼═══════════════════════╗
║  FRONTEND                                                    ║
║                                                              ║
║  site/index.html   → marketing / captação                    ║
║  site/login.html   → autenticação → redireciona ao dashboard ║
║  ui_kits/operations/ → dashboard React                       ║
║    • Conectar à API REST (trocar mock data)                   ║
║    • WebSocket para atualização em tempo real                ║
║    • Sistema de alertas com notificação push                 ║
╚══════════════════════════════════════════════════════════════╝
```

### Stack recomendada (MVP)

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Firmware | C / MicroPython (ESP32) | Baixo consumo, amplo suporte |
| Protocolo campo→nuvem | MQTT over TLS | Padrão industrial IoT, baixo overhead |
| Broker | AWS IoT Core | Gerenciado, escala, certificados X.509 |
| Backend API | Node.js + Fastify | Mesma linguagem do frontend, rápido |
| Série temporal | TimescaleDB | PostgreSQL extension, sem novo infra |
| Relacional | PostgreSQL (Supabase para MVP) | Auth + DB gerenciados, custo zero no início |
| Cache / RT | Redis (Upstash para MVP) | Pub/sub serverless, custo por uso |
| Frontend | React + Vite (já existe) | Já implementado |
| Infra | Vercel (frontend) + Railway ou Render (API) | Deploy simples para MVP |
| Auth | Supabase Auth | JWT + RLS nativo no PostgreSQL |
| CI/CD | GitHub Actions | Já usa GitHub |

---

## 3. Modelo de dados (simplificado)

```sql
-- Organizações (clientes mineradoras)
organizations (id, name, cnpj, plan, created_at)

-- Equipamentos
equipment (id, org_id, code, type, model, location, active)
-- ex: code = "CAM-407", type = "caminhão"

-- Leituras dos sensores (TimescaleDB hypertable)
sensor_readings (time, equipment_id, metric, value, unit)
-- ex: metric = "fuel_rate_lph", value = 42.3

-- Alertas
alerts (id, equipment_id, type, severity, message, triggered_at, resolved_at)

-- Usuários
users (id, org_id, email, role, created_at)
-- roles: admin | engineer | viewer
```

---

## 4. Fluxo de dados — exemplo real

```
1. Sensor no CAM-407 lê consumo: 43.2 L/h a cada 10s
2. Gateway empacota em JSON e publica MQTT:
   tópico: minedebug/{org_id}/{equipment_id}/telemetry
   payload: { "ts": 1234567890, "fuel_lph": 43.2, "rpm": 1820 }
3. AWS IoT Core recebe → aciona Rule → invoca Lambda worker
4. Worker valida → grava em TimescaleDB → publica no Redis
5. Redis Pub/Sub notifica API WebSocket
6. Dashboard do engenheiro atualiza em tempo real
7. Se fuel_lph > threshold → cria alerta → notifica por email/push
```

---

## 5. Status atual — O que já está feito

### Design system ✅
- `colors_and_type.css` — todos os tokens de cor, tipografia, espaçamento
- 17 cards de showcase (`preview/`)
- Logo SVG reconstruída (`assets/logo.svg`)

### Site institucional ✅
- `site/index.html` — landing page completa (hero, soluções, equipe, apoiadores, CTA)
- `site/login.html` — formulário de login (estático, sem backend)
- Dark/light mode com persistência no localStorage
- Responsivo (mobile, tablet, desktop)
- Deploy no Vercel: https://md-seven-green.vercel.app

### Dashboard de operações ✅ (mock data)
- `ui_kits/operations/` — React + Vite
- Componentes: `Topbar`, `Sidebar`, `MetricCard`, `FleetTable`, `AlertList`
- Dark mode nativo
- Dados mockados — **não conectado a nenhum backend real**

### Assets ✅
- Fotos da equipe (diretores + bolsistas)
- Logos de apoiadores (FAPEMIG, ITV Vale, UFOP, Incultec, CSN, PURO)
- Vídeo institucional 15s

---

## 6. O que falta construir

### Fase 1 — MVP Backend (prioridade imediata)

- [ ] **Supabase project** — criar org, configurar tabelas `organizations`, `equipment`, `users`
- [ ] **Auth real no login.html** — integrar Supabase Auth (email + senha), JWT, redirect ao dashboard
- [ ] **API REST mínima** — Node.js + Fastify no Railway:
  - `GET /v1/equipment` — lista de equipamentos da org
  - `GET /v1/metrics/:equipment_id?from=&to=` — histórico de métricas
  - `GET /v1/alerts` — alertas ativos
- [ ] **Dashboard conectado** — trocar mock data dos componentes React pela API real
- [ ] **Proteção de rota** — dashboard só acessível com JWT válido

### Fase 2 — Ingestão IoT simulada

- [ ] **Simulador de sensor** — script Node.js que publica MQTT simulando um equipamento
- [ ] **AWS IoT Core** — criar broker, certificados, regras de roteamento
- [ ] **Worker de ingestão** — Lambda ou worker Node.js que consome MQTT → grava no TimescaleDB
- [ ] **TimescaleDB** — adicionar extensão no Supabase ou provisionar instância separada
- [ ] **WebSocket no dashboard** — atualização em tempo real dos cards de telemetria

### Fase 3 — Alertas e relatórios

- [ ] **Motor de alertas** — thresholds configuráveis por equipamento
- [ ] **Notificações** — email (Resend) + push (Web Push API)
- [ ] **Relatório de consumo** — PDF exportável com dados do período (jsPDF ou Puppeteer)
- [ ] **Página de configuração** — cadastro de equipamentos e thresholds pelo admin

### Fase 4 — Multi-tenant e billing

- [ ] **Onboarding de cliente** — fluxo de criação de organização + primeiro equipamento
- [ ] **Planos de assinatura** — free (1 equip), starter (10), pro (ilimitado)
- [ ] **Billing** — integração Stripe para cobrança recorrente
- [ ] **Painel admin interno** — MineDebug vê todos os clientes e equipamentos

### Fase 5 — Hardware real

- [ ] **Firmware ESP32** — protocolo MQTT, buffer offline, OTA update
- [ ] **Gateway de campo** — configuração RPi, watchdog, 4G failover
- [ ] **Certificados X.509** — provisionamento automático por dispositivo
- [ ] **Protocolo CAN Bus** — leitura dos dados reais do motor

---

## 7. Próximos passos imediatos (esta semana)

1. Criar projeto no Supabase (gratuito)
2. Implementar auth real no `login.html` → redireciona para `/dashboard`
3. Criar endpoint `GET /v1/equipment` com dados reais
4. Substituir mock data do `FleetTable.jsx` pela API

---

## 8. Infraestrutura de custo zero para MVP

| Serviço | Plano gratuito | Limite |
|---|---|---|
| Vercel | Hobby | Deploy frontend ilimitado |
| Supabase | Free | 500 MB DB, 50k req/mês, Auth incluído |
| Railway | Trial $5 crédito | API Node.js |
| Upstash Redis | Free | 10k req/dia |
| AWS IoT Core | Free tier | 250k mensagens/mês |
| Resend | Free | 3k emails/mês |

MVP completo com **custo $0/mês** até escalar para clientes pagantes.
