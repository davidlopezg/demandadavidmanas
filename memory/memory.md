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

## 2026-07-15 — Decisiones de la sesión

### Convención sobre el expediente madre

- **Archivo madre**: `docs/demanda/expediente-fooday-vs-manas.md` (~112KB, ~3200 líneas, 23 capítulos + manual de interrogatorio)
- **Permiso de edición**: **Solo el usuario humano** puede modificar este archivo.
- **Acceso por agentes**: Read-only. Si el agente tiene propuestas, debe generar un documento paralelo en el mismo directorio con sufijo identificatorio (ej: `*.propuesta-ia.md`, `*.borrador-ia.md`).
- **Razón**: El madre es el "documento definitivo" del expediente; los agentes solo asisten, nunca sobreescriben.

### Estado del cuaderno NotebookLM (cuaderno principal del caso)

- **ID local**: `caso-fooday-vs-manas-expedient`
- **Name**: `Caso FOODAY vs MANAS — Expediente Principal`
- **URL**: https://notebooklm.google.com/notebook/4510cc3a-c1c4-4140-a8ec-f80f184618ef
- **Auth**: `notebooklm-mcp@2.0.0` + Chrome profile persistente en `C:\Users\David\AppData\Local\notebooklm-mcp\Data\chrome_profile` + state.json en `C:\Users\David\AppData\Local\notebooklm-mcp\Data\browser_state\state.json` (49 cookies, 38 Google, 23 critical)
- **Fuentes (8)**:
  1. `CONT. LLOG. LOCAL SAZOR - MAÑAS 01.12.2018.pdf` (contrato arrendamiento matriz)
  2. `SUB. CONT. MAÑAS - LOPEZ 01.12.2018.pdf` (subarrendamiento)
  3. `Lau.pdf` (presupuesto instalaciones luz+agua)
  4. `Email a enviar a la Gestoria.md`
  5. `Texto.md`
  6. `codigocivil.pdf`
  7. `ma%C3%B1as.pdf` (correos de Mañas a López)
  8. `ma%C3%B1as2.pdf` (correos adicionales de Mañas)

### Hito procesal inminente

- **Presentación de demanda**: **15/07/2026** (mañana desde la fecha actual 2026-07-15) en Juzgados de Figueres
- **Objeto de la demanda**: Incumplimiento del goce pacífico (11 semanas sin llave) + devolución IVA cobrado de más desde 2018 + costas
- **Cuantías en juego**:
  - Saldo a favor FOODAY: 188,61 € (tras compensación de 379,73 € indemnización Art. 1554.3 CC vs. 374,74 € rentas pendientes)
  - Deuda de renta discutida: 191,12 € (julio)
  - Bombín reclamado por David: 180 €
  - Pendiente auditoría retroactiva IVA desde 2018

### Datos clave del caso (extraídos del cuaderno)

- **Caso real**: `FOODAY PROJECT S.L. vs. David Mañas Esteban` (subarrendamiento)
- **Local**: El Port de la Selva (Girona)
- **Cadena contractual**: Sergio Rozas (SAZOR2018 CB) → David Mañas → Luis David López (FOODAY PROJECT S.L.)
- **Disputas principales**:
  1. Cambio unilateral del bombín (abril 2026) → 11 semanas sin llave
  2. Facturación de suministros con posible doble IVA
  3. Reclamación del coste del bombín (180 €) por parte de David
  4. Amenaza de resolución del subarrendamiento por "morosidad"

### Estado del cuaderno NotebookLM — Sesiones

- Sesión activa más reciente: `f3af51da` (o posteriores); consultar `list_sessions` para ID exacto
- Sesión `506533e6` dio respuesta exitosa a la cronología completa
- Cuota free-tier Google: 50 queries/día (cuidado con overuse)

### Aprendizajes técnicos de la sesión

- **PowerShell vs Bash**: PowerShell interpreta `--` como operador unario; usar `Start-Process` o `&` con comillas simples.
- **Chrome headless con --user-data-dir**: conflictúa con Chrome visible usando el mismo perfil. Para diagnóstico visual, cerrar todas las instancias primero.
- **MCP notebooklm-mcp v2**: state.json (Playwright storageState) es donde guarda cookies/sesión, NO Chrome Default/Cookies. Para refrescar state.json tras login manual, usar Playwright launchPersistentContext + storageState().
- **Verificación Google "Verify it's you"**: si aparece esa pantalla, el MCP no puede continuar; hay que completar el challenge en Chrome visible manualmente, y luego extraer el estado vía Playwright.

