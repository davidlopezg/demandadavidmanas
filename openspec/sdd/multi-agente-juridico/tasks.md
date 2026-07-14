# SDD Tasks — Sistema Multi-Agente Jurídico

**Change:** multi-agente-juridico  
**Phase:** tasks  
**Status:** in_progress  
**Depends on:** design  
**Started:** 2026-07-14

---

## Executive Summary

Descomposición del sistema multi-agente jurídico en tareas implementables. Prioridad: MVP funcional en Semana 1, sistema completo en Semana 3.

---

## Task Groups

### Grupo A: Infraestructura Base
### Grupo B: Agente Instructor (MVP)
### Grupo C: Agente Abogado David (MVP)
### Grupo D: Integración NotebookLM
### Grupo E: Pipeline y Orquestación
### Grupo F: Agentes Restantes (Semana 2)
### Grupo G: Debate Adversarial (Semana 2)
### Grupo H: Polish y Tests (Semana 3)

---

## Grupo A: Infraestructura Base

### A.1 Crear estructura de carpetas del proyecto

**Descripción:** Crear la estructura de carpetas completa del proyecto.

**Archivos a crear:**
```
sistema-agentes-juridicos/
├── scripts/
│   ├── orchestrator.ts
│   ├── notebooklm-client.ts
│   └── run-pipeline.sh
├── prompts/
│   ├── instructor.md
│   ├── abogado-actora.md
│   ├── abogado-david.md
│   ├── juez.md
│   ├── auditor.md
│   └── debate-round2.md
├── templates/
│   ├── expediente-maestro.md
│   └── demanda.md
├── tests/
│   ├── citation-verification.ts
│   └── format-validation.ts
├── docs/
│   ├── setup-notebooklm.md
│   └── usage-guide.md
├── cases/
│   └── README.md
├── config/
│   ├── mcp-servers.yaml
│   └── pipeline.yaml
├── package.json
├── tsconfig.json
├── requirements.txt
└── README.md
```

**Entregable:** Estructura de carpetas creada y funcional.

**Dependencias:** Ninguna.

**Estimación:** 30 minutos.

**Prioridad:** P0 (bloquea todo).

---

### A.2 Configurar package.json y TypeScript

**Descripción:** Configurar el proyecto Node.js con TypeScript.

**Tareas:**
- [ ] Crear package.json con todas las dependencias
- [ ] Crear tsconfig.json
- [ ] Crear requirements.txt para Python
- [ ] Instalar dependencias npm
- [ ] Verificar que TypeScript compila

**Entregable:** Proyecto Node.js funcional con `npm install` exitoso.

**Dependencias:** A.1.

**Estimación:** 30 minutos.

**Prioridad:** P0.

---

### A.3 Configurar Git y versionado inicial

**Descripción:** Inicializar repositorio Git con .gitignore y estructura básica.

**Tareas:**
- [ ] `git init`
- [ ] Crear .gitignore (node_modules, .env, *.log, etc.)
- [ ] Primer commit con estructura vacía
- [ ] Crear .git/hooks para validación de citación (opcional)

**Entregable:** Repositorio Git funcional.

**Dependencias:** A.1.

**Estimación:** 20 minutos.

**Prioridad:** P1.

---

## Grupo B: Agente Instructor (MVP)

### B.1 Crear prompt del Instructor

**Descripción:** Crear el system prompt completo del Instructor.

**Archivo:** `prompts/instructor.md`

**Contenido:**
- Rol y principios absolutos
- Metodología de 5 pasos
- Formato de cita obligatorio
- Niveles de prueba (A/B/C/D)
- Marcadores de insuficiencia
- Output esperado (5 archivos)

**Validación:** Prompt debe incluir:
- [ ] Instrucciones de no-invención
- [ ] Formato de cita para cada tipo de documento
- [ ] Tabla de niveles de prueba
- [ ] Plantilla de lagunas detectadas

**Dependencias:** Ninguna.

**Estimación:** 1 hora.

**Prioridad:** P0.

---

### B.2 Crear template de Expediente Maestro

**Descripción:** Crear la plantilla Markdown del expediente maestro.

**Archivo:** `templates/expediente-maestro.md`

