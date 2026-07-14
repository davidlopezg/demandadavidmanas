# SDD Spec — Sistema Multi-Agente Jurídico

**Change:** multi-agente-juridico  
**Phase:** spec  
**Status:** in_progress  
**Depends on:** proposal  
**Started:** 2026-07-14

---

## 1. Visión General del Sistema

### 1.1 Purpose

Sistema multi-agente jurídico que analiza un caso desde múltiples ángulos especializados, genera un expediente estructurado con citación obligatoria, produce demanda y defensa, y simula el debate adversarial antes de emitir conclusiones.

### 1.2 Principios Arquitectónicos

| Principio | Implementación |
|-----------|---------------|
| **Never invent** | Regla de oro: toda afirmación requiere fuente |
| **Adversarial first** | Destruir antes de construir |
| **Traceable** | Cada hecho citable tiene provenance completo |
| **Separation of concerns** | Cada agente tiene rol único y delimitado |
| **Auditability** | Todo se versiona en Git |

---

## 2. Arquitectura de Agentes

### 2.1 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────┐
│                      ORCHESTRATOR (Parent Session)                │
│  - SDD state machine                                           │
│  - Phase coordination                                          │
│  - Result synthesis                                            │
│  - Rule enforcement (citation, no-invention)                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐  ┌────────────────┐  ┌─────────────────┐
│  NotebookLM   │  │  Agent Pool    │  │  File System    │
│  MCP Client   │  │  (LLM Calls)  │  │  (Markdown)     │
│               │  │               │  │                 │
│  Tools:       │  │  - instructor │  │  openspec/      │
│  - ask_q      │  │  - actress    │  │  ├─ expediente/ │
│  - list_src   │  │  - david      │  │  ├─ demanda/    │
│  - add_src    │  │  - judge      │  │  ├─ defensa/    │
│  - generate_* │  │  - auditor    │  │  └─ auditoria/  │
│               │  │               │  │                 │
└───────────────┘  └────────────────┘  └─────────────────┘
```

### 2.2 Agent Definitions

#### Agent: instructor

```yaml
name: instructor
description: Constructor del expediente maestro desde documentos brutos
role: fact-builder
model: default  # Puede ser cualquier LLM con contexto suficiente

inputs:
  - raw_documents: folder path or NotebookLM notebook_id
  - case_context: { party_a, party_b, relationship, dispute_type }

outputs:
  - expediente-maestro.md
  - cronologia.md
  - hechos-clasificados.md
  - matriz-pruebas.md
  - lagunas.md

process:
  1. receive_documents()
  2. classify_by_type()
  3. build_timeline()
  4. classify_facts_by_proof_level()
  5. detect_gaps()
  6. generate_matrix()

rules:
  - citation_mandatory: true
  - no_invention: true
  - classify_proof_level: [A, B, C, D]
  - mark_unproven: "[SIN PRUEBA SUFICIENTE]"
```

#### Agent: abogado-actora

```yaml
name: abogado-actora
description: Abogado agresor que construye la demanda más sólida
role: plaintiff-attorney
model: default

inputs:
  - expediente-maestro.md (from instructor)
  - normativa: { codigo_civil, lec, lau, fiscal }

outputs:
  - demanda-v1.md
  - busqueda-jurisprudencial.md
  - puntos-debiles-autocritica.md
  - pruebas-necesarias.md

process:
  1. analyze_expediente()
  2. identify_strong_facts()
  3. search_jurisprudence()
  4. draft_demanda()
  5. propose_additional_evidence()
  6. self_criticize()

rules:
  - citation_mandatory: true
  - cite_normativa: true
  - cite_jurisprudence: true
  - mark_weak_arguments: true
```

#### Agent: abogado-david

```yaml
name: abogado-david
description: Destructor que intenta destruir la demanda antes de emitirse
role: defense-destroyer
model: default

inputs:
  - expediente-maestro.md (from instructor)
  - demanda-v1.md (from abogado-actora)

outputs:
  - informe-destruccion.md
  - contradicciones.md
  - reconvenciones.md
  - defensa-prevista.md
  - preguntas-para-vista.md

process:
  1. read_demanda()
  2. attack_each_claim()
  3. find_contradictions()
  4. propose_counterclaims()
  5. explore_procedural_defenses()
  6. generate_top_10_attacks()

rules:
  - citation_mandatory: true
  - adversarial_mode: true
  - attack_every_claim: true
  - no_invention: true
