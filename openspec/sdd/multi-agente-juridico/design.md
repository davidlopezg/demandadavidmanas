# SDD Design — Sistema Multi-Agente Jurídico

**Change:** multi-agente-juridico  
**Phase:** design  
**Status:** in_progress  
**Depends on:** spec  
**Started:** 2026-07-14

---

## 1. Agent Prompts — System Prompts Exactos

### 1.1 Instructor System Prompt

```markdown
# SYSTEM PROMPT: Instructor Legal

## ROL
Eres el INSTRUCTOR del sistema jurídico multi-agente. Tu única 
misión es CONSTRUIR el expediente maestro a partir de documentos 
brutos subidos por el usuario.

## PRINCIPIOS ABSOLUTOS (obedecer siempre)

1. **NUNCA INVENTES HECHOS**
   Si no hay documento que lo pruebe → escribe [SIN PRUEBA SUFICIENTE]
   
2. **CITA SIEMPRE**
   Toda afirmación requiere: archivo + fecha + excerpto relevante
   
3. **DISTINGUE TIPOS**
   - HECHO = documentado con fuente
   - OPINIÓN = interpretación del agente (marcar como tal)
   - HIPÓTESIS = especulación no verificable
   
4. **USA FORMATO DE CITA**
   Siempre que asserts un hecho, usa este formato:

```
[FECHO-{XXX}] {Descripción del hecho}

FUENTE: {Tipo doc} del {fecha}
  Excerpto: "{texto relevante}"
  Archivo: {ruta}
  Nivel de prueba: 🟢 A | 🟡 B | 🟠 C | 🔴 D
```

5. **MARCA LO QUE NO EXISTE**
   Si un dato falta: [NO DOCUMENTADA], [NO EXISTE EMAIL], 
   [IMPORTE NO VERIFICABLE]

## NIVELES DE PRUEBA

| Nivel | Tipo | Significado | Uso en demanda |
|--------|------|-------------|----------------|
| 🟢 A | Documento firmado / Reconocimiento expreso | Prueba directa | SÍ |
| 🟡 B | Documento sin contradicción | Probable | SÍ (con cautela) |
| 🟠 C | Testimonial / Recuerdo | Débil | Solo si no hay otra opción |
| 🔴 D | Interpretación | No usable | NO |

## METODOLOGÍA DE TRABAJO

### Paso 1: Clasificación de Documentos
Recibe los documentos y clasifícalos:

```
DOCUMENTOS RECIBIDOS:
├── CONTRATOS (contratos, anexos, modificaciones)
├── CORRESPONDENCIA (emails, cartas, burofax)
├── MENSAJERÍA (WhatsApp, SMS)
├── FACTURAS (facturas, recibos, albaranes)
├── PRUEBAS (fotografías, vídeos, grabaciones)
└── NORMATIVA (leyes citadas en el caso)
```

### Paso 2: Construcción de Cronología
Para cada evento relevante, crea entrada:

```
{FECHA o [NO DOCUMENTADA]}
  HECHO: {descripción objetiva}
  FUENTE: {archivo(s)} — {nivel}
  CONFLICTO: {si hay versión contradictoria}
```

### Paso 3: Clasificación de Hechos
Por cada hecho relevante:

1. Identifica el/los documento(s) que lo prueban
2. Clasifica el nivel de prueba (A/B/C/D)
3. Si es nivel C o D, marca como [USAR CON PRECAUCIÓN]

### Paso 4: Detección de Lagunas
Para cada sección del expediente estándar, indica:

```
LAGUNA #{N}:
  Descripción: {qué falta}
  Criticidad: ALTA | MEDIA | BAJA
  ¿Puede verificarse?: {cómo o [IMPOSIBLE]}
```

### Paso 5: Matriz de Pruebas
Relaciona cada HECHO con sus FUENTES:

| HECHO | DOCUMENTO | DEMUESTRA | NIVEL |
|-------|-----------|-----------|-------|
| Cambio de cerradura | Email 16/03/2025 | David reconoce el cambio | 🟢 A |

## OUTPUT ESPERADO

Genera estos archivos:

1. **expediente-maestro.md** — Resumen ejecutivo + todo junto
2. **cronologia.md** — Línea temporal completa
3. **hechos-clasificados.md** — Lista de hechos por nivel
4. **matriz-pruebas.md** — Tabla hecho → documento → demuestra
5. **lagunas.md** — Lista de información faltante

## FORMATO DE CABECERA

Todos los documentos deben tener:

```yaml
---
document: {nombre}
case: {case-id}
version: 1
created: {datetime}
author: instructor
status: draft
---
```

## IDIOMA

- Documentos legales en ESPAÑOL
- Mantener idioma original de los documentos (catalán/castellano)
- Citas textuales tal cual aparecen

## FIN

Cuando hayas terminado, resume:
- Hechos nivel 🟢 A: {número}
- Hechos nivel 🟡 B: {número}
- Lagunas ALTA criticidad: {número}
- Hechos que requieren más prueba: {número}
```

---

### 1.2 Abogado Parte Actora System Prompt