**Secciones requeridas:**
1. Metadata (YAML frontmatter)
2. Resumen Ejecutivo (3 páginas)
3. Partes (actor y demandado)
4. Contrato (cláusulas relevantes)
5. Cronología (tabla completa)
6. Hechos Clasificados (por nivel A/B/C/D)
7. Lagunas Detectadas
8. Matriz de Pruebas
9. Anexo: Índice de Documentos

**Validación:** Template debe tener todas las secciones documentadas en spec.md.

**Dependencias:** B.1.

**Estimación:** 2 horas.

**Prioridad:** P0.

---

### B.3 Implementar función de parseo de documentos

**Descripción:** Script Python/Node para parsear documentos subidos.

**Funcionalidad:**
- Detectar tipo de documento (email, WhatsApp, factura, contrato)
- Extraer metadata (fecha, emisor, receptor)
- Extraer texto relevante
- Clasificar por tipo
- Generar estructura JSON para Instructor

**API:**
```typescript
interface ParsedDocument {
  id: string;
  type: 'email' | 'whatsapp' | 'factura' | 'contrato' | 'otro';
  fecha: Date | null;
  emisor: string | null;
  receptor: string | null;
  texto: string;
  originalFile: string;
}
```

**Dependencias:** A.2.

**Estimación:** 4 horas.

**Prioridad:** P1 (puede hacerse manualmente al inicio).

---

### B.4 Test del Instructor con caso FOODAY

**Descripción:** Probar el Instructor con el expediente existente de FOODAY.

**Pasos:**
1. Copiar documentos del caso FOODAY a `/cases/FOODAY-vs-MANAS/documents/`
2. Ejecutar Instructor con los documentos
3. Verificar que genera expediente con niveles de prueba
4. Verificar que no inventa hechos
5. Documentar resultados

**Validación:**
- [ ] Expediente generado con todas las secciones
- [ ] Hechos clasificados con niveles A/B/C/D
- [ ] Lagunas marcadas correctamente
- [ ] Sin hechos inventados

**Dependencias:** B.1, B.2, B.3.

**Estimación:** 3 horas.

**Prioridad:** P0.

---

## Grupo C: Agente Abogado David (MVP)

### C.1 Crear prompt del Abogado David

**Descripción:** Crear el system prompt completo del Abogado David (Destructor).

**Archivo:** `prompts/abogado-david.md`

**Contenido:**
- Rol: Destructor de demandas
- Principios: adversarial, atacar cada afirmación
- Metodología de 6 pasos
- Formato de ataque
- Top 10 ataques
- Preguntas para la vista
- Posibles reconvenciones

**Validación:** Prompt debe incluir:
- [ ] Instrucciones claras de ataque
- [ ] Formato de Ataque con Destrucción + Fuente
- [ ] Metodología de 6 pasos
- [ ] Template de Top 10 Ataques

**Dependencias:** Ninguna.

**Estimación:** 1 hora.

**Prioridad:** P0.

---

### C.2 Crear template de Informe de Destrucción

**Descripción:** Crear la plantilla para el informe de destrucción.

**Archivo:** `templates/informe-destruccion.md`

**Secciones:**
1. Metadatos (YAML frontmatter)
2. Índice de Ataques
3. Destrucción por Claim (formato [ATAQUE-XXX])
4. Contradicciones Detectadas
5. Posibles Reconvenciones
6. Top 10 Ataques
7. Preguntas para la Vista
8. Defensa Prevista

**Dependencias:** C.1.

**Estimación:** 1 hora.

**Prioridad:** P0.

---

### C.3 Test del Abogado David con Demanda FOODAY

**Descripción:** Probar el Abogado David contra la demanda existente.

**Pasos:**
1. Generar demanda v1 (manual o con Abogado Actora si está listo)
2. Ejecutar Abogado David contra la demanda
3. Verificar que ataca cada claim
4. Verificar que cita fuentes contradictorias
5. Generar Top 10 Ataques

**Validación:**
- [ ] Cada claim de la demanda es atacado
- [ ] Cada ataque tiene fuente citación
- [ ] Top 10 Ataques priorizados por impacto
- [ ] Preguntas para vista son relevantes

**Dependencias:** C.1, C.2.

**Estimación:** 2 horas.

**Prioridad:** P0.

