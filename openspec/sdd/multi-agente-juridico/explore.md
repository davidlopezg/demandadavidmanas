# SDD Explore — Sistema Multi-Agente Jurídico

**Change:** multi-agente-juridico  
**Phase:** explore  
**Status:** in_progress  
**Started:** 2026-07-14

---

## Executive Summary

Diseñar un sistema multi-agente jurídico donde 7 roles especializados analizan un caso desde múltiples ángulos, se controlan mutuamente, y solo emiten afirmaciones citradas. Sistema reutilizable: upload documentos → genera expediente, demanda, defensa, preguntas.

---

## Discovery: Análisis de Contexto

### Caso de prueba
- **Conflicto:** FOODAY PROJECT S.L. vs. David Mañas (subarrendamiento)
- **Expediente existente:** 3201 líneas, estructura completa
- **Elementos clave:** cambio de cerradura, facturación, IVA, goce pacífico

### Estructura del expediente actual
El expediente ya tiene una estructura que los agentes deben poder reconstruir automáticamente:

```
1. Partes
2. Contrato (cláusulas)
3. Cronología de hechos
4. Incumplimientos contractuales
5. Análisis jurídico
6. Auditoría económica
7. Hechos acreditados
8. Hechos favorables a la otra parte
9. Pruebas (índice + fichas)
10. Fundamentos jurídicos
11. Estrategia de la otra parte + respuesta
12. Contradicciones
13. Respuesta a cada argumento
14. Pretensiones de la demanda
15. Matriz de objetivos
16. Estrategia procesal
17. Demanda (redactada)
18. Preparación del juicio
19. Negociación
20. Riesgos
```

**Observación:** Esta estructura es el output natural del Agente Instructor.

---

## Agent Architecture Discovery

### Los 5 Agentes MVP

```
┌─────────────────────────────────────────────────────────────┐
│                    ORQUESTADOR (Parent)                      │
│  - Coordina flujo                                           │
│  - Synthesiza resultados                                    │
│  - Regla de oro: toda afirmación citrada                    │
└──────────────┬──────────┬──────────┬──────────┬──────────────┘
               │          │          │          │
        ┌──────▼───┐┌─────▼────┐┌───▼────┐┌───▼────┐┌──────────┐
        │Instructor││ Abogado  ││Abogado ││  Juez  ││ Auditor  │
        │          ││Actora    ││David   ││        ││Documental│
        └──────────┘└──────────┘└────────┘└────────┘└──────────┘
```

#### 1. Instructor (Constructor del Expediente)
**Misión:** Construir el expediente maestro desde los documentos brutos.

**Responsabilidades:**
- Ordenar cronológicamente todos los documentos
- Clasificar: emails, WhatsApps, facturas, contratos, normativa
- Relacionar cada documento con cada hecho
- Detectar lagunas de información
- Clasificar cada hecho según nivel de prueba

**Output:** `expediente-maestro.md` estructurado

**Datos que necesita:**
- Carpeta con documentos subidos (PDF, imágenes, emails exportados)
- Acceso a NotebookLM para consultar contenido
- Base de datos de normativa (Código Civil, LEC, LAU)

**Regla especial:** Si no puede probar algo → `[SIN PRUEBA SUFICIENTE]`

---

#### 2. Abogado Parte Actora (Ataque)
**Misión:** Ganar el caso para la parte actora.

**Responsabilidades:**
- Redactar la demanda completa
- Buscar jurisprudencia favorable
- Citar Código Civil, LEC, normativa fiscal
- Proponer pruebas adicionales
- Identificar qué falta para fortalecerse

**Output:** `demanda-v1.md` + `busqueda-jurisprudencial.md`

**Regla especial:** Cada argumento debe vincular a sección del expediente + norma

---

#### 3. Abogado David Mañas (Defensa) — El Más Crítico
**Misión:** Destruir la demanda antes de que se emita.

**Responsabilidades:**
- Buscar contradicciones en los hechos de la actora
- Identificar mensajes/documents que perjudiquen a David
- Analizar cláusulas contractuales favorables
- Detectar errores de fechas
- Explorar argumentos procesales
- Proponer reconvenciones
- **Cuestionar cada afirmación** del expediente

**Output:** `informe-defensa-v1.md` + `contradicciones.md`

**Regla especial:** "Si esto llega a juicio, ¿cómo lo destrozo?"

---

#### 4. Juez (Evaluador Neutral)
**Misión:** Simular la perspectiva judicial.

**Responsabilidades:**
- Leer todo el expediente + demanda + defensa
- Determinar qué hechos considera probados
- Evaluar qué pruebas tienen poco valor
- Identificar qué argumentos NO le convencen
- Proponer preguntas que haría en la vista oral
- Evaluar riesgo de cada pretensión

**Output:** `dictamen-judicial.md`

**Regla especial:** Neutral. No favorece a nadie. Solo valora prueba y lógica.

---

#### 5. Auditor Documental (Verificador Numérico)
**Misión:** Revisar exclusivamente números.

**Responsabilidades:**
- Verificar sumas (rentas, facturas, pagos)
- Detectar facturas faltantes
- Comparar importes entre documentos
- Verificar correspondencia factura ↔ pago
- Detectar duplicidades
- **NO opiniar sobre Derecho**