```markdown
# SYSTEM PROMPT: Abogado de la Parte Actora

## ROL
Eres un ABOGADO AGRESIVO cuya única misión es GANAR el caso 
para la parte actora. Construye la demanda más sólida posible.

## PRINCIPIOS ABSOLUTOS

1. **CADA ARGUMENTO REQUIERE CITA**
   - Norma: artículo exacto del Código Civil, LEC, LAU
   - Jurisprudencia: STS con fecha y ponente
   - Hecho: documento del expediente con excerpto

2. **SI UN ARGUMENTO ES DÉBIL, DILO**
   No presentes debilidades como fortalezas.
   Di: "Este argumento es vulnerable porque..."

3. **ESTRUCTURA LEGAL ES ESTRATEGIA**
   La forma de presentar los hechos importa tanto como los hechos.

4. **PRETENSIONES CLARAS**
   Cada pretensión: concepto + importe (si aplica) + fundamento

## FORMATO DE ARGUMENTO

```
[ARG-{XXX}] {Título del argumento}

NORMA: {artículo exacto}
  Texto: "{extracto relevante}"
  
JURISPRUDENCIA: {STS o null}
  Cita: "{extracto relevante}"
  
HECHO: {según expediente}
  Fuente: {documento}
  
ANÁLISIS: {tu interpretación legal}

SOLIDEZ: ████████░░ 8/10
```

## ESTRUCTURA DE LA DEMANDA

### 1. ANTECEDENTES DE HECHO
Presenta los hechos de forma cronológica y favorable.

### 2. FUNDAMENTOS DE DERECHO

#### 2.1 Contractuales
Cláusulas del contrato que sustentan tu posición.

#### 2.2 Legales
Artículos específicos de:
- Código Civil (1554, 1258, etc.)
- Ley de Arrendamientos Urbanos
- Ley de Enjuiciamiento Civil

#### 2.3 Jurisprudenciales
STS favorables con:
- Fecha exacta
- Ponente
- Hechos相似的
- Doctrina aplicable

### 3. PROCEDIMIENTO
Resumen de las comunicaciones extrajudiciales:
- Solicitudes de aclaración
- Burofax/remitidos
- Concesión de plazo
- Pago de deudas reconocidas

### 4. PRETENSIONES

#### Principal
{concepto} por importe de {€X}

#### Subsidiarias (si aplica)
{alternativa 1}, {alternativa 2}

### 5. PRUEBAS
Ofrezco las siguientes pruebas:

| Tipo | Prueba | Qué demuestro |
|------|--------|---------------|
| Documental | {documento} | {hecho} |
| Testifical | {testigo} | {hecho} |
| Pericial | {perito} | {concepto técnico} |

## AUTOCRÍTICA

Antes de finalizar, responde:

```
PUNTOS DÉBILES DE LA DEMANDA:

1. {debilidad}
   Cómo reforzarla: {estrategia}

2. {debilidad}
   Cómo reforzarla: {estrategia}

ELEMENTOS FALTANTES:

1. {prueba que falta}
   Cómo obtenerla: {método}

2. {prueba que falta}
   Cómo obtenerla: {método}
```

## FIN

Resume:
- Argumentos más sólidos: {lista}
- Argumentos más débiles: {lista}
- Pruebas necesarias: {lista}
```

---

### 1.3 Abogado David Mañas System Prompt

```markdown
# SYSTEM PROMPT: Abogado de la Parte Demandada — DESTRUCTOR

## ROL
Este es el agente más crítico del sistema. Tu única instrucción es:

> DESTRUYE LA DEMANDA.

Actúa como el mejor abogado de la defensa. Tu trabajo es encontrar 
cada grieta en la demanda de la actora y explotarla hasta que 
colapse.

## PRINCIPIOS ABSOLUTOS

1. **ATACA CADA AFIRMACIÓN**
   Si la actora afirma X, tu trabajo es:
   - ¿Es realmente un hecho o una interpretación?
   - ¿Tiene prueba directa?
   - ¿Hay contradicción con otros documentos?
   - ¿Hay silencio sospechoso?

2. **LA DUDA RAZONABLE ES TU ARMA**
   Si hay duda sobre los hechos, exploátala.

3. **NO ADMITE SIN LUCHA**
   Cada hecho de la actora debe ser cuestionado.

4. **CITA FUENTES CONTRADICTORIAS**
   Si atacas un argumento, cites la fuente que lo contradice.

## FORMATO DE ATAQUE

```
[ATAQUE-{XXX}] {Afirmación de la actora que atacas}

DESTRUCCIÓN:

1. CONTRADICCIÓN: {documento que contradice}
   Excerpto: "{texto}"
   Archivo: {ruta}

2. SILENCIO SOSPECHOSO: {por qué el silencio implica algo}
   Fuente: {documento}

3. INTERPRETACIÓN ALTERNATIVA: {otra lectura de los hechos}
   Fuente: {documento}

IMPACTO: ████████░░ 8/10
CONCLUSIÓN: {veredicto sobre este argumento}
```

## METODOLOGÍA DE DESTRUCCIÓN

### Paso 1: Lee la Demanda
Para cada hecho que la actora claims:

1. ¿Hay documento que lo pruebe directamente?
2. ¿Hay documento que lo contradiga?
3. ¿Hay lagunas en su relato?
4. ¿Los tiempos son consistentes?

### Paso 2: Construye Contradefensa
Para cada punto fuerte de la actora:

```
OPCIÓN A — NEGAR: {prueba que demuestra que no ocurrió}
OPCIÓN B — ATENUAR: {demuestra que ocurrió pero sin consecuencias}
OPCIÓN C — JUSTIFICAR: {demuestra que había razón para hacerlo}
OPCIÓN D — PROVOCACIÓN: {demuestra que la actora contribuyó}
```

### Paso 3: Busca Contradicicciones
- Contradicciones entre emails y WhatsApps
- Admisiones de David (para minimizar impacto)
- Inconsistencias temporales
- Silencios significativos

### Paso 4: Posibles Reconvenciones
¿Tiene David algo que reclamar?

```
RECONVENCIÓN #{N}:
  Concepto: {descripción}
  Importe: {€X}
  Fundamento: {contrato / normativa}
  Prueba: {documento}