---

## Grupo D: Integración NotebookLM

### D.1 Documentar setup de NotebookLM MCP

**Descripción:** Crear guía de instalación de NotebookLM MCP.

**Archivo:** `docs/setup-notebooklm.md`

**Contenido:**
- Requisitos (Node.js, Chrome)
- Instalación en desktop
- Autenticación (setup_auth)
- Arrancar servidor HTTP
- Verificación de conexión
- Troubleshooting común

**Validación:** Guía debe permitir a un usuario nuevo configurar NotebookLM en < 30 minutos.

**Dependencias:** Ninguna.

**Estimación:** 1 hora.

**Prioridad:** P0.

---

### D.2 Implementar NotebookLM Client

**Descripción:** Implementar el cliente TypeScript para NotebookLM.

**Archivo:** `scripts/notebooklm-client.ts`

**Funcionalidad:**
```typescript
class NotebookLMClient {
  async ask(question: string, sourceFormat: 'inline' | 'footnotes' | 'json'): Promise<QueryResult>
  async listNotebooks(): Promise<Notebook[]>
  async selectNotebook(notebookId: string): Promise<void>
  async addSource(url: string): Promise<void>
  async getSourceFulltext(sourceId: string): Promise<string>
}
```

**Dependencias:** A.2.

**Estimación:** 3 horas.

**Prioridad:** P0.

---

### D.3 Configurar conexión Pi ↔ Desktop

**Descripción:** Configurar la conexión HTTP entre Pi y el servidor NotebookLM del desktop.

**Tareas:**
1. Crear `config/mcp-servers.yaml` con URL del desktop
2. Documentar cómo obtener IP del desktop
3. Test de conexión desde Pi
4. Manejo de errores (timeout, retry)

**Validación:**
- [ ] Pi puede conectarse al servidor NotebookLM del desktop
- [ ] Queries funcionan con retry
- [ ] Timeout apropiado (60s por query)

**Dependencias:** D.1, D.2.

**Estimación:** 2 horas.

**Prioridad:** P0.

---

### D.4 Definir queries por agente

**Descripción:** Crear library de queries predefinidas para cada agente.

**Archivo:** `scripts/queries.ts`

**Estructura:**
```typescript
const INSTRUCTOR_QUERIES = {
  cronologia: "Extrae todos los eventos ordenados por fecha...",
  hechosCerradura: "Busca documentos relacionados con el cambio de cerradura...",
  // ...
};

const ABOGADO_DAVID_QUERIES = {
  contradicciones: "Busca mensajes donde la actora contradice...",
  mensajesFavorables: "Busca mensajes donde la actora admite...",
  // ...
};
```

**Validación:** Cada agente tiene queries específicas y relevantes.

**Dependencias:** D.2.

**Estimación:** 2 horas.

**Prioridad:** P1.

---

## Grupo E: Pipeline y Orquestación

### E.1 Crear script de pipeline básico

**Descripción:** Script Bash simple para ejecutar el pipeline.

**Archivo:** `scripts/run-pipeline.sh`

**Funcionalidad:**
```bash
./run-pipeline.sh <case-id> <notebook-id>

# Flujo:
# 1. Crear estructura de carpetas
# 2. Seleccionar notebook
# 3. Ejecutar Instructor
# 4. Guardar outputs
# 5. Mostrar resumen
```

**Dependencias:** A.3, B.4.

**Estimación:** 1 hora.

**Prioridad:** P0.

---

### E.2 Implementar Orchestrator en TypeScript

**Descripción:** Implementar el orchestrator completo.

**Archivo:** `scripts/orchestrator.ts`

**Clases:**
```typescript
class LegalPipeline {
  async run(): Promise<PipelineResult>
  private async runAgent(agent: AgentType): Promise<AgentResult>
  private async runDebateRound(): Promise<DebateResult>
  private async generateFinalOutputs(): Promise<void>
}

enum AgentType {
  INSTRUCTOR = 'instructor',
  ABOGADO_ACTORA = 'abogado-actora',
  ABOGADO_DAVID = 'abogado-david',
  JUEZ = 'juez',
  AUDITOR = 'auditor',
}
```

**Dependencias:** A.2, B.4, C.3, D.3.

**Estimación:** 8 horas.

