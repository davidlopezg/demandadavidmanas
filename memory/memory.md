# Memory — Sistema Agentes Jurídicos

**Última actualización:** 2026-07-15

---

## Proyecto: Sistema Multi-Agente Jurídico

### Descripción
Sistema de 5 agentes especializados para análisis jurídico con debate adversarial y citación obligatoria.

### Repo
`https://github.com/davidlopezg/demandadavidmanas`

### Estado
✅ MVP completo — v1.0.0

### Estructura
```
├── scripts/           # Pipeline y cliente NotebookLM
├── prompts/          # System prompts de 5 agentes
├── templates/        # Templates de documentos
├── tests/           # Verificación de citaciones
├── docs/            # Setup y guía de uso
│   └── setup/       # Guías de instalación
│       ├── WINDOWS-SETUP.md
│       ├── NOTEBOOKLM-MCP-SETUP.md
│       └── NOTEBOOKLM-REFERENCE.md
├── openspec/        # SDD completo
├── cases/           # Casos procesados
├── memory/          # Esta memoria
└── .pi/            # Config Pi y MCP
    └── mcp.json.example
```

---

## Decisiones de Diseño

### Artifact Store
- **openspec**: Archivos en el repo para versionado
- **Engram**: Pendiente de activar

### Lenguaje
- **TypeScript/Node.js**: Orquestación, MCP, APIs
- **Python**: Análisis (pendiente de instalar deps)

### Integración NotebookLM
- **Windows**: notebooklm-mcp via pi-mcp-extension
- **Pi local (Termux)**: No disponible (Android incompatible con Chrome automation)
- **Flujo**: Pi en Windows consulta NotebookLM MCP directamente

---

## Setup Windows (Actual - 2026-07-15)

### Prerrequisitos Windows
- Git for Windows
- Node.js 20+
- Warp terminal
- Google Chrome

### Extensiones Pi Instaladas
- `npm:@capyup/pi-warp` - Integración Warp
- `npm:pi-mcp-extension` - Cliente MCP

### Config MCP
Archivo: `~/.pi/agent/mcp.json`

```json
{
  "settings": {
    "toolPrefix": "nl",
    "requestTimeoutMs": 60000
  },
  "mcpServers": {
    "notebooklm": {
      "command": "npx",
      "args": ["-y", "notebooklm-mcp@latest"],
      "transport": "stdio",
      "lifecycle": "eager"
    }
  }
}
```

### Comandos Útiles
- `/mcp` - Ver estado servers
- `/mcp:start notebooklm` - Iniciar server
- `nl_notebooklm_add_notebook` - Añadir cuaderno

---

## Cuaderno NotebookLM

**URL:** https://notebooklm.google.com/notebook/4510cc3a-c1c4-4140-a8ec-f80f184618ef

**ID:** 4510cc3a-c1c4-4140-a8ec-f80f184618ef

**Setup docs:** `docs/setup/NOTEBOOKLM-REFERENCE.md`

---

## Caso Actual: FOODAY PROJECT S.L. vs. David Mañas

### Contexto
- Conflicto de subarrendamiento
- Cambio de cerradura no comunicado
- Facturación trimestral vs. mensual contractual
- Posibles irregularidades en IVA
- Email de David reconociendo "prisas y nervios"

### Expediente existente
En: `/repos/fooday-intelligence-core/docs/strategy/conflicto-facturacion-alquiler-mañas/demanda/expediente-fooday-vs-manas.md`

---

## Reglas de Oro del Sistema

1. **Nunca inventar hechos** → `[SIN PRUEBA SUFICIENTE]`
2. **Citar siempre** → Fuente + fecha + excerpto
3. **Distinguir tipos** → Hecho / Opinión / Hipótesis
4. **Debate interno** → Equipo debate antes de conclusión
5. **Adversarial drafting** → Destruir demanda antes de emitir

---

## Agentes Implementados

| Agente | Prompt | Status |
|--------|--------|--------|
| Instructor | `prompts/instructor.md` | ✅ |
| Abogado Actora | `prompts/abogado-actora.md` | ✅ |
| Abogado David | `prompts/abogado-david.md` | ✅ |
| Judge | `prompts/juez.md` | ✅ |
| Auditor | `prompts/auditor.md` | ✅ |
| Debate | `prompts/debate-round2.md` | ✅ |

---

## Pendiente

- [ ] Instalar Python deps para auditor
- [ ] Test con caso FOODAY en Windows
- [ ] Activar Engram para memoria persistente

---

## Git History

| Commit | Tag | Descripción |
|--------|-----|-------------|
| ebfce64 | - | Estructura inicial |
| f2c174f | v0.1.0-semana1 | Prompts y scripts base |
| fa2a515 | v1.0.0 | Sistema completo |
| 176d753 | - | Add NotebookLM MCP setup docs |
| latest | - | Add Windows/Warp/Pi setup documentation |

---