```

### Paso 5: Estrategia Procesal
- ¿Hay excepciones procesales?
- ¿Falta algún requisito de forma?
- ¿El procedimiento es correcto?

### Paso 6: Top 10 Ataques
Prioriza los 10 ataques más impactantes:

```
═══════════════════════════════════════════════════════════════
                    TOP 10 ATAQUES A LA DEMANDA
═══════════════════════════════════════════════════════════════

#1 IMPACTO: {título}
   Razón: {por qué es devastador}
   Fuente: {documento}
   Efecto: {qué pasa si funciona}

#2 IMPACTO: {título}
   ...
```

## PREGUNTAS PARA LA VISTA

Genera 10 preguntas que harías al testigo de la actora:

```
1. "Acerca de los hechos del {fecha}, ¿puede explicar por qué..."
2. "¿Cuántos días transcurrieron entre...? "
...
```

## FIN

Resume:
- Ataques más devastadores: {lista}
- Argumentos de la actora que survive: {lista}
- Reconvenciones disponibles: {lista}
- Puntos fuertes de la defensa: {lista}
```

---

### 1.4 Judge System Prompt

```markdown
# SYSTEM PROMPT: Juez — Evaluador Neutral

## ROL
No defiendes a nadie. No atacas a nadie. Tu única función es 
decir la VERDAD sobre qué ocurriría si este caso llegara a juicio.

Eres el agente de REALISMO. Filtas el wishful thinking de los 
abogados.

## PRINCIPIOS ABSOLUTOS

1. **NEUTRALIDAD TOTAL**
   Ni favoreces a la actora ni a David.
   
2. **PRAGMATISMO JUDICIAL**
   Piensas como un juez, no como un abogado.
   
3. **LA DUDA RAZONABLE BENEFICIA AL DEMANDADO**
   Si hay duda, gana David.
   
4. **SOLO CUENTA LO PROBABLE**
   No importa quién tiene razón moral; importa quién puede probarlo.
   
5. **SIN PRUEBA = NO CUENTA**
   Si algo no puede probarse documentalmente, no lo consideres.

## FORMATO DE DICTAMEN

```
[DICTAMEN-{XXX}] {Tema del dictamen}

HECHO CONSIDERADO PROBADO: SÍ | NO

ANÁLISIS:
{razonamiento judicial}

VALORACIÓN: 🟢 SÓLIDO | 🟡 MEDIA | 🟠 DÉBIL | 🔴 RECHAZABLE

PREGUNTA PARA LA VISTA: {pregunta que haría}
```

## METODOLOGÍA

### Paso 1: Lee Todo
Lee en orden:
1. Expediente del Instructor
2. Demanda del Abogado Actora
3. Informe de Destrucción del Abogado David
4. Auditoría del Auditor

### Paso 2: Hechos que Considero Probados
Enumera los hechos con nivel 🟢 A o 🟡 B que admitirías:

```
HECHOS PROBADOS:

1. {hecho}
   Prueba: {documento}
   Nivel: 🟢 A
   
2. {hecho}
   Prueba: {documento} (con reservas)
   Nivel: 🟡 B
```

### Paso 3: Hechos que NO Considero Probados
Enumera lo que RECHAZARÍAS:

```
HECHOS RECHAZADOS:

1. {afirmación de la actora}
   Razón: {por qué no lo admito}
   
2. {afirmación de David}
   Razón: {por qué no lo admito}
```

### Paso 4: Pruebas con Poco Peso
¿Qué admitiré pero daré poco valor?

```
PRUEBAS DÉBILES (admitidas pero poco valor):

1. {prueba}
   Por qué poco valor: {razón}
```

### Paso 5: Preguntas para la Vista
Genera 10 preguntas que harías a las partes:

```
PREGUNTAS PARA LA VISTA:

1. Sobre el cambio de cerradura:
   "¿Cuántos días exactos transcurrieron entre el cambio y la 
   entrega de llaves?"

2. Sobre los suministros:
   "¿Puede demostrar que el IVA fue calculado correctamente?"
   
... (8 más)
```

### Paso 6: Veredicto Simulado
Para cada pretensión, da probabilidad de éxito:

```
═══════════════════════════════════════════════════════════════
                    VEREDICTO SIMULADO
═══════════════════════════════════════════════════════════════

PRETENSIÓN: Incumplimiento contractual (cambio cerradura)
PROBABILIDAD: ███████░░░ 70%
RAZONAMIENTO: Prueba clara pero daño difuso

PRETENSIÓN: Indemnización por perjuicos
PROBABILIDAD: ███░░░░░░░ 30%
RAZONAMIENTO: No hay cálculo concreto de daños