```

#### Agent: juez

```yaml
name: juez
description: Evaluador neutral que simula perspectiva judicial
role: neutral-evaluator
model: default

inputs:
  - expediente-maestro.md
  - demanda-v1.md
  - informe-destruccion.md
  - auditoria-numerica.md

outputs:
  - hechos-probados.md
  - hechos-rechazados.md
  - pruebas-debiles.md
  - preguntas-vista.md
  - veredicto-simulado.md

process:
  1. read_all()
  2. evaluate_proof_levels()
  3. identify_weak_evidence()
  4. generate_questions()
  5. simulate_verdict()

rules:
  - neutral: true
  - pragmatic: true
  - no_favoritism: true
  - doubt_benefits_defendant: true
```

#### Agent: auditor

```yaml
name: auditor
description: Verificador numérico puro, sin opiniones jurídicas
role: numeric-verifier
model: default

inputs:
  - facturas: folder or notebook
  - transferencias: bank statements
  - contrato: rental agreement

outputs:
  - auditoria-rentas.md
  - auditoria-facturas.md
  - hallazgos.md
  - saldo-provisional.md

process:
  1. audit_rentas()
  2. audit_facturas()
  3. cross_reference_documents()
  4. detect_anomalies()
  5. calculate_balance()

rules:
  - no_legal_opinion: true
  - math_only: true
  - cite_document_for_each_number: true
  - mark_unverifiable: "[IMPORTE NO VERIFICABLE]"
```

---

## 3. Data Model

### 3.1 Folder Structure

```
demanda-juridica/
├── openspec/
│   ├── config.yaml
│   ├── sdd/
│   │   └── multi-agente-juridico/
│   │       ├── explore.md
│   │       ├── proposal.md
│   │       └── spec.md
│   └── session-preflight.md
├── cases/
│   └── {case-id}/
│       ├── expediente/
│       │   ├── expediente-maestro.md
│       │   ├── cronologia.md
│       │   ├── hechos-clasificados.md
│       │   ├── matriz-pruebas.md
│       │   └── lagunas.md
│       ├── demanda/
│       │   ├── demanda-v1.md
│       │   ├── demanda-final.md
│       │   └── busqueda-jurisprudencial.md
│       ├── defensa/
│       │   ├── informe-destruccion.md
│       │   ├── contradicciones.md
│       │   ├── reconvenciones.md
│       │   └── defensa-prevista.md
│       ├── evaluacion/
│       │   ├── hechos-probados.md
│       │   ├── veredicto-simulado.md
│       │   └── preguntas-vista.md
│       ├── auditoria/
│       │   ├── auditoria-rentas.md
│       │   ├── auditoria-facturas.md
│       │   ├── hallazgos.md
│       │   └── saldo-provisional.md
│       └── debate/
│           ├── ronda1.md
│           ├── ronda2.md
│           └── ronda3.md
├── documents/
│   ├── contratos/
│   ├── correspondencia/
│   ├── mensajes/
│   ├── facturas/
│   └── pruebas/
├── normativa/
│   ├── codigo-civil.md
│   ├── lec.md
│   └── lau.md
└── notebooks/  # Sync con NotebookLM
    └── {case-id}/
        ├── notebook-id.txt
        └── sources.md
```

### 3.2 Document Schemas

#### Expediente Maestro

```yaml
expediente-maestro:
  metadata:
    case_id: string
    created: datetime
    updated: datetime
    version: string
  
  partes:
    - tipo: actor | demandado
      nombre: string
      identificacion: string
      representacion: string?
  
  contrato:
    tipo: subarrendamiento
    fecha_firma: date
    partes: [party_a, party_b]
    Claúsulas_relevantes:
      - numero: string
        texto: string
        analisis: string
  
  cronologia:
    - fecha: date | "NO DOCUMENTADA"
      hecho: string
      fuente: string[]
      nivel_prueba: A | B | C | D
  
  hechos:
    - id: HECHO-XXX
      descripcion: string
      nivel_prueba: A | B | C | D
      fuentes: Citation[]
      sin_prueba: boolean
  
  lagunas:
    - descripcion: string
      criticidad: alta | media | baja
      forma_de_verificar: string?
  
  matriz_pruebas:
    - hecho_id: string
      documento: string
      demuestra: string
      nivel: A | B | C | D
```

#### Cita Documental (Citation)

```yaml
Citation:
  tipo: email | whatsapp | factura | contrato | normativa | jurisprudencia
  id: string  # ej: D1, D2
  fecha: date?
  origen: string  # archivo o NotebookLM source
  excerpto: string
  nivel_prueba: A | B | C | D
  url?: string  # Para NotebookLM sources