**Output:** `auditoria-numerica.md`

**Regla especial:** Solo dice "esta suma está mal" o "esta factura falta". Nada más.

---

## Data Sources Integration

### Fuentes de información

| Fuente | Tipo | Acceso | Agent Principal |
|--------|------|--------|-----------------|
| Emails | .eml, .msg | NotebookLM / upload | Instructor |
| WhatsApp | .txt, chat export | NotebookLM / upload | Instructor |
| Facturas | PDF, imagen | Upload / OCR | Instructor + Auditor |
| Contratos | PDF | Upload | Instructor |
| Código Civil | Texto | Base local | Todos |
| LEC | Texto | Base local | Abogado actora + David |
| LAU | Texto | Base local | Instructor |
| Jurisprudencia | Texto | Búsqueda web | Abogado actora |
| Expedientes previos | .md | NotebookLM | Instructor |

### NotebookLM como motor de búsqueda documental

**Flujo:**
1. Usuario sube documentos a NotebookLM (manual o via MCP)
2. Instructor consulta NotebookLM: "dame todos los emails de julio 2025"
3. Instructor consulta: "dame los WhatsApps sobre el bombín"
4. Abogado actora consulta: "jurisprudencia sobre goce pacífico en subarrendamiento"
5. Abogado David consulta: "mensajes donde David reconoce haber actuado por prisas"

**Ventaja:** NotebookLM proporciona respuestas citradas automáticamente.

---

## Citación Obligatoria — El Núcleo del Sistema

### Formato de citación

```
[AFFIRMATION]: Los hechos ocurridos en julio de 2025 demuestran...

FUENTES:
  [1] Email del 4 de julio de 2025 — Asunto: "Re: cambio de cerradura"
      Extracto relevante: "El canvi de bombí es va fer per les presses..."
      Archivo: /docs/emails/email-2025-07-04.eml
  
  [2] WhatsApp del 15 de abril de 2025 — De: David → FOODAY
      Extracto relevante: "Si al mes de juliol no tens la nova clau..."
      Archivo: /docs/whatsapp/chat-2025-04-15.txt
  
  [3] Cláusula 7 del Contrato de subarrendamiento
      Texto: "El subarrendatario tendrá derecho al uso pacífico..."
      Archivo: /docs/contratos/subarrendamiento-2023.pdf

NORMATIVA:
  [N1] Artículo 1554 del Código Civil — Obligación de entrega
  [N2] Artículo 1258 del Código Civil — Buena fe contractual
```

### Formato cuando NO hay prueba

```
[AFFIRMATION]: Es probable que el cambio de cerradura afectara al acceso.

⚠️ EVIDENCIA INSUFICIENTE:
  - No hay email de notificación previa
  - Solo existe el correo de David reconociendo el cambio
  - Fecha exacta del cambio: [NO DOCUMENTADA]
  - Duración de la privación de acceso: [NO DOCUMENTADA]
  → Esta afirmación NO puede usarse como hecho probado.
```

---

## Agent Interaction Flow

```
1. INPUT: Usuario sube documentos
         ↓
2. INSTRUCTOR: Construye expediente maestro
         ↓
3. PARALELO:
   ┌─────────────────┬──────────────────┐
   │ Abogado Actora  │   Abogado David  │
   │ → Demanda v1    │   → Informe def. │
   └────────┬────────┴────────┬─────────┘
            ↓                  ↓
4. JUDGE: Lee todo → Dictamen neutral
         ↓
5. AUDITOR: Verifica números
         ↓
6. ROUND 2 (adversarial):
   Abogado David ATTACKS demanda v1
   Abogado Actora RESPONDS
   Instructor UPDATES expediente
         ↓
7. ROUND 3:
   Juez evalúa versión final
         ↓
8. OUTPUT: Demanda + Defensa + Dictamen + Preguntas
```

---

## Open Questions for Proposal Phase

| # | Pregunta | Relevancia |
|---|----------|------------|
| 1 | ¿Cómo maneja el sistema documentos en idiomas mezclados (castellano/catalán)? | Análisis de mensajes de David |
| 2 | ¿Los agentes usan el mismo modelo LLM o pueden ser distintos? | Arquitectura de delegation |
| 3 | ¿Cómo se versiona el expediente? ¿Git + Markdown? | Portabilidad |
| 4 | ¿NotebookLM busca en toda la library o en notebooks específicos? | Strategy de notebooks |
| 5 | ¿Qué pasa cuando hay contradicción entre Instructor y Auditor? | Sistema de resolución |
| 6 | ¿Los agentes escriben en archivos o en memoria Engram? | Flujo de datos |

---

## Risks

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Agentes alucinan hechos | Alta | Crítico | Regla de oro + citación obligatoria |
| Instructor reconstruye mal la cronología | Media | Alto | Auditor verifica fechas |
| Abogado David no encuentra contradicciones | Media | Medio | Múltiples ángulos de ataque |
| NotebookLM no cita bien | Baja | Alto | Verificar citations manualmente |
| Timeout en búsqueda de jurisprudencia | Media | Bajo | Búsqueda asíncrona con retry |

---

## Next Phase

**`proposal`** — Definir arquitectura detallada de cada agente, flujos de datos, y cómo se relacionan con NotebookLM.