PRETENSIÓN: Deuda por suministros
PROBABILIDAD: ██████░░░░ 60%
RAZONAMIENTO: Depende de la auditoría final
```

## FIN

Resume:
- Hechos probados: {número}
- Hechos rechazados: {número}
- Probabilidad victoria actora: {X%}
- Probabilidad victoria David: {X%}
- Consejos para mejorar posición: {lista}
```

---

### 1.5 Auditor System Prompt

```markdown
# SYSTEM PROMPT: Auditor Documental — Verificador Numérico

## ROL
Eres el agente más simple y el más importante para evitar errores.

Tu trabajo: REVISAR NÚMEROS. Solo números.

## PRINCIPIOS ABSOLUTOS

1. **NO OPINAS SOBRE DERECHO**
   Cero interpretaciones jurídicas.
   
2. **SOLO NÚMEROS**
   Verificas: sumas, facturas, importes, fechas, correspondencias.
   
3. **CITA CADA NÚMERO**
   Todo importe va acompañado de su fuente.
   
4. **SI NO PUEDES VERIFICAR, DILO**
   [IMPORTE NO VERIFICABLE], [FACTURA FALTANTE]

## FORMATO DE HALLAZGO

```
[HALLAZGO-{XXX}] {Tipo de anomalía}

DETALLE:
  - Concepto: {qué se verifica}
  - Importe declarado: {€X}
  - Importe correcto: {€Y} (o [NO VERIFICABLE])
  - Diferencia: {€Z}
  
ARCHIVO: {ruta del documento}

IMPACTO: {€Z de diferencia}
ESTADO: [PENDIENTE DE ACLARACIÓN] | [CORREGIDO] | [VERIFICADO]
```

## METODOLOGÍA

### Paso 1: Auditoría de Rentas
Construye tabla:

```
AUDITORÍA DE RENTAS:

| Mes    | Pactada | Facturada | Pagada | Diferencia | Estado    |
|--------|---------|-----------|--------|------------|-----------|
| Ene 25 | 500€    | 500€      | 500€   | 0€         | ✓         |
| Feb 25 | 500€    | 500€      | 450€   | -50€       | ⚠️ PENDIENTE |
```

### Paso 2: Auditoría de Facturas
Por cada factura:

1. ¿El importe coincide con el concepto?
2. ¿El IVA está bien calculado?
3. ¿Hay factura rectificativa?
4. ¿La fecha es coherente con el período?

```
AUDITORÍA DE FACTURAS:

| Factura | Fecha | Concepto | Base | IVA | Total | Verificado |
|---------|-------|----------|------|-----|-------|------------|
| F-001   | 15/01 | Luz      | 100€ | 21€ | 121€  | ✓          |
| F-002   | 15/02 | Luz      | 100€ | 31€ | 131€  | ⚠️ ERROR IVA |
```

### Paso 3: Cruce Documental
Compara:
- Factura ↔ Transferencia bancaria
- Importe facturado ↔ Importe pagado
- Período facturado ↔ Servicios prestados

### Paso 4: Detección de Anomalías
Identifica:
- Facturas faltantes (huecos en fechas)
- Facturas duplicadas
- Importes que no cuadran
- IVA mal calculado
- Períodos sin facturación

### Paso 5: Saldo Provisional
Calcula:

```
SALDO PROVISIONAL:

LO RECLAMADO POR DAVID:
  - Rentas pendientes: {€X}
  - Suministros: {€Y}
  - Bombín: {€Z}
  TOTAL: {€TOTAL}

LO DISPUTADO POR FOODAY:
  - Irregularidades IVA: {€A}
  - Bombín no obligado: {€B}
  TOTAL: {€TOTAL_A}

SALDO PROVISIONAL: {€TOTAL - €TOTAL_A}
```

## FIN

Resume:
- Rentas verificadas: {número}
- Facturas verificadas: {número}
- Hallazgos: {número}
- Saldo provisional: {€X}
- Pendiente de documentación: {lista}
```

---

## 2. MCP Configuration

### 2.1 NotebookLM MCP Server (Desktop)

```bash
# ~/.notebooklm-mcp/config.sh (en desktop)

export NOTEBOOKLM_TRANSPORT=http
export NOTEBOOKLM_PORT=3000
export NOTEBOOKLM_HOST=0.0.0.0
export NOTEBOOKLM_PROFILE=standard
export NOTEBOOKLM_AI_MARKER=false

# Arrancar servidor
notebooklm-mcp --transport http --port 3000 --host 0.0.0.0
```

### 2.2 Pi MCP Client Configuration

```yaml
# /data/data/com.termux/files/home/.pi/agent/mcp-servers.yaml

mcpServers:
  notebooklm:
    type: http
    url: http://192.168.1.100:3000/mcp  # IP del desktop
    timeout: 120000
    retry:
      attempts: 3
      delay: 5000
```

### 2.3 Tool Access by Agent

```yaml
# Configuración de qué tools usa cada agente

instructor:
  tools:
    - notebooklm_list_notebooks
    - notebooklm_select_notebook
    - notebooklm_ask_question
    - notebooklm_get_source_fulltext
    - notebooklm_add_source

abogado_actora:
  tools:
    - notebooklm_ask_question
    - notebooklm_list_notebooks

abogado_david:
  tools:
    - notebooklm_ask_question
    - notebooklm_list_notebooks

auditor:
  tools:
    - notebooklm_ask_question
    - notebooklm_get_source_fulltext
```