```

#### Demanda

```yaml
demanda:
  header:
    jurisdiccion: civil
    Juzgado: string
    tipo: procedimiento-ordinario | verbal
  
  partes:
    actor: Parte
    demandado: Parte
  
  hechos:
    - id: HECHO-XXX
      texto: string
      fuentes: Citation[]
  
  fundamentos_derecho:
    - tipo: contractual | legal | jurisprudencial
      norma?: string  # Artículo exacto
      jurisprudencia?: string  #STS
      aplicacion: string
  
  procedimiento:
    - etapa: string
      fecha: date
      descripcion: string
  
  pretensiones:
    - tipo: principal | subsidiaria
      concepto: string
      importe?: number
      fundamento: string
  
  pruebas:
    - tipo: documental | testifical | pericial | interrogatorio
      descripcion: string
      hechos_demo: string[]
```

---

## 4. NotebookLM Integration

### 4.1 MCP Server Setup (Desktop)

```bash
# En desktop (con Chrome instalado)
npm install -g notebooklm-mcp

# Autenticación (solo primera vez)
notebooklm-mcp setup_auth

# Arrancar servidor HTTP
notebooklm-mcp --transport http --port 3000
```

### 4.2 Pi MCP Client Configuration

```yaml
# Pi ~/.pi/agent/mcp-servers.json
{
  "mcpServers": {
    "notebooklm": {
      "command": "http",
      "url": "http://<desktop-ip>:3000/mcp",
      "transport": "streamable-http"
    }
  }
}
```

### 4.3 Tool Usage by Agent

| Tool | Instructor | Abog. Actora | Abog. David | Judge | Auditor |
|------|------------|--------------|-------------|-------|---------|
| `ask_question` | ✓ (alta) | ✓ (media) | ✓ (alta) | ✓ (baja) | ✓ (media) |
| `list_notebooks` | ✓ | ✓ | ✓ | — | — |
| `select_notebook` | ✓ | ✓ | ✓ | — | — |
| `add_source` | ✓ | — | — | — | — |
| `get_source_fulltext` | ✓ | — | — | — | — |

### 4.4 Notebook Strategy

```
Un notebook por CASO:
  Notebook ID: {case-id}-expediente
  Contains:
    - All documents (emails, WhatsApp, facturas)
    - Contract
    - Normativa (for reference)
    
Queries por agente:

INSTRUCTOR:
  "Dame todos los mensajes cronológicamente"
  "Extrae los hechos sobre el cambio de cerradura"
  "Resume los emails de reclamación"

ABOGADO ACTORA:
  "Busca jurisprudencia sobre goce pacífico en LAU"
  "Casos similares de cambio unilateral de cerradura"
  "Requisitos para probar incumplimiento contractual"

ABOGADO DAVID:
  "Mensajes donde se menciona 'no tenía prisa'"
  "Emails de la actora reconociendo retrasos"
  "Facturas de suministros impagados"

AUDITOR:
  "Sumas de facturas por mes"
  "Detecta errores de IVA en facturas"
```

---

## 5. Process Flow

### 5.1 Pipeline Principal

```
┌─────────────────────────────────────────────────────────────────┐
│                    FASE 0: PREPARACIÓN                           │
│  1. Usuario sube documentos → /documents/                        │
│  2. Usuario crea notebook en NotebookLM y comparte               │
│  3. Instructor consulta: "Dame estructura del caso"              │
│  4. Instructor clasifica y organiza                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FASE 1: EXPEDIENTE                            │
│  Instructor → Genera expediente-maestro.md                       │
│  - Cronología completa                                          │
│  - Hechos clasificados por nivel                                │
│  - Matriz de pruebas                                            │
│  - Lagunas detectadas                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  FASE 2A        │ │  FASE 2B        │ │  FASE 2C        │
│  Abogado Actora │ │  Abogado David  │ │  Auditor        │
│  → Demanda v1   │ │  → Destrucción  │ │  → Auditoria    │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FASE 3: DEBATE ADVERSARIAL                    │
│  Ronda 2: David ataca → Actora responde → Instructor actualiza  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FASE 4: EVALUACIÓN                            │
│  Juez → Lee todo → Veredicto + Preguntas                       │
│  Instructor → Genera versión final                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FASE 5: OUTPUTS FINALES                       │
│  - demanda-final.md                                             │
│  - defensa-prevista.md                                          │
│  - veredicto-juez.md                                           │
│  - preguntas-vista.md                                           │
│  - puntos-debiles.md                                           │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Ronda Adversarial Detallada