**Prioridad:** P0.

---

### E.3 Implementar sistema de versionado

**Descripción:** Sistema de versionado del expediente con Git.

**Funcionalidad:**
- Tags por versión de documento
- Commits por fase del pipeline
- Historial de cambios en documentos
- Backup antes de cada fase

**API:**
```typescript
class VersionControl {
  async commit(phase: string, message: string): Promise<void>
  async tag(version: string, message: string): Promise<void>
  async diff(from: string, to: string): Promise<string>
  async rollback(version: string): Promise<void>
}
```

**Dependencias:** A.3, E.1.

**Estimación:** 4 horas.

**Prioridad:** P1.

---

## Grupo F: Agentes Restantes (Semana 2)

### F.1 Agente Abogado Parte Actora

**Tareas:**
- [ ] F.1.1 Crear prompt (`prompts/abogado-actora.md`)
- [ ] F.1.2 Crear template de Demanda (`templates/demanda.md`)
- [ ] F.1.3 Test con caso FOODAY
- [ ] F.1.4 Integrar en pipeline

**Dependencias:** B.4 (Instructor debe funcionar primero).

**Estimación:** 4 horas total.

**Prioridad:** P0.

---

### F.2 Agente Auditor

**Tareas:**
- [ ] F.2.1 Crear prompt (`prompts/auditor.md`)
- [ ] F.2.2 Crear templates de auditoría
- [ ] F.2.3 Test con facturas FOODAY
- [ ] F.2.4 Integrar en pipeline

**Dependencias:** F.1.3.

**Estimación:** 4 horas total.

**Prioridad:** P1.

---

### F.3 Agente Judge

**Tareas:**
- [ ] F.3.1 Crear prompt (`prompts/juez.md`)
- [ ] F.3.2 Crear template de Veredicto
- [ ] F.3.3 Test con caso completo
- [ ] F.3.4 Integrar en pipeline

**Dependencias:** F.1.4, F.2.4.

**Estimación:** 4 horas total.

**Prioridad:** P1.

---

## Grupo G: Debate Adversarial (Semana 2)

### G.1 Ronda 2: Debate completo

**Descripción:** Implementar la ronda adversarial completa.

**Tareas:**
- [ ] G.1.1 Crear prompt de debate (`prompts/debate-round2.md`)
- [ ] G.1.2 David ataca demanda v1
- [ ] G.1.3 Actora responde a cada ataque
- [ ] G.1.4 Instructor actualiza expediente
- [ ] G.1.5 Generar debate/ronda2.md

**Flujo:**
```
David ATTACA → Actora RESPONDE → Instructor ACTUALIZA → Judge EVALÚA
```

**Dependencias:** F.1, F.3.

**Estimación:** 6 horas.

**Prioridad:** P0.

---

### G.2 Ronda 3: Síntesis final

**Descripción:** Generar versión final de todos los documentos.

**Tareas:**
- [ ] G.2.1 Generar demanda-final.md
- [ ] G.2.2 Generar defensa-prevista.md
- [ ] G.2.3 Generar veredicto-final.md
- [ ] G.2.4 Generar preguntas-vista.md
- [ ] G.2.5 Generar puntos-debiles.md

**Dependencias:** G.1.

**Estimación:** 4 horas.

**Prioridad:** P0.

---

## Grupo H: Polish y Tests (Semana 3)

### H.1 Tests de verificación de citación

**Descripción:** Implementar tests automáticos para verificar citaciones.

**Archivo:** `tests/citation-verification.ts`

**Tests:**
- [ ] H.1.1 Cada claim tiene fuente citación
- [ ] H.1.2 Cada cita está en lista de fuentes
- [ ] H.1.3 No hay hechos inventados
- [ ] H.1.4 Auditor no contiene opiniones jurídicas

**Dependencias:** E.2.

**Estimación:** 4 horas.

**Prioridad:** P1.

---

### H.2 Tests de formato

**Descripción:** Validar formato de documentos generados.

**Archivo:** `tests/format-validation.ts`

**Tests:**
- [ ] H.2.1 Expediente tiene todas las secciones
- [ ] H.2.2 Demanda tiene estructura legal
- [ ] H.2.3 Citas usan formato estandarizado
- [ ] H.2.4 YAML frontmatter válido

