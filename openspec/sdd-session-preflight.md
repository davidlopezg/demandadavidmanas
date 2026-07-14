# SDD Session Preflight

**Date:** 2026-07-14  
**Project:** demandadavidmanas — Sistema Multi-Agente Jurídico  
**Orchestrator:** el Gentleman

---

## Preflight Choices

### 1. Execution Mode
**`interactive`** — Pausas entre fases críticas. El usuario revisa y aprueba cada fase antes de continuar.

### 2. Artifact Store
**`both`** — OpenSpec (versionado + auditoría) + Engram (memoria persistente entre sesiones).

### 3. Language
**Polyglot:**
- TypeScript/Node.js → orquestación, MCP, APIs, n8n
- Python → análisis documental, NLP, OCR, IA, búsqueda semántica

### 4. Agent Priority
**MVP ampliado (fase 1):**
1. **Instructor** — Constructor del expediente maestro
2. **Abogado parte actora** — Redactar demanda, atacar
3. **Abogado David Mañas** — Destruir la demanda, defender
4. **Juez** — Evaluación neutral, hechos probados
5. **Auditor documental** — Verificación numérica pura

**Fase 2 (post-MVP):**
6. Inspector tributario — Análisis fiscal
7. Psicólogo estratégico — Perfil negociador

### 5. Integración NotebookLM
- **Transporte:** HTTP (servidor corre en desktop con Chrome)
- **Fuentes consultables:** emails, WhatsApp, PDFs, contratos, facturas, Código Civil, LEC, jurisprudencia, expedientes
- **Estado:** Pendiente setup en desktop

### 6. Principios de Funcionamiento (Reglas de Oro)

| # | Regla | Descripción |
|---|-------|-------------|
| R1 | Nunca inventar | Ningún hecho inventado |
| R2 | Citar fuente | Toda afirmación vincula a documento/norma |
| R3 | No demostrable = indicar | Si no hay prueba → "No existe prueba suficiente" |
| R4 | Distinguir tipos | Hechos vs hipótesis vs opiniones vs argumentos jurídicos |
| R5 | Debate interno | Equipo debate antes de conclusión |
| R6 | Adversarial drafting | Destruir demanda antes de emitirla |

---

## Motivation

> "El objetivo no es un agente que opine. Quiero un agente que cite. Si no encuentra pruebas, debe escribir: No existe prueba suficiente. Eso evitará que el sistema invente argumentos."

> "Lo que creo que puede ser revolucionario: crear un sistema que cualquier persona pudiera utilizar. Subes contrato, WhatsApps, correos, facturas. El sistema genera expediente, cronología, pruebas, contradicciones, demanda, defensa prevista, preguntas para el juicio, puntos débiles."

---

## Non-Goals

- No es un chatbot jurídico genérico
- No daadvice legal (solo prepara casos)
- No reemplaza abogado humano
- No usa fuentes no verificadas como verdad

---

## Session Context

**Caso actual:** FOODAY PROJECT S.L. vs. David Mañas (subarrendamiento)  
**Expediente existente:** `/repos/fooday-intelligence-core/docs/strategy/conflicto-facturacion-alquiler-mañas/demanda/expediente-fooday-vs-manas.md`  
**Objetivo inmediato:** Diseñar el sistema multi-agente reutilizable