---

## 3. Pipeline Scripts

### 3.1 Orchestrator Principal (Node.js)

```typescript
// /scripts/orchestrator.ts

import { SubagentPool } from 'pi-subagents';
import { NotebookLMClient } from './notebooklm-client';
import * as fs from 'fs/promises';
import * as path from 'path';

interface AgentResult {
  agent: string;
  status: 'success' | 'error';
  output: string;
  duration: number;
}

interface PipelineConfig {
  caseId: string;
  notebookId: string;
  agents: {
    instructor: boolean;
    abogadoActora: boolean;
    abogadoDavid: boolean;
    juez: boolean;
    auditor: boolean;
  };
}

class LegalPipeline {
  private notebookLM: NotebookLMClient;
  private outputDir: string;

  constructor(config: PipelineConfig) {
    this.notebookLM = new NotebookLMClient(config.notebookId);
    this.outputDir = path.join('cases', config.caseId);
  }

  async run(): Promise<AgentResult[]> {
    const results: AgentResult[] = [];

    // Fase 1: Expediente
    console.log('📋 FASE 1: Construyendo expediente...');
    const instructorResult = await this.runAgent('instructor');
    results.push(instructorResult);

    // Fase 2: Paralelo (Demanda, Destrucción, Auditoria)
    console.log('⚖️ FASE 2: Ejecutando agentes en paralelo...');
    const [actoraResult, davidResult, auditorResult] = await Promise.all([
      this.runAgent('abogado-actora'),
      this.runAgent('abogado-david'),
      this.runAgent('auditor'),
    ]);
    results.push(actoraResult, davidResult, auditorResult);

    // Fase 3: Ronda Adversarial
    console.log('🔥 FASE 3: Ronda adversarial...');
    const debateResult = await this.runDebateRound();
    results.push(debateResult);

    // Fase 4: Evaluación del Juez
    console.log('⚖️ FASE 4: Evaluando...');
    const juezResult = await this.runAgent('juez');
    results.push(juezResult);

    return results;
  }

  private async runAgent(agent: string): Promise<AgentResult> {
    const start = Date.now();
    
    // Cargar prompt del agente
    const promptPath = path.join('prompts', `${agent}.md`);
    const prompt = await fs.readFile(promptPath, 'utf-8');
    
    // Ejecutar via subagent
    const result = await SubagentPool.run(agent, {
      task: prompt,
      context: 'fork',
    });

    // Guardar output
    const outputPath = path.join(this.outputDir, `${agent}-output.md`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, result.output);

    return {
      agent,
      status: result.error ? 'error' : 'success',
      output: result.output,
      duration: Date.now() - start,
    };
  }

  private async runDebateRound(): Promise<AgentResult> {
    // Ronda adversarial: David ataca → Actora responde
    const debatePrompt = await fs.readFile('prompts/debate-round2.md', 'utf-8');
    
    const result = await SubagentPool.run('debate', {
      task: debatePrompt,
      context: 'fork',
    });

    const outputPath = path.join(this.outputDir, 'debate', 'ronda2.md');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, result.output);

    return {
      agent: 'debate-ronda2',
      status: result.error ? 'error' : 'success',
      output: result.output,
      duration: Date.now() - Date.now(),
    };
  }

  async generateFinalOutputs(): Promise<void> {
    // Generar versión final de demanda
    // Generar defensa prevista
    // Generar preguntas para vista
    console.log('📄 Generando outputs finales...');
  }
}

export { LegalPipeline, AgentResult, PipelineConfig };
```

### 3.2 NotebookLM Client (Node.js)

```typescript
// /scripts/notebooklm-client.ts

interface NotebookLMConfig {
  baseUrl: string;
  notebookId: string;
}

interface QueryResult {
  answer: string;
  sources: Array<{
    index: number;
    title: string;
    excerpt: string;
    url?: string;
  }>;
}

class NotebookLMClient {
  private baseUrl: string;
  private notebookId: string;

  constructor(config: NotebookLMConfig) {
    this.baseUrl = config.baseUrl;
    this.notebookId = config.notebookId;
  }

  async ask(question: string): Promise<QueryResult> {
    // Llama a notebooklm_ask via MCP o HTTP
    const response = await fetch(`${this.baseUrl}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notebook_id: this.notebookId,
        question,
        source_format: 'footnotes',
      }),
    });

    if (!response.ok) {
      throw new Error(`NotebookLM error: ${response.statusText}`);
    }

    return response.json();
  }

  async listNotebooks(): Promise<Array<{ id: string; name: string }>> {
    const response = await fetch(`${this.baseUrl}/notebooks`);
    return response.json();
  }

  async addSource(url: string): Promise<void> {
    await fetch(`${this.baseUrl}/sources`, {
      method: 'POST',
      body: JSON.stringify({
        notebook_id: this.notebookId,
        url,
      }),
    });
  }

  formatCitation(result: QueryResult, claim: string): string {
    // Formatea la respuesta con citations estandarizadas
    let output = `[AFIRMACIÓN] ${claim}\n\n`;
    output += `RESPUESTA: ${result.answer}\n\n`;
    
    if (result.sources.length > 0) {
      output += `FUENTES:\n`;
      result.sources.forEach((s, i) => {
        output += `  [${i + 1}] ${s.title}\n`;
        output += `      Excerpto: "${s.excerpt}"\n`;
        if (s.url) output += `      URL: ${s.url}\n`;
      });
    }
    
    return output;
  }
}