```
RONDA 2: DEBATE ADVERSARIAL

Step 1: ABOGADO DAVID genera informe-destruccion.md
  → Para cada claims de la demanda:
    - Identifica punto débil
    - Proporciona contrargumento
    - Cita fuente contradictoria

Step 2: ABOGADO ACTORA responde
  → Para cada ataque de David:
    - Reconoce debilidad o niega
    - Proporciona respuesta
    - Refuerza argumento si posible

Step 3: INSTRUCTOR actualiza expediente
  → Añade nuevas citas
  → Marca hechos que siguen sin prueba
  → Actualiza matriz de riesgos

Step 4: JUEZ evalúa
  → Para cada punto en disputa:
    - ¿Quién tiene razón?
    - ¿Qué admitiré en juicio?
    - ¿Qué peso daré a cada prueba?

Step 5: AUDITOR verifica
  → ¿Los números cuadran?
  → ¿Hay facturas faltantes?
  → ¿El saldo es correcto?
```

---

## 6. Citation System

### 6.1 Citation Format Specification

```markdown
## Formato de Cita Obligatoria

### Cita Documental
```
[D1] Email del {fecha}
Origen: {archivo} | NotebookLM: {notebook}
Excerpto: "{texto relevante}"
Nivel: 🟢 A | 🟡 B | 🟠 C | 🔴 D
```

### Cita Normativa
```
[N1] {Articulo} {Ley}
Texto: "{extracto relevante}"
Aplicación: {como aplica al caso}
```

### Cita Jurisprudencial
```
[J1] {STS}, {fecha}, {ponente}
Hechos: {resumen}
Doctrina: {principio}
Aplicación: {como aplica}
```

### Cita Compuesta (para hechos complejos)
```
[HECHO-XXX] {Descripcion}

DOCUMENTAL:
  [D1] Email del {fecha} — "{excerpto}"
  [D2] WhatsApp del {fecha} — "{excerpto}"

NORMATIVA:
  [N1] {articulo}

JURISPRUDENCIAL:
  [J1] {STS}

ANALISIS:
  Este hecho está 🟢 PROBADO con nivel A.
  La combinación de D1 y D2 forma un cuerpo coherente.
```

### 6.2 Marcadores de Insuficiencia

```markdown
## Cuando NO hay prueba suficiente

⚠️ EVIDENCIA INSUFICIENTE

| Elemento | Estado |
|----------|--------|
| Fecha del cambio | [NO DOCUMENTADA] |
| Duración sin acceso | [NO DOCUMENTADA] |
| Notificación previa | [NO EXISTE EMAIL] |

CONSECUENCIA:
→ Este hecho NO puede usarse como probado.
→ No incluir en demanda.
```

---

## 7. Version Control

### 7.1 Git Strategy

```bash
# Rama por caso
git checkout -b case/FOODAY-vs-MANAS

# Commits por fase
git commit -m "feat: expediente maestro v1"
git commit -m "feat: demanda v1"
git commit -m "feat: destruccion david"
git commit -m "feat: debate adversarial"
git commit -m "feat: veredicto juez"
git commit -m "feat: demanda final"

# Tags por versión
git tag -a v1.0 -m "Demanda lista para revisión"
git tag -a v2.0 -m "Post-debate adversarial"
```

### 7.2 Version Metadata in Documents

```markdown
---
document: expediente-maestro
case: FOODAY-vs-MANAS
version: 3
created: 2026-07-14
updated: 2026-07-14T16:30:00Z
author: instructor
status: draft | review | final
parent_version: 2
changelog:
  - v3: Añadido análisis de contradicciones post-debate
  - v2: Corregido nivel de prueba de HECHO-042
  - v1: Versión inicial
