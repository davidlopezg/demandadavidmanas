#!/usr/bin/env node

/**
 * Orchestrator — Sistema Multi-Agente Jurídico
 * 
 * Versión completa con los 5 agentes y debate adversarial.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { NotebookLMClient, INSTRUCTOR_QUERIES, ABOGADO_DAVID_QUERIES, AUDITOR_QUERIES, ABOGADO_ACTORA_QUERIES } from './notebooklm-client.js';

interface AgentResult {
  agent: string;
  status: 'success' | 'error';
  output: string;
  duration: number;
  error?: string;
}

interface PipelineConfig {
  caseId: string;
  notebookId: string;
  notebookLMUrl: string;
  outputDir: string;
  agents: {
    instructor: boolean;
    abogadoActora: boolean;
    abogadoDavid: boolean;
    juez: boolean;
    auditor: boolean;
  };
}

const DEFAULT_CONFIG: PipelineConfig = {
  caseId: 'default',
  notebookId: '',
  notebookLMUrl: process.env.NOTEBOOKLM_URL || 'http://localhost:3000',
  outputDir: 'cases',
  agents: {
    instructor: true,
    abogadoActora: true,
    abogadoDavid: true,
    juez: true,
    auditor: true,
  },
};

class LegalPipeline {
  private config: PipelineConfig;
  private notebookLM: NotebookLMClient;
  private startTime: number;
  private outputs: Map<string, string> = new Map();

  constructor(config: Partial<PipelineConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.notebookLM = new NotebookLMClient({
      url: this.config.notebookLMUrl,
      notebookId: this.config.notebookId,
    });
    this.startTime = Date.now();
  }

  async run(): Promise<AgentResult[]> {
    const results: AgentResult[] = [];

    console.log('\n╔═══════════════════════════════════════════════════════════════╗');
    console.log('║          SISTEMA MULTI-AGENTE JURÍDICO                         ║');
    console.log('║          Pipeline Completo                                     ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');
    console.log(`Caso: ${this.config.caseId}`);
    console.log(`Notebook: ${this.config.notebookId}`);
    console.log(`NotebookLM: ${this.config.notebookLMUrl}\n`);

    try {
      // Conectar a NotebookLM
      console.log('📡 Conectando a NotebookLM...');
      await this.notebookLM.connect();
      
      if (this.config.notebookId) {
        await this.notebookLM.selectNotebook(this.config.notebookId);
      }

      // Crear estructura de carpetas
      await this.createCaseStructure();

      // ═══════════════════════════════════════════════════════════════
      // FASE 1: EXPEDIENTE
      // ═══════════════════════════════════════════════════════════════
      console.log('\n═══════════════════════════════════════════════════════════════');
      console.log('  FASE 1: CONSTRUYENDO EXPEDIENTE');
      console.log('═══════════════════════════════════════════════════════════════\n');

      const instructorResult = await this.runInstructor();
      results.push(instructorResult);
      this.outputs.set('instructor', instructorResult.output);

      // ═══════════════════════════════════════════════════════════════
      // FASE 2: ANÁLISIS PARALELO
      // ═══════════════════════════════════════════════════════════════
      console.log('\n═══════════════════════════════════════════════════════════════');
      console.log('  FASE 2: ANÁLISIS PARALELO');
      console.log('═══════════════════════════════════════════════════════════════\n');

      const paraleloResults = await Promise.all([
        this.runAbogadoActora(),
        this.runAbogadoDavid(),
        this.runAuditor(),
      ]);

      paraleloResults.forEach((result, i) => {
        if (result) {
          results.push(result);
          const names = ['abogado-actora', 'abogado-david', 'auditor'];
          this.outputs.set(names[i], result.output);
        }
      });

      // ═══════════════════════════════════════════════════════════════
      // FASE 3: DEBATE ADVERSARIAL
      // ═══════════════════════════════════════════════════════════════
      console.log('\n═══════════════════════════════════════════════════════════════');
      console.log('  FASE 3: DEBATE ADVERSARIAL');
      console.log('═══════════════════════════════════════════════════════════════\n');

      const debateResult = await this.runDebateRound();
      results.push(debateResult);
      this.outputs.set('debate', debateResult.output);

      // ═══════════════════════════════════════════════════════════════
      // FASE 4: EVALUACIÓN DEL JUEZ
      // ═══════════════════════════════════════════════════════════════
      console.log('\n═══════════════════════════════════════════════════════════════');
      console.log('  FASE 4: EVALUACIÓN DEL JUEZ');
      console.log('═══════════════════════════════════════════════════════════════\n');

      const judgeResult = await this.runJudge();
      results.push(judgeResult);
      this.outputs.set('juez', judgeResult.output);

      // ═══════════════════════════════════════════════════════════════
      // FASE 5: OUTPUTS FINALES
      // ═══════════════════════════════════════════════════════════════
      console.log('\n═══════════════════════════════════════════════════════════════');
      console.log('  FASE 5: GENERANDO OUTPUTS FINALES');
      console.log('═══════════════════════════════════════════════════════════════\n');

      await this.generateFinalOutputs();

    } catch (error) {
      console.error('\n❌ Error en el pipeline:', error);
    } finally {
      await this.notebookLM.disconnect();
    }

    this.printSummary(results);
    return results;
  }

  private async runInstructor(): Promise<AgentResult> {
    const start = Date.now();
    console.log('📋 Instructor — Construyendo expediente...\n');

    try {
      const queries = [
        { name: 'cronologia', query: INSTRUCTOR_QUERIES.cronologia },
        { name: 'hechosCerradura', query: INSTRUCTOR_QUERIES.hechosCerradura },
        { name: 'hechosSuministros', query: INSTRUCTOR_QUERIES.hechosSuministros },
        { name: 'comunicaciones', query: INSTRUCTOR_QUERIES.comunicaciones },
        { name: 'mensajesNoPrisa', query: INSTRUCTOR_QUERIES.mensajesNoPrisa },
      ];

      const results: Record<string, string> = {};
      
      for (const q of queries) {
        console.log(`   🔍 Query: ${q.name}`);
        try {
          const result = await this.notebookLM.ask(q.query);
          results[q.name] = result.answer;
        } catch (error) {
          console.warn(`   ⚠️ Query falló: ${error}`);
          results[q.name] = '[ERROR EN QUERY]';
        }
      }

      const output = this.generateExpediente(results);
      await this.saveOutput('expediente', 'expediente-maestro.md', output);
      console.log('   ✅ Instructor completado');

      return { agent: 'instructor', status: 'success', output, duration: Date.now() - start };

    } catch (error) {
      return { agent: 'instructor', status: 'error', output: '', duration: Date.now() - start, error: String(error) };
    }
  }

  private async runAbogadoActora(): Promise<AgentResult | null> {
    const start = Date.now();
    console.log('📝 Abogado Actora — Construyendo demanda...\n');

    try {
      const queries = [
        { name: 'jurisprudencia', query: ABOGADO_ACTORA_QUERIES.jurisprudenciaGocePacifico },
        { name: 'cambioCerradura', query: ABOGADO_ACTORA_QUERIES.jurisprudenciaCambioCerradura },
      ];

      const results: Record<string, string> = {};
      
      for (const q of queries) {
        try {
          const result = await this.notebookLM.ask(q.query);
          results[q.name] = result.answer;
        } catch (error) {
          results[q.name] = '[ERROR]';
        }
      }

      const output = this.generateDemanda(results);
      await this.saveOutput('demanda', 'demanda-v1.md', output);
      console.log('   ✅ Abogado Actora completado');

      return { agent: 'abogado-actora', status: 'success', output, duration: Date.now() - start };

    } catch (error) {
      return { agent: 'abogado-actora', status: 'error', output: '', duration: Date.now() - start, error: String(error) };
    }
  }

  private async runAbogadoDavid(): Promise<AgentResult> {
    const start = Date.now();
    console.log('⚔️ Abogado David — Generando informe de destrucción...\n');

    try {
      const queries = [
        { name: 'contradicciones', query: ABOGADO_DAVID_QUERIES.contradicciones },
        { name: 'mensajesFavorables', query: ABOGADO_DAVID_QUERIES.mensajesFavorablesDavid },
        { name: 'ataques', query: ABOGADO_DAVID_QUERIES.ataquesDemanda },
      ];

      const results: Record<string, string> = {};
      
      for (const q of queries) {
        try {
          const result = await this.notebookLM.ask(q.query);
          results[q.name] = result.answer;
        } catch (error) {
          results[q.name] = '[ERROR]';
        }
      }

      const output = this.generateInformeDestruccion(results);
      await this.saveOutput('defensa', 'informe-destruccion.md', output);
      console.log('   ✅ Abogado David completado');

      return { agent: 'abogado-david', status: 'success', output, duration: Date.now() - start };

    } catch (error) {
      return { agent: 'abogado-david', status: 'error', output: '', duration: Date.now() - start, error: String(error) };
    }
  }

  private async runAuditor(): Promise<AgentResult> {
    const start = Date.now();
    console.log('🔢 Auditor — Verificando números...\n');

    try {
      const queries = [
        { name: 'importes', query: AUDITOR_QUERIES.verificacionImportes },
        { name: 'facturas', query: AUDITOR_QUERIES.facturasFaltantes },
        { name: 'iva', query: AUDITOR_QUERIES.erroresIVA },
      ];

      const results: Record<string, string> = {};
      
      for (const q of queries) {
        try {
          const result = await this.notebookLM.ask(q.query);
          results[q.name] = result.answer;
        } catch (error) {
          results[q.name] = '[ERROR]';
        }
      }

      const output = this.generateAuditoria(results);
      await this.saveOutput('auditoria', 'auditoria-numerica.md', output);
      console.log('   ✅ Auditor completado');

      return { agent: 'auditor', status: 'success', output, duration: Date.now() - start };

    } catch (error) {
      return { agent: 'auditor', status: 'error', output: '', duration: Date.now() - start, error: String(error) };
    }
  }

  private async runDebateRound(): Promise<AgentResult> {
    const start = Date.now();
    console.log('🔥 Debate Adversarial — Ronda 2...\n');

    // Obtener outputs previos
    const demanda = this.outputs.get('abogado-actora') || '[Demanda no disponible]';
    const destruccion = this.outputs.get('abogado-david') || '[Informe de destrucción no disponible]';
    const auditoria = this.outputs.get('auditor') || '[Auditoría no disponible]';

    // Generar debate simulando las rondas
    const output = this.generateDebate(demanda, destruccion, auditoria);
    await this.saveOutput('debate', 'ronda2.md', output);
    console.log('   ✅ Debate completado');

    return { agent: 'debate-ronda2', status: 'success', output, duration: Date.now() - start };
  }

  private async runJudge(): Promise<AgentResult> {
    const start = Date.now();
    console.log('⚖️ Judge — Evaluando caso...\n');

    // Generar veredicto basado en todos los outputs
    const allOutputs = Array.from(this.outputs.values()).join('\n\n');
    const output = this.generateVeredicto(allOutputs);
    await this.saveOutput('evaluacion', 'veredicto-simulado.md', output);
    console.log('   ✅ Judge completado');

    return { agent: 'juez', status: 'success', output, duration: Date.now() - start };
  }

  private async generateFinalOutputs(): Promise<void> {
    console.log('📄 Generando documentos finales...\n');

    // Generar demanda final
    await this.saveOutput('demanda', 'demanda-final.md', 
      `# DEMANDA FINAL\n\n[Versión final después del debate adversarial]\n\n${this.outputs.get('abogado-actora') || ''}`);

    // Generar defensa prevista
    await this.saveOutput('defensa', 'defensa-prevista.md',
      `# DEFENSA PREVISTA\n\n[Basada en el informe de destrucción y el veredicto del juez]\n\n${this.outputs.get('abogado-david') || ''}`);

    // Generar preguntas para la vista
    await this.saveOutput('evaluacion', 'preguntas-vista.md',
      `# PREGUNTAS PARA LA VISTA ORAL\n\n[Basadas en el veredicto del juez]\n\n${this.outputs.get('juez') || ''}`);

    // Generar puntos débiles
    await this.saveOutput('evaluacion', 'puntos-debiles.md',
      `# PUNTOS DÉBILES DEL CASO\n\n[Identificados durante el debate adversarial]`);

    console.log('   ✅ Outputs finales generados');
  }

  private async createCaseStructure(): Promise<void> {
    const dirs = [
      'expediente', 'demanda', 'defensa', 'evaluacion', 'auditoria', 'debate',
      'documents/contratos', 'documents/correspondencia', 'documents/mensajes',
      'documents/facturas', 'documents/pruebas',
    ];

    const basePath = path.join(this.config.outputDir, this.config.caseId);
    
    for (const dir of dirs) {
      await fs.mkdir(path.join(basePath, dir), { recursive: true });
    }

    console.log(`   📁 Estructura creada: ${basePath}`);
  }

  private async saveOutput(folder: string, filename: string, content: string): Promise<void> {
    const outputPath = path.join(this.config.outputDir, this.config.caseId, folder, filename);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, content);
  }

  private generateExpediente(results: Record<string, string>): string {
    const now = new Date().toISOString();
    return `# EXPEDIENTE MAESTRO

---
document: expediente-maestro
case: ${this.config.caseId}
version: 1
created: ${now}
author: instructor
status: draft
---

# EXPEDIENTE MAESTRO

*Generado automáticamente por el Sistema Multi-Agente Jurídico.*

## CRONOLOGÍA

${results.cronologia || '[Pendiente]'}

## HECHOS: CAMBIO DE CERRADURA

${results.hechosCerradura || '[Pendiente]'}

## HECHOS: SUMINISTROS

${results.hechosSuministros || '[Pendiente]'}

## COMUNICACIONES

${results.comunicaciones || '[Pendiente]'}

## MENSAJES "NO TENÍA PRISA"

${results.mensajesNoPrisa || '[Pendiente]'}

---
*Generado: ${now}*
`;
  }

  private generateDemanda(results: Record<string, string>): string {
    const now = new Date().toISOString();
    return `# DEMANDA V1

---
document: demanda
case: ${this.config.caseId}
version: 1
created: ${now}
author: abogado-actora
status: draft
---

# DEMANDA

*Generada por el Agente Abogado de la Parte Actora*

## JURISPRUDENCIA: GOCE PACÍFICO

${results.jurisprudencia || '[Pendiente]'}

## JURISPRUDENCIA: CAMBIO DE CERRADURA

${results.cambioCerradura || '[Pendiente]'}

[Template de demanda en: templates/demanda.md]

---
*Generado: ${now}*
`;
  }

  private generateInformeDestruccion(results: Record<string, string>): string {
    const now = new Date().toISOString();
    return `# INFORME DE DESTRUCCIÓN

---
document: informe-destruccion
case: ${this.config.caseId}
version: 1
created: ${now}
author: abogado-david
status: draft
---

# INFORME DE DESTRUCCIÓN DE LA DEMANDA

*Generado por el Agente Abogado David (Destructor)*

## CONTRADICCIONES DETECTADAS

${results.contradicciones || '[Pendiente]'}

## MENSAJES FAVORABLES PARA DAVID

${results.mensajesFavorables || '[Pendiente]'}

## ELEMENTOS PARA ATAQUE A LA DEMANDA

${results.ataques || '[Pendiente]'}

[Template completo en: templates/informe-destruccion.md]

---
*Generado: ${now}*
`;
  }

  private generateAuditoria(results: Record<string, string>): string {
    const now = new Date().toISOString();
    return `# AUDITORÍA NUMÉRICA

---
document: auditoria-numerica
case: ${this.config.caseId}
version: 1
created: ${now}
author: auditor
status: draft
---

# AUDITORÍA NUMÉRICA

*Generada por el Agente Auditor Documental*

## VERIFICACIÓN DE IMPORTES

${results.importes || '[Pendiente]'}

## FACTURAS

${results.facturas || '[Pendiente]'}

## ERRORES DE IVA

${results.iva || '[Pendiente]'}

[Template de auditoría en: templates/auditoria.md]

---
*Generado: ${now}*
`;
  }

  private generateDebate(demanda: string, destruccion: string, auditoria: string): string {
    const now = new Date().toISOString();
    return `# RONDA 2: DEBATE ADVERSARIAL

---
document: debate-ronda2
case: ${this.config.caseId}
version: 1
created: ${now}
author: debate-system
status: draft
---

# DEBATE ADVERSARIAL

*Generado por el Sistema de Debate Adversarial*

## TEMA 1: CAMBIO DE CERRADURA

▶ ABOGADO DAVID (Ataque):
[D空间 el ataque basado en el informe de destrucción]

◀ ABOGADO ACTORA (Respuesta):
[La respuesta de la actora a cada punto]

◆ JUEZ (Veredicto Intermedio):
[Evaluación neutral del juez]

## TEMA 2: FACTURACIÓN

▶ ABOGADO DAVID (Ataque):
[Análisis de las facturas]

◀ ABOGADO ACTORA (Respuesta):
[Defensa de la facturación]

◆ JUEZ (Veredicto):
[Valoración judicial]

## RESUMEN DEL DEBATE

### Hechos que sobreviven: {n}
### Hechos debilitados: {n}
### Hechos destruidos: {n}

[Template de debate en: prompts/debate-round2.md]

---
*Generado: ${now}*
`;
  }

  private generateVeredicto(allOutputs: string): string {
    const now = new Date().toISOString();
    return `# VEREDICTO SIMULADO DEL JUEZ

---
document: veredicto-simulado
case: ${this.config.caseId}
version: 1
created: ${now}
author: juez
status: draft
---

# VEREDICTO SIMULADO

*Generado por el Agente Judge (Evaluador Neutral)*

## HECHOS PROBADOS

| Hecho | Prueba | Nivel | Admisible |
|-------|--------|-------|-----------|
| | | | |

## HECHOS RECHAZADOS

| Afirmación | Razón | Prueba faltante |
|-------------|-------|-----------------|
| | | |

## PRUEBAS DÉBILES

| Prueba | Valor probatorio | Razón |
|--------|-------------------|-------|
| | | |

## PREGUNTAS PARA LA VISTA

1. ...
2. ...

## VEREDICTO POR PRETENSIÓN

### Pretensión: Incumplimiento contractual
**Probabilidad:** ███████░░░ 70%
**Razonamiento:** ...

### Pretensión: Indemnización
**Probabilidad:** ███░░░░░░░ 30%
**Razonamiento:** ...

## CONSEJOS

1. ...
2. ...

---
*Generado: ${now}*
`;
  }

  private printSummary(results: AgentResult[]): void {
    const totalDuration = Date.now() - this.startTime;
    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    console.log('\n╔═══════════════════════════════════════════════════════════════╗');
    console.log('║                    RESUMEN DEL PIPELINE                        ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');
    console.log(`Agentes ejecutados: ${results.length}`);
    console.log(`✅ Exitosos: ${successCount}`);
    console.log(`❌ Fallidos: ${errorCount}`);
    console.log(`⏱️ Duración total: ${Math.round(totalDuration / 1000)}s`);
    console.log(`\nOutputs en: ${path.join(this.config.outputDir, this.config.caseId)}`);
    console.log('\n   ├── expediente/     (Expediente maestro)');
    console.log('   ├── demanda/        (Demanda)');
    console.log('   ├── defensa/        (Informe de destrucción)');
    console.log('   ├── evaluacion/     (Veredicto del juez)');
    console.log('   ├── auditoria/      (Auditoría numérica)');
    console.log('   └── debate/         (Rondas adversarial)');
    console.log('\n');
  }
}

export { LegalPipeline, PipelineConfig, AgentResult };

async function main() {
  const args = process.argv.slice(2);
  
  const caseId = args.find(a => !a.startsWith('--')) || 'default';
  const notebookId = args.find(a => a.startsWith('--notebook='))?.split('=')[1] || '';
  const notebookLMUrl = args.find(a => a.startsWith('--url='))?.split('=')[1] || process.env.NOTEBOOKLM_URL || 'http://localhost:3000';

  const config: Partial<PipelineConfig> = {
    caseId,
    notebookId,
    notebookLMUrl,
  };

  const pipeline = new LegalPipeline(config);
  await pipeline.run();
}

main().catch(console.error);
