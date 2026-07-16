# Sistema Multi-Agente Jurídico

Sistema multi-agente para análisis jurídico con debate adversarial y citación obligatoria.

## Características

- **7 agentes especializados**: Instructor, Abogado Actora, Abogado David (Destructor), Abogado Contraparte (Contraargumentador), Test de Estrés, Judge, Auditor
- **Debate adversarial**: Antes de emitir una demanda, el sistema intenta destruirla
- **Citación obligatoria**: Toda afirmación requiere fuente documental
- **Regla de oro**: "Nunca afirmes un hecho que no puedas demostrar"

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                      ORQUESTADOR                             │
│  - Coordina flujo                                           │
│  - Gestiona fases SDD                                       │
└────────────────────────────┬────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐  ┌────────────────┐  ┌─────────────────┐
│  NotebookLM   │  │  Agent Pool    │  │  File System    │
│  (Documentos) │  │  (LLM Calls)  │  │  (Markdown)     │
└───────────────┘  └────────────────┘  └─────────────────┘
```

## Agentes

| Agente | Rol | Output Principal |
|--------|-----|------------------|
| **Instructor** | Constructor del expediente | `expediente-maestro.md` |
| **Abogado Actora** | Atacante | `demanda-v1.md` |
| **Abogado David** | Destructor (macro) | `informe-destruccion.md` |
| **Abogado Contraparte** | Contraargumentador estratégico | `contraargumentos-previsibles.md` |
| **Test de Estrés** | Destructor párrafo a párrafo | `test-estres-demanda.md` |
| **Judge** | Evaluador neutral | `veredicto-simulado.md` |
| **Auditor** | Verificador numérico | `auditoria-numerica.md` |

## Requisitos

- Node.js 18+
- Python 3.10+ (opcional, para análisis)
- Acceso a NotebookLM (via MCP server)

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/davidlopezg/demandadavidmanas.git
cd demandadavidmanas

# Instalar dependencias
npm install
```

## Setup Rapido (Windows + Warp)

Ver [docs/setup/WINDOWS-SETUP.md](docs/setup/WINDOWS-SETUP.md) para instrucciones completas.

Resumen:

```bash
# 1. Instalar Pi
curl -fsSL https://pi.dev/install.sh | sh

# 2. Instalar extensiones
pi install npm:@capyup/pi-warp
pi install npm:pi-mcp-extension

# 3. Configurar MCP
# Copiar .pi/mcp.json.example a ~/.pi/agent/mcp.json

# 4. Autenticar NotebookLM
npx notebooklm-mcp@latest setup_auth

# 5. Iniciar Pi
pi
```

## Cuaderno NotebookLM

**URL:** https://notebooklm.google.com/notebook/4510cc3a-c1c4-4140-a8ec-f80f184618ef

Ver [docs/setup/NOTEBOOKLM-REFERENCE.md](docs/setup/NOTEBOOKLM-REFERENCE.md)

### 2. Variables de entorno

```bash
export NOTEBOOKLM_URL=http://192.168.1.100:3000
export NOTEBOOKLM_NOTEBOOK_ID=tu-notebook-id
```

## Uso

### Ejecutar pipeline completo

```bash
# Con NotebookLM
./scripts/run-pipeline.sh FOODAY-vs-MANAS --notebook=abc123 --url=http://192.168.1.100:3000

# Sin NotebookLM (solo prompts)
./scripts/run-pipeline.sh Caso-Nuevo --skip-notebooklm
```

### Ejecutar agentes individualmente

```bash
# Solo Instructor
node scripts/orchestrator.js --case-id=MiCaso --agents=instructor
```

### Verificar citaciones

```bash
node tests/citation-verification.js cases/FOODAY-vs-MANAS
```

## Estructura de Carpetas

```
.
├── scripts/
│   ├── orchestrator.ts      # Pipeline principal
│   ├── notebooklm-client.ts  # Cliente NotebookLM
│   └── run-pipeline.sh      # Launcher Bash
├── prompts/                 # System prompts de agentes
│   ├── instructor.md
│   ├── abogado-actora.md
│   ├── abogado-david.md
│   ├── abogado-contraparte.md
│   ├── abogado-test-estres.md
│   ├── juez.md
│   ├── auditor.md
│   └── debate-round2.md
├── templates/               # Templates de documentos
│   ├── expediente-maestro.md
│   ├── demanda.md
│   ├── informe-destruccion.md
│   ├── contraargumentos-previsibles.md
│   ├── test-estres-demanda.md
│   └── auditoria.md
├── docs/
│   ├── setup-notebooklm.md  # Guía de instalación
│   └── usage-guide.md       # Guía de uso
├── tests/
│   └── citation-verification.ts
├── cases/                   # Casos procesados
│   └── {case-id}/
│       ├── expediente/
│       ├── demanda/
│       ├── defensa/
│       ├── evaluacion/
│       ├── auditoria/
│       └── debate/
└── openspec/               # SDD artifacts
```

## Pipeline

```
FASE 1: Instructor → Expediente maestro
         ↓
FASE 2: (Paralelo)
  ├── Abogado Actora → Demanda v1
  ├── Abogado David → Informe de destrucción
  ├── Abogado Contraparte → Contraargumentos previsibles
  ├── Test de Estrés → Test de estrés párrafo a párrafo
  └── Auditor → Verificación numérica
         ↓
FASE 3: Debate Adversarial (Ronda 2)
         ↓
FASE 4: Judge → Veredicto simulado
         ↓
FASE 5: Outputs finales
```

## Agentes de Defensa: Diferencias

| Agente | Enfoque | Input | Output | Pregunta guía |
|--------|---------|-------|--------|---------------|
| **Abogado David** (Destructor) | Macro — ataca la demanda completa como un todo | Demanda v1 | `informe-destruccion.md` | "¿Cómo destruyo esta demanda?" |
| **Abogado Contraparte** (Contraargumentador) | Estratégico — genera todos los contraargumentos previsibles y separa los imprescindibles | Expediente completo | `contraargumentos-previsibles.md` | "¿Qué argumentos opondrá la defensa?" |
| **Test de Estrés** | Micro — analiza cada párrafo individualmente | Demanda (texto) | `test-estres-demanda.md` | "¿Qué diría Mañas para destruir ESTE párrafo?" |

### Cuándo usar cada uno

1. **Abogado David** — Cuando ya tenés una demanda redactada y querés una destrucción global para iterar.
2. **Abogado Contraparte** — Cuando querés anticipar TODOS los contraargumentos antes de redactar, para saber qué blindar.
3. **Test de Estrés** — Cuando tenés el borrador de la demanda y querés afinar cada párrafo, sabiendo exactamente qué riesgo tiene cada afirmación.

## Reglas de Citación

Todo documento generado debe seguir:

1. **Formato de cita obligatorio**
2. **Niveles de prueba** (A/B/C/D)
3. **Marcadores de insuficiencia**: `[SIN PRUEBA SUFICIENTE]`

Ver [prompts/instructor.md](prompts/instructor.md) para formato completo.

## Desarrollo

```bash
# Build TypeScript
npm run build

# Tests
npm run test

# Verificar citaciones
npm run verify
```

## Roadmap

- [x] MVP con Instructor + Abogado David
- [ ] Pipeline completo con todos los agentes
- [ ] Integración con más fuentes documentales
- [ ] UI web para upload de documentos
- [ ] Exportación a PDF de documentos generados

## Licencia

MIT