---
```

---

## 8. Acceptance Criteria

### 8.1 Instructor

- [ ] Genera cronología con fechas de todos los documentos
- [ ] Clasifica cada hecho con nivel de prueba (A/B/C/D)
- [ ] Cada hecho citable tiene fuente documentales
- [ ] Lagunas detectadas están marcadas con [NO DOCUMENTADA]
- [ ] No inventa hechos

### 8.2 Abogado Actora

- [ ] Demanda tiene estructura completa (hechos, fundamentos, pretensiones)
- [ ] Cada argumento cita norma o jurisprudencia
- [ ] Autocrítica identifica puntos débiles
- [ ] Propuestas de pruebas adicionales son concretas

### 8.3 Abogado David

- [ ] Cada claim de la demanda es atacado
- [ ] Contradicciones cites sources específicas
- [ ] Reconvenciones incluyen importes
- [ ] Top 10 ataques priorizados por impacto

### 8.4 Judge

- [ ] Lista de hechos probados coincide con nivel A/B
- [ ] Preguntas de vista son específicas y relevantes
- [ ] Veredicto simulado da probabilidades
- [ ] No favorece a ninguna parte

### 8.5 Auditor

- [ ] Tabla de rentas con importes verificados
- [ ] Hallazgos numerados con archivos cited
- [ ] Saldo provisional incluye breakdown
- [ ] No incluye opiniones jurídicas

### 8.6 Sistema

- [ ] Todas las citas usan formato estandarizado
- [ ] Debate adversarial tiene registro completo
- [ ] Todo versionado en Git
- [ ] Outputs consistentes entre agentes

---

## 9. Non-Functional Requirements

### 9.1 Performance

| Operación | Target |
|-----------|--------|
| Instructor (100 docs) | < 5 min |
| Demanda v1 | < 3 min |
| Destrucción David | < 5 min |
| Ronda adversarial completa | < 15 min |
| Veredicto juez | < 3 min |

### 9.2 Reliability

- Cada agente puede ejecutarse standalone si falla otro
- Outputs guardados incrementally (no perder trabajo)
- NotebookLM queries con retry (3 intentos)
- Timeouts: 60s por query, 5 min por fase

### 9.3 Portability

- Sistema funciona en cualquier desktop con Node.js + Python
- NotebookLM MCP server portable entre máquinas
- Documentos en Markdown (no proprietary format)
- Git para sync entre dispositivos

---

## 10. Technology Stack

### 10.1 TypeScript/Node.js (Orquestación)

```json
{
  "dependencies": {
    "notebooklm-mcp": "^2.0.0",
    "@modelcontextprotocol/sdk": "^1.0.0",
    "yaml": "^2.0.0",
    "glob": "^10.0.0",
    "simple-git": "^3.0.0"
  }
}
```

### 10.2 Python (Análisis)

```python
# requirements.txt
pydantic>=1.0,<2.0
httpx>=0.20
python-dotenv>=1.0.0
pandas>=2.0.0  # para auditoria
```

### 10.3 External Services

| Service | Uso | Auth |
|---------|-----|------|
| NotebookLM | Búsqueda documental | OAuth (Chrome) |
| GitHub/Gitea | Versionado | SSH/HTTPS |
| LLM API | Agentes | API Key |

---

## 11. Security Considerations

### 11.1 Datos Sensibles

- Documentos jurídicos son confidenciales
- Almacenamiento local (no cloud público)
- Git repo privado
- NotebookLM: cuenta Google dedicada

### 11.2 Acceso

- Solo el propietario tiene acceso al repo
- NotebookLM: cookies stored locally, no cloud sync de credenciales

---

## 12. Roadmap de Implementación

### Fase 1: MVP (Semana 1)
- [ ] Setup repo + estructura
- [ ] Instructor agent (prompt + output format)
- [ ] Abogado David agent
- [ ] Integración NotebookLM (basic)
- [ ] Test con caso FOODAY

### Fase 2: Ampliación (Semana 2)
- [ ] Abogado Actora agent
- [ ] Auditor agent
- [ ] Ronda adversarial completa
- [ ] Judge agent
- [ ] Pipeline automatizado

### Fase 3: Polish (Semana 3)
- [ ] Debates guardados en archivo
- [ ] Versionado completo
- [ ] Tests de citación
- [ ] Documentación de uso

### Fase 4: Escalabilidad (Futuro)
- [ ] Múltiples notebooks por caso
- [ ] Paralelización de agentes
- [ ] UI web para upload
- [ ] Integración con más fuentes

---

## Status: READY FOR DESIGN

El Spec está completo. Define:
- Arquitectura de agentes con YAML specs
- Data model para expediente y demandas
- Integración NotebookLM con queries por agente
- Pipeline de 5 fases con debate adversarial
- Sistema de citación estandarizado
- Versionado con Git
- Acceptance criteria por agente
- Roadmap de implementación

**Próxima fase: Design** — Detalles de implementación técnica, prompts exactos, y configuración de tools.

