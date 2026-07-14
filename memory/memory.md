# Memory — Sistema Agentes Jurídicos

**Última actualización:** 2026-07-14

---

## Proyecto: Sistema Multi-Agente Jurídico

### Descripción
Sistema de 5 agentes especializados para análisis jurídico con debate adversarial y citación obligatoria.

### Repo
`/data/data/com.termux/files/home/repos/demandadavidmanas`

### Estado
✅ MVP completo — v1.0.0

### Estructura
```
├── scripts/           # Pipeline y cliente NotebookLM
├── prompts/          # System prompts de 5 agentes
├── templates/        # Templates de documentos
├── tests/           # Verificación de citaciones
├── docs/            # Setup y guía de uso
├── openspec/        # SDD completo
├── cases/           # Casos procesados
└── memory/          # Esta memoria
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
- MCP server corre en desktop con Chrome
- Pi se conecta via HTTP
- Requiere: `notebooklm-mcp --transport http --port 3000`

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
- [ ] Configurar NotebookLM MCP en desktop
- [ ] Test con caso FOODAY
- [ ] Activar Engram para memoria persistente

---

## Git History

| Commit | Tag | Descripción |
|--------|-----|-------------|
| ebfce64 | - | Estructura inicial |
| f2c174f | v0.1.0-semana1 | Prompts y scripts base |
| fa2a515 | v1.0.0 | Sistema completo |