export { NotebookLMClient, QueryResult, NotebookLMConfig };
```

### 3.3 Bash Launcher (para uso simple)

```bash
#!/bin/bash
# /scripts/run-pipeline.sh

CASE_ID=$1
NOTEBOOK_ID=$2

echo "============================================"
echo "  SISTEMA MULTI-AGENTE JURÍDICO"
echo "  Caso: $CASE_ID"
echo "============================================"

# Crear estructura de carpetas
mkdir -p "cases/$CASE_ID"/{expediente,demanda,defensa,evaluacion,auditoria,debate}
mkdir -p "cases/$CASE_ID/documents"/{contratos,correspondencia,mensajes,facturas,pruebas}

# Seleccionar notebook
echo "📚 Seleccionando notebook: $NOTEBOOK_ID"

# Fase 1
echo ""
echo "📋 FASE 1: Construyendo expediente..."
echo "============================================"
# Aquí iría la llamada al agente instructor
echo "✅ Instructor completado"

# Fase 2
echo ""
echo "⚖️ FASE 2: Ejecutando agentes..."
echo "============================================"
echo "   → Abogado actora: Demanda v1"
echo "   → Abogado David: Informe de destrucción"
echo "   → Auditor: Verificación numérica"
echo "✅ FASE 2 completada"

# Fase 3
echo ""
echo "🔥 FASE 3: Ronda adversarial..."
echo "============================================"
echo "✅ Debate completado"

# Fase 4
echo ""
echo "⚖️ FASE 4: Evaluación..."
echo "============================================"
echo "✅ Veredicto del juez completado"

echo ""
echo "============================================"
echo "  PIPELINE COMPLETADO"
echo "  Outputs en: cases/$CASE_ID/"
echo "============================================"
```

---

## 4. Prompt Templates por Query

### 4.1 Instructor Queries

```markdown
# Query: Reconstruir cronología
"Extrae todos los eventos relevantes ordenados por fecha.
 Para cada evento indica:
 1. Fecha exacta o aproximada
 2. Qué ocurrió
 3. Qué documento lo prueba
 Formato: tabla con columnas FECHA, HECHO, FUENTE, NIVEL"

# Query: Hechos sobre tema específico
"Busca todos los documentos relacionados con el cambio de cerradura.
 Dame los excerpts relevantes de cada documento con fecha y origen"

# Query: Detectar contradicciones
"Busca mensajes o emails donde haya versiones contradictorias
 entre las partes sobre un mismo hecho"
```

### 4.2 Abogado Actora Queries

```markdown
# Query: Jurisprudencia relevante
"Busca jurisprudencia española sobre:
 1. Obligación de goce pacífico en arrendamiento
 2. Cambio unilateral de cerradura
 3. Incumplimiento contractual por impago
 Dame las STS con fecha, ponente, y principio aplicable"

# Query: Argumentos fuertes
"Basándote en los documentos, qué hechos están más claramente
 probados y qué norma los sustenta"
```

### 4.3 Abogado David Queries

```markdown
# Query: Contradicciones en demanda
"Busca en los documentos momentos donde la actora contradice
 su propio relato o donde hay lagunas en su versión"

# Query: Mensajes favorables a David
"Busca mensajes, emails o documentos donde la actora:
 1. Admite retrasos en pagos
 2. Indica que no tenía prisa
 3. Reconoce flexibilidad en las condiciones
 4. No protesta inmediatamente ante algún hecho"
```

### 4.4 Auditor Queries

```markdown
# Query: Verificación de importes
"Dame todas las facturas de suministros con importes y fechas.
 Verifica si el IVA está bien calculado"

# Query: Facturas faltantes
"Hay algún período sin facturación? Dame un resumen de todas
 las facturas emitidas por mes"
```

---

## 5. File Templates

### 5.1 Expediente Maestro Template

```markdown
---
document: expediente-maestro
case: {case-id}
version: {version}
created: {datetime}
author: instructor
status: draft
---

# EXPEDIENTE MAESTRO

## RESUMEN EJECUTIVO

*Tres páginas. Entendible sin leer el resto.*

### ¿Quién es la parte actora?
{nombre, identificación}

### ¿Quién es la parte demandada?
{nombre, identificación}

### ¿Qué ha ocurrido?
{narrativa breve del conflicto}

### ¿Qué pide la actora?
{pretensiones concretas}

---

## 1. PARTES

### 1.1 Parte Actora
| Campo | Datos |
|-------|-------|
| Nombre | |
| CIF/NIF | |
| Representación | |
| Domicilio | |

### 1.2 Parte Demandada
| Campo | Datos |
|-------|-------|
| Nombre | |
| DNI/NIF | |
| Relación contractual | |
| Domicilio | |

---

## 2. CONTRATO

### 2.1 Datos del Contrato
| Campo | Valor |
|-------|-------|
| Tipo | Subarrendamiento |
| Fecha firma | |
| Duración | |
| Objeto | |

### 2.2 Cláusulas Relevantes
| Cláusula | Texto | Análisis |
|----------|-------|----------|
| | | |

---

## 3. CRONOLOGÍA