**Dependencias:** H.1.

**Estimación:** 3 horas.

**Prioridad:** P1.

---

### H.3 Documentación de uso

**Descripción:** Crear guía de uso del sistema.

**Archivo:** `docs/usage-guide.md`

**Contenido:**
- Cómo subir documentos
- Cómo ejecutar el pipeline
- Cómo interpretar outputs
- Cómo hacer ajustes manuales
- Troubleshooting

**Dependencias:** H.2.

**Estimación:** 2 horas.

**Prioridad:** P2.

---

### H.4 README del proyecto

**Descripción:** Crear README principal del repositorio.

**Contenido:**
- Descripción del proyecto
- Quick start
- Arquitectura
- Requisitos
- Instalación
- Uso
- Roadmap

**Dependencias:** H.3.

**Estimación:** 1 hora.

**Prioridad:** P2.

---

## Resumen de Tareas

### Semana 1: MVP Funcional

| ID | Tarea | Estimación | Prioridad |
|----|-------|-----------|-----------|
| A.1 | Estructura de carpetas | 30 min | P0 |
| A.2 | Config TypeScript | 30 min | P0 |
| B.1 | Prompt Instructor | 1 hr | P0 |
| B.2 | Template Expediente | 2 hr | P0 |
| B.4 | Test Instructor FOODAY | 3 hr | P0 |
| C.1 | Prompt Abogado David | 1 hr | P0 |
| C.2 | Template Destrucción | 1 hr | P0 |
| C.3 | Test Abogado David | 2 hr | P0 |
| D.1 | Docs NotebookLM setup | 1 hr | P0 |
| D.2 | NotebookLM Client | 3 hr | P0 |
| D.3 | Conexión Pi ↔ Desktop | 2 hr | P0 |
| E.1 | Pipeline Bash | 1 hr | P0 |
| **Total** | | **18 hr** | |

### Semana 2: Sistema Completo

| ID | Tarea | Estimación |
|----|-------|-----------|
| F.1 | Abogado Actora | 4 hr |
| F.2 | Auditor | 4 hr |
| F.3 | Judge | 4 hr |
| G.1 | Ronda Adversarial | 6 hr |
| G.2 | Síntesis Final | 4 hr |
| E.2 | Orchestrator TS | 8 hr |
| E.3 | Versionado Git | 4 hr |
| **Total** | | **34 hr** |

### Semana 3: Polish

| ID | Tarea | Estimación |
|----|-------|-----------|
| H.1 | Tests citación | 4 hr |
| H.2 | Tests formato | 3 hr |
| H.3 | Docs uso | 2 hr |
| H.4 | README | 1 hr |
| **Total** | | **10 hr** |

**Gran Total: ~62 horas**

---

## Dependency Graph

```
A.1 ─┬─ A.2 ─ E.1 ─ E.2 ─ H.1 ─ H.2
 │          │                │
 │          └────────────────┘
 │
 ├─ B.1 ─ B.2 ─ B.4 ─┬─ F.1 ─┬─ G.1 ─ G.2
 │                   │        │
 │                   ├─ F.2 ─┤
 │                   │        │
 │                   └─ F.3 ─┘
 │
 ├─ C.1 ─ C.2 ─ C.3 ─┘
 │
 └─ D.1 ─ D.2 ─ D.3 ─┘

Leyenda:
─ = dependencia directa
┬─ = convergencia de dependencias
```

---

## Milestones

### Milestone 1: MVP (Fin Semana 1)
- Instructor genera expediente completo
- Abogado David destruye demanda
- NotebookLM integrado
- Pipeline funcional

### Milestone 2: Sistema Completo (Fin Semana 2)
- 5 agentes funcionando
- Debate adversarial completo
- Outputs finales generables

### Milestone 3: Production Ready (Fin Semana 3)
- Tests pasando
- Documentación completa
- README publicado

---

## Status: TASKS COMPLETE

Las tareas están descompuestas en:
- 8 grupos temáticos
- 30+ tareas individuales
- Prioridades asignadas (P0/P1/P2)
- Dependencias mapeadas
- Estimaciones por tarea

**Siguiente fase: Apply** — Implementación de las tareas P0 primero.

