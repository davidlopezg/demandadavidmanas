#!/usr/bin/env node

/**
 * Orchestrator — Sistema Multi-Agente Jurídico
 * 
 * Coordina la ejecución de los agentes y el flujo del pipeline.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { NotebookLMClient, INSTRUCTOR_QUERIES, ABOGADO_DAVID_QUERIES } from './notebooklm-client.js';

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

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('          SISTEMA MULTI-AGENTE JURÍDICO');
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log(`Caso: ${this.config.caseId}`);
    console.log(`Notebook: ${this.config.notebookId}`);
    console.log(`NotebookLM: ${this.config.notebookLMUrl}\n`);

    try {
      // Conectar a NotebookLM
      console.log('📡 Conectando a NotebookLM...');
      await this.notebookLM.connect();
      
      // Seleccionar notebook si se proporcionó
      if (this.config.notebookId) {
        await this.notebookLM.selectNotebook(this.config.notebookId);
      }

      // Crear estructura de carpetas
      await this.createCaseStructure();

      // Fase 1: Instructor
      if (this.config.agents.instructor) {
        const result = await this.runInstructor();
        results.push(result);
        if (result.status === 'error') {
          console.error(`❌ Instructor falló: ${result.error}`);
        }
      }

      // Fase 2: Agentes en paralelo
      console.log('\n⚖️ FASE 2: Ejecutando agentes en paralelo...');
      const paraleloResults = await Promise.all([
        this.config.agents.abogadoActora ? this.runAbogadoActora() : null,
        this.config.agents.abogadoDavid ? this.runAbogadoDavid() : null,
        this.config.agents.auditor ? this.runAuditor() : null,
      ]);
      
      paraleloResults.forEach((result, i) => {
        if (result) {
          results.push(result);
          if (result.status === 'error') {
            console.error(`❌ Agente ${i} falló: ${result.error}`);
          }
        }
      });

      // Fase 3: Ronda Adversarial
      console.log('\n🔥 FASE 3: Ronda adversarial...');
      const debateResult = await this.runDebateRound();
      results.push(debateResult);

      // Fase 4: Judge
      if (this.config.agents.juez) {
        console.log('\n⚖️ FASE 4: Evaluando...');
        const judgeResult = await this.runJudge();
        results.push(judgeResult);
      }

      // Generar outputs finales
      console.log('\n📄 Generando outputs finales...');
      await this.generateFinalOutputs();

    } catch (error) {
      console.error('\n❌ Error en el pipeline:', error);
    } finally {
      await this.notebookLM.disconnect();
    }

    // Resumen
    this.printSummary(results);

    return results;
  }

  private async runInstructor(): Promise<AgentResult> {
    const start = Date.now();
    console.log('\n📋 FASE 1: Instructor — Construyendo expediente...');

    try {
      // Cargar prompt del Instructor
      const promptPath = path.join(process.cwd(), 'prompts', 'instructor.md');
      const prompt = await fs.readFile(promptPath, 'utf-8');

      // Ejecutar queries del Instructor
      const queries = [
        { name: 'cronologia', query: INSTRUCTOR_QUERIES.cronologia },
        { name: 'hechosCerradura', query: INSTRUCTOR_QUERIES.hechosCerradura },
        { name: 'hechosSuministros', query: INSTRUCTOR_QUERIES.hechosSuministros },
        { name: 'comunicaciones', query: INSTRUCTOR_QUERIES.comunicaciones },
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

      // Generar expediente maestro
      const output = this.generateExpediente(results);

      // Guardar output
      const outputPath = path.join(
        this.config.outputDir,
        this.config.caseId,
        'expediente',
        'expediente-maestro.md'
      );
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, output);

      console.log(`   ✅ Instructor completado (${Date.now() - start}ms)`);

      return {
        agent: 'instructor',
        status: 'success',
        output,
        duration: Date.now() - start,
      };

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`   ❌ Instructor falló: ${errorMsg}`);
      return {
        agent: 'instructor',
        status: 'error',
        output: '',
        duration: Date.now() - start,
        error: errorMsg,
      };
    }
  }

  private async runAbogadoDavid(): Promise<AgentResult> {
    const start = Date.now();
    console.log('   ⚔️ Abogado David — Generando informe de destrucción...');

    try {
      // Queries para destruir la demanda
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
          results[q.name] = `[ERROR: ${error}]`;
        }
      }

      // Generar informe de destrucción
      const output = this.generateInformeDestruccion(results);

      const outputPath = path.join(
        this.config.outputDir,
        this.config.caseId,
        'defensa',
        'informe-destruccion.md'
      );
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, output);

      console.log(`   ✅ Abogado David completado (${Date.now() - start}ms)`);

      return {
        agent: 'abogado-david',
        status: 'success',
        output,
        duration: Date.now() - start,
      };

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      return {
        agent: 'abogado-david',
        status: 'error',
        output: '',
        duration: Date.now() - start,
        error: errorMsg,
      };
    }
  }

  private async runAbogadoActora(): Promise<AgentResult | null> {
    // Placeholder - requiere implementación completa
    console.log('   📝 Abogado Actora — [PLACEHOLDER]');
    return null;
  }

  private async runAuditor(): Promise<AgentResult | null> {
    // Placeholder - requiere implementación completa
    console.log('   🔢 Auditor — [PLACEHOLDER]');
    return null;
  }

  private async runJudge(): Promise<AgentResult | null> {
    // Placeholder - requiere implementación completa
    console.log('   ⚖️ Judge — [PLACEHOLDER]');
    return null;
  }

  private async runDebateRound(): Promise<AgentResult> {
    const start = Date.now();
    console.log('   🔥 Debate Adversarial — [PLACEHOLDER]');
    
    return {
      agent: 'debate-ronda2',
      status: 'success',
      output: '[PLACEHOLDER - Ronda adversarial pendiente de implementar]',
      duration: Date.now() - start,
    };
  }

  private async generateFinalOutputs(): Promise<void> {
    // Placeholder - generar demanda-final.md, defensa-prevista.md, etc.
    console.log('   📄 Outputs finales — [PLACEHOLDER]');
  }

  private async createCaseStructure(): Promise<void> {
    const dirs = [
      'expediente',
      'demanda',
      'defensa',
      'evaluacion',
      'auditoria',
      'debate',
      'documents/contratos',
      'documents/correspondencia',
      'documents/mensajes',
      'documents/facturas',
      'documents/pruebas',
    ];

    const basePath = path.join(this.config.outputDir, this.config.caseId);
    
    for (const dir of dirs) {
      await fs.mkdir(path.join(basePath, dir), { recursive: true });
    }

    console.log(`   📁 Estructura de carpetas creada: ${basePath}`);
  }

  private generateExpediente(queryResults: Record<string, string>): string {
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

## RESUMEN EJECUTIVO

*Generado automáticamente por el Sistema Multi-Agente Jurídico.*

---

## CRONOLOGÍA (de NotebookLM)

${queryResults.cronologia || '[Pendiente de completar]'}

---

## HECHOS RELACIONADOS CON EL CAMBIO DE CERRADURA

${queryResults.hechosCerradura || '[Pendiente de completar]'}

---

## HECHOS RELACIONADOS CON SUMINISTROS

${queryResults.hechosSuministros || '[Pendiente de completar]'}

---

## COMUNICACIONES EXTRAJUDICIALES

${queryResults.comunicaciones || '[Pendiente de completar]'}

---

*Documento generado por el Agente Instructor.*
*Fecha: ${now}*
`;
  }

  private generateInformeDestruccion(queryResults: Record<string, string>): string {
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

*Generado automáticamente por el Sistema Multi-Agente Jurídico.*

---

## CONTRADICCIONES DETECTADAS

${queryResults.contradicciones || '[Pendiente de completar]'}

---

## MENSAJES FAVORABLES PARA DAVID

${queryResults.mensajesFavorables || '[Pendiente de completar]'}

---

## ELEMENTOS PARA ATAQUE A LA DEMANDA

${queryResults.ataques || '[Pendiente de completar]'}

---

*Documento generado por el Agente Abogado David (Destructor).*
*Fecha: ${now}*
`;
  }

  private printSummary(results: AgentResult[]): void {
    const totalDuration = Date.now() - this.startTime;
    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('                    RESUMEN DEL PIPELINE');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\nAgentes ejecutados: ${results.length}`);
    console.log(`✅ Exitosos: ${successCount}`);
    console.log(`❌ Fallidos: ${errorCount}`);
    console.log(`⏱️ Duración total: ${Math.round(totalDuration / 1000)}s`);
    console.log(`\nOutputs en: ${path.join(this.config.outputDir, this.config.caseId)}`);
    console.log('═══════════════════════════════════════════════════════════════\n');
  }
}

// CLI Entry Point
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

// Exportar para uso como módulo
export { LegalPipeline, PipelineConfig, AgentResult };

// Ejecutar si es el script principal
main().catch(console.error);