| Fecha | Hecho | Fuente | Nivel |
|-------|-------|--------|-------|
| | | | |

---

## 4. HECHOS CLASIFICADOS

### 🟢 Hechos Nivel A (Probados)
| ID | Hecho | Fuente |
|----|-------|--------|
| | | |

### 🟡 Hechos Nivel B (Probables)
| ID | Hecho | Fuente | Observación |
|----|-------|--------|-------------|
| | | | |

---

## 5. LAGUNAS DETECTADAS

| # | Descripción | Criticidad | ¿Verificable? |
|---|-------------|------------|----------------|
| | | | |

---

## 6. MATRIZ DE PRUEBAS

| HECHO | DOCUMENTO | DEMUESTRA | NIVEL |
|-------|-----------|-----------|-------|
| | | | |

---

## ANEXO: ÍNDICE DE DOCUMENTOS

| # | Documento | Fecha | Tipo | Importancia |
|---|-----------|-------|------|-------------|
| | | | | |
```

### 5.2 Demanda Template

```markdown
---
document: demanda
case: {case-id}
version: {version}
created: {datetime}
author: abogado-actora
status: draft
---

# DEMANDA

**AL JUZGADO DE PRIMERA INSTANCIA N.º {N} DE {CIUDAD}**

---

## PARTES

**DEMANDANTE:** {nombre completo} (nombre comercial: {nombre})
CIF: {cif}
Domicilio: {dirección}
Representado/a por: {nombre del abogado}

**DEMANDADO/A:** {nombre completo}
DNI/NIF: {dni}
Domicilio: {dirección}

---

## ANTECEDENTES DE HECHO

{PRIMERO.} [Hechos bien estructurados y cronológicos]

{SEGUNDO.} [Fundamentos de los hechos]

{TERCERO.} [Procedimiento extrajudicial]

---

## FUNDAMENTOS DE DERECHO

### I. DE DERECHO PROCESAL

{Artículos de la LEC aplicables}

### II. DE DERECHO SUSTANTIVO

#### A) Contractuales
{Cláusulas del contrato relevantes}

#### B) Legales
{Artículos del Código Civil, LAU, etc.}

#### C) Jurisprudenciales
{Sentencias favorables}

---

## PROCEDIMIENTO

{Resumen de las comunicaciones extrajudiciales}

---

## PRETENSIONES

**PRINCIPAL:** {concepto} por importe de {€X}

**SUBSIDIARIA 1:** {alternativa}

**SUBSIDIARIA 2:** {alternativa}

---

## PRUEBAS

| Tipo | Prueba | Hecho que demuestro |
|------|--------|---------------------|
| Documental | | |
| Testifical | | |
| Pericial | | |
| Interrogatorio | | |

---

## HECHO PROBABLE

{Deber de buena fe procesal}

---

AL JUZGADO SUPLICO: { resumen de lo que se pide }

{en lugar y fecha}

{Abogado signature}

---

*Documentos que se acompañan:*
1. {documento}
2. {documento}
```

---

## 6. Tests de Verificación

### 6.1 Citation Verification Test

```typescript
// /tests/citation-verification.test.ts

import { execSync } from 'child_process';

interface CitationCheck {
  file: string;
  uncited_claims: string[];
  unverified_claims: string[];
}

function verifyCitations(content: string): CitationCheck {
  const citations = content.match(/\[(D\d+|N\d+|J\d+)\]/g) || [];
  const claims = content.match(/\[(HECHO|ARG|ATAQUE|DICTAMEN|VERIFICADO)-\d+\]/g) || [];
  
  // Verificar que cada claim tiene cita
  // Verificar que cada cita está en sources
  // Verificar formato de citation
  
  return {
    file: 'unknown',
    uncited_claims: [],
    unverified_claims: [],
  };
}

describe('Citation Verification', () => {
  test('every claim has source citation', () => {
    const files = ['expediente-maestro.md', 'demanda.md', 'informe-destruccion.md'];
    
    files.forEach(file => {
      const content = require('fs').readFileSync(`cases/test/${file}`, 'utf-8');
      const result = verifyCitations(content);
      
      expect(result.uncited_claims).toHaveLength(0);
    });
  });

  test('no [SIN PRUEBA SUFICIENTE] in final demanda', () => {
    // La demanda final no debe contener hechos no probados
    const demanda = require('fs').readFileSync('cases/test/demanda-final.md', 'utf-8');
    
    // Si hay [SIN PRUEBA], debe estar marcado como alegato no probado
  });

  test('auditor has no legal opinions', () => {
    const auditoria = require('fs').readFileSync('cases/test/auditoria.md', 'utf-8');
    
    // No debe contener términos jurídicos de valoración
    const legalTerms = ['culpa', 'derecho', 'pretensión', 'indemnización'];
    
    legalTerms.forEach(term => {
      expect(auditoria).not.toMatch(new RegExp(`\\b${term}\\b`, 'i'));
    });
  });
});
```

### 6.2 Format Validation Test

```typescript
// /tests/format-validation.test.ts

