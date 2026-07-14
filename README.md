# Sistema Multi-Agente Jurídico

Sistema multi-agente para análisis jurídico con debate adversarial y citación obligatoria.

## Características

- **5 agentes especializados**: Instructor, Abogado Actora, Abogado David (Destructor), Judge, Auditor
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
| **Abogado David** | Destructor | `informe-destruccion.md` |
| **Judge** | Evaluador neutral | `veredicto-simulado.md` |
| **Auditor** | Verificador numérico | `auditoria-numerica.md` |

## Requisitos

- Node.js 18+
- Acceso a NotebookLM (via MCP server en desktop)
- Python 3.10+ (opcional, para análisis)

## Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd sistema-agentes-juridicos

# Instalar dependencias
npm install
```

## Configuración

### 1. Configurar NotebookLM MCP

En tu desktop (con Chrome instalado):

```bash
# Instalar notebooklm-mcp
npm install -g notebooklm-mcp

# Autenticarse (solo primera vez)
notebooklm-mcp setup_auth

# Arrancar servidor HTTP
notebooklm-mcp --transport http --port 3000 --host 0.0.0.0
```

Ver [docs/setup-notebooklm.md](docs/setup-notebooklm.md) para instrucciones detalladas.

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
│   ├── juez.md
│   ├── auditor.md
│   └── debate-round2.md
├── templates/               # Templates de documentos
│   ├── expediente-maestro.md
│   ├── demanda.md
│   ├── informe-destruccion.md
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
  └── Auditor → Verificación numérica
         ↓
FASE 3: Debate Adversarial (Ronda 2)
         ↓
FASE 4: Judge → Veredicto simulado
         ↓
FASE 5: Outputs finales
```

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