### Pendiente operativo inmediato

- [ ] Revisar el documento paralelo `docs/demanda/expediente-fooday-vs-manas.propuesta-ia.md` (actualmente en **v6**) que el agente generó
- [ ] Incorporar secciones útiles al madre `docs/demanda/expediente-fooday-vs-manas.md` (decisión humana)
- [ ] Finalizar la auditoría retroactiva de IVA 2018-2025 (crítico para demanda del 15/07)
- [ ] Verificar cuantificación de los 11 semanas de privación de uso (días exactos inicio/fin)

### 2026-07-15 — Whatsapp.docx subido al cuaderno

**Fuentes del cuaderno NotebookLM (9 totales tras la subida):**

1. `CONT. LLOG. LOCAL SAZOR - MAÑAS 01.12.2018.pdf` — contrato matriz
2. `SUB. CONT. MAÑAS - LOPEZ 01.12.2018.pdf` — subcontrato
3. `Lau.pdf` — Ley 29/1994 de Arrendamientos Urbanos
4. `Email a enviar a la Gestoria` — notificación compensación a la gestoría
5. `Texto` — estrategia procesal
6. `Whatsapp.docx` (NUEVO) — conversaciones de WhatsApp del 16/04/2026
7. `codigocivil.pdf` — Código Civil
8. `ma%C3%B1as.pdf` — email David 03/07/2026 18:32
9. `ma%C3%B1as2.pdf` — email David 04/07/2026 19:52

**Datos clave del Whatsapp.docx:**

- **16/04/2026 09:26 — Fecha del descubrimiento del cambio del bombín** (era [DND]; ahora [HECHO])
- 16/04/2026 09:32 — David Mañas: "Estaba estropeado" (primera justificación del cambio)
- 16/04/2026 10:21 — David López: "Cuando nos veamos me la das sin prisa, gracias!"
- 16/04/2026 10:21 — David López: "al final la he pedido copia al notario" (solución alternativa)
- 16/04/2026 10:22 — David Mañas (audio): "Si estás por aquí, te la doy"
- 16/04/2026 10:24 — David López → Victor Mañas: "Victor, supongo que me has llamado por la llaves"
- 16/04/2026 10:29 — Victor Mañas: "Jo también"

**Victor Mañas confirmado como hermano de David Mañas** (mensaje del 16/04 donde David López le habla directamente). Resuelve la [⚠️ CONTRADICCIÓN MCP] previa.

**Dos versiones del motivo del cambio atribuibles a David:**
- 16/04 (avería técnica): "Estaba estropeado"
- 03/07 (impulso personal): "Por prisas y nervios" (en email ma%C3%B1as.pdf)
- Separación: **78 días**

### Versiones del expediente paralelo

| Versión | Commit | Núcleo |
|---|---|---|
| v1 | (anterior) | Tono combativo |
| v2 | `33859fb` | Adopción perito documental; eliminación probabilidades |
| v3 | `b2336eb` | Objeto del procedimiento al inicio; conducta procesal cronológica |
| v4 | `d26c9fa` | Estructura argumental independiente de Clàusula 7ª vs 10ª |
| v5 | `6b6fc79` | Filosofía del procedimiento + refinamientos |
| v6 | `a2cda91` | Incorporación Whatsapp.docx |
| PDF v5 | `772d6a9` | Exportación PDF (8 páginas) |

---

## Git History

| Commit | Tag | Descripción |
|--------|-----|-------------|
| ebfce64 | - | Estructura inicial |
| f2c174f | v0.1.0-semana1 | Prompts y scripts base |
| fa2a515 | v1.0.0 | Sistema completo |
| 176d753 | - | Add NotebookLM MCP setup docs |
| 772d6a9 | - | Add Windows/Warp/Pi setup documentation + PDF expediente v5 |
| 6b6fc79 | v5 | expediente paralelo v5 (filosofía + refinamientos) |
| b2336eb | v3 | expediente paralelo v3 (objeto del procedimiento) |
| d26c9fa | v4 | expediente paralelo v4 (estructura Clàusula 7ª vs 10ª) |
| a2cda91 | v6 | expediente paralelo v6 (incorporación Whatsapp.docx) |
| latest | - | Versión actual de trabajo |

---