describe('Document Format Validation', () => {
  test('expediente has required sections', () => {
    const sections = [
      'RESUMEN EJECUTIVO',
      'PARTES',
      'CONTRATO',
      'CRONOLOGÍA',
      'HECHOS CLASIFICADOS',
      'LAGUNAS DETECTADAS',
      'MATRIZ DE PRUEBAS',
    ];
    
    sections.forEach(section => {
      expect(expediente).toContain(section);
    });
  });

  test('demanda has required sections', () => {
    const sections = [
      'ANTECEDENTES DE HECHO',
      'FUNDAMENTOS DE DERECHO',
      'PRETENSIONES',
      'PRUEBAS',
    ];
    
    sections.forEach(section => {
      expect(demanda).toContain(section);
    });
  });

  test('each section has citation or marker', () => {
    // Cada hecho en LAE debe tener [D1], [N1], etc.
    // Cada hecho sin prueba debe tener [SIN PRUEBA SUFICIENTE]
  });
});
```

---

## 7. Configuration Files

### 7.1 Project package.json

```json
{
  "name": "sistema-agentes-juridicos",
  "version": "1.0.0",
  "description": "Sistema multi-agente jurídico con debate adversarial",
  "scripts": {
    "start": "node scripts/run-pipeline.sh",
    "test": "node tests/run.js",
    "verify": "node tests/citation-verification.js",
    "notebooklm:auth": "notebooklm-mcp setup_auth",
    "notebooklm:server": "notebooklm-mcp --transport http --port 3000"
  },
  "dependencies": {
    "notebooklm-mcp": "^2.0.0",
    "@modelcontextprotocol/sdk": "^1.0.0",
    "yaml": "^2.3.0",
    "glob": "^10.0.0",
    "simple-git": "^3.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "jest": "^29.0.0"
  }
}
```

### 7.2 Python requirements.txt

```txt
pydantic>=1.0,<2.0
httpx>=0.20
python-dotenv>=1.0.0
pandas>=2.0.0
openpyxl>=3.0.0  # Para leer Excel con facturas
```

### 7.3 NotebookLM Setup Guide

```markdown
# Setup NotebookLM MCP

## En tu Desktop (con Chrome)

1. Instalar Node.js 18+
2. Instalar npm:
   ```bash
   npm install -g notebooklm-mcp
   ```

3. Autenticarse (solo primera vez):
   ```bash
   notebooklm-mcp setup_auth
   ```
   - Se abrirá Chrome
   - Inicia sesión con tu cuenta Google
   - Listo

4. Arrancar servidor HTTP:
   ```bash
   notebooklm-mcp --transport http --port 3000 --host 0.0.0.0
   ```

## En Pi/Termux

1. Crear archivo de configuración:
   ```bash
   # ~/.pi/agent/mcp-servers.json
   {
     "mcpServers": {
       "notebooklm": {
         "url": "http://<IP-DE-TU-DESKTOP>:3000/mcp"
       }
     }
   }
   ```

2. Crear notebook en NotebookLM:
   - Ve a https://notebooklm.google.com
   - Crea nuevo notebook
   - Sube tus documentos
   - Copia el notebook ID

3. Configurar en el pipeline:
   ```bash
   ./run-pipeline.sh FOODAY-vs-MANAS <notebook-id>
   ```

## Verificar Conexión

```bash
curl http://<IP-DESKTOP>:3000/healthz
```

Debe responder con status OK.
```

---

## 8. Acceptance Tests

### 8.1 Test Scenarios

```markdown
## TEST CASE 1: Instructor genera expediente completo

GIVEN: 10 documentos (emails, WhatsApp, facturas, contrato)
WHEN: Ejecuto el pipeline completo
THEN:
  - Genera expediente-maestro.md con todas las secciones
  - Cada hecho tiene nivel de prueba (A/B/C/D)
  - Cada hecho citable tiene fuente documentales
  - Lagunas detectadas marcadas con [NO DOCUMENTADA]
  - No hay hechos inventados

## TEST CASE 2: Abogado David destruye demanda

GIVEN: Demanda v1 con 10 argumentos
WHEN: Ejecuto Abogado David
THEN:
  -生成 informe-destruccion.md
  - Cada argumento de la demanda es atacado
  - Cada ataque cites fuente contradictory
  - Top 10 ataques priorizados

## TEST CASE 3: Ronda adversarial

GIVEN: Demanda + Informe de destrucción
WHEN: Ejecuto ronda adversarial
THEN:
  - David ataca cada claim
  - Actora responde a cada ataque
  - Instructor actualiza expediente con nuevas citas
  -生成 debate/ronda2.md

## TEST CASE 4: Veredicto del juez

GIVEN: Todo los documentos del caso
WHEN: Ejecuto Judge
THEN:
  - Lista de hechos probados coincide con nivel A/B
  - Veredicto simulado da probabilidades
  - Preguntas para vista son relevantes

## TEST CASE 5: Auditor solo verifica números

GIVEN: 20 facturas + extractos bancarios
WHEN: Ejecuto Auditor
THEN:
  - Tabla de rentas verificada
  - Hallazgos numerados
  - Sin opiniones jurídicas
  - Saldo provisional calculado
```

---

## Status: DESIGN COMPLETE

El Design está completo. Define:
- System prompts exactos de los 5 agentes
- Configuración MCP (desktop + Pi)
- Scripts de pipeline (TypeScript + Bash)
- Client de NotebookLM
- Templates de documentos
- Queries predefinidas por agente
- Tests de verificación de citación
- Configuration files completos

**Próxima fase: Tasks** — Descomposición en tareas implementables.

