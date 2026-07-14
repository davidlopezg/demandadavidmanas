/**
 * NotebookLM Client for Sistema Agentes Jurídicos
 * 
 * Client para interactuar con el servidor NotebookLM MCP
 * vía HTTP. Permite hacer queries contra notebooks y
 * formatear respuestas con citations.
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/transport/streams.js';

interface Source {
  index: number;
  title: string;
  excerpt: string;
  url?: string;
}

interface QueryResult {
  answer: string;
  sources: Source[];
  _provenance?: {
    provider: string;
    model: string;
    via: string;
    grounding: string;
    ai_generated: boolean;
  };
}

interface Notebook {
  id: string;
  name: string;
  description?: string;
  created?: string;
  updated?: string;
}

interface NotebookLMConfig {
  url: string;           // URL del servidor HTTP
  notebookId?: string;    // Notebook activo
  timeout?: number;      // Timeout en ms
  retries?: number;      // Número de reintentos
}

const DEFAULT_TIMEOUT = 60000;
const DEFAULT_RETRIES = 3;

/**
 * Formatea una respuesta de NotebookLM con citations estandarizadas
 */
function formatCitation(claim: string, result: QueryResult): string {
  let output = `## Afirmación\n\n${claim}\n\n`;
  output += `## Respuesta de NotebookLM\n\n${result.answer}\n\n`;
  
  if (result.sources && result.sources.length > 0) {
    output += `## Fuentes\n\n`;
    result.sources.forEach((source, i) => {
      output += `[${i + 1}] **${source.title}**\n`;
      output += `   Excerpto: "${source.excerpt}"\n`;
      if (source.url) {
        output += `   URL: ${source.url}\n`;
      }
      output += `\n`;
    });
  }
  
  if (result._provenance) {
    output += `---\n`;
    output += `*Generado vía ${result._provenance.provider} (${result._provenance.model})*\n`;
  }
  
  return output;
}

/**
 * Formatea un citation para el formato del sistema jurídico
 */
function formatLegalCitation(source: Source): string {
  return `  [${source.index}] ${source.title}\n      Excerpto: "${source.excerpt}"${source.url ? `\n      URL: ${source.url}` : ''}`;
}

export class NotebookLMClient {
  private client: Client | null = null;
  private config: Required<NotebookLMConfig>;
  private connected: boolean = false;

  constructor(config: NotebookLMConfig) {
    this.config = {
      url: config.url,
      notebookId: config.notebookId || '',
      timeout: config.timeout || DEFAULT_TIMEOUT,
      retries: config.retries || DEFAULT_RETRIES,
    };
  }

  /**
   * Conecta al servidor NotebookLM MCP
   */
  async connect(): Promise<void> {
    if (this.connected) return;

    try {
      const transport = new StreamableHTTPClientTransport(
        new URL(this.config.url)
      );
      
      this.client = new Client({
        name: 'sistema-agentes-juridicos',
        version: '1.0.0',
      }, {
        capabilities: {
          tools: true,
          resources: true,
        },
      });

      await this.client.connect(transport);
      this.connected = true;
      console.log('✓ Conectado a NotebookLM MCP');
    } catch (error) {
      this.connected = false;
      throw new Error(`Error conectando a NotebookLM: ${error}`);
    }
  }

  /**
   * Desconecta del servidor
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.connected = false;
    }
  }

  /**
   * Verifica si está conectado
   */
  isConnected(): boolean {
    return this.connected;
  }

  /**
   * Lista todos los notebooks disponibles
   */
  async listNotebooks(): Promise<Notebook[]> {
    this.ensureConnected();

    try {
      const result = await this.client!.callTool({
        name: 'notebooklm_list_notebooks',
        arguments: {},
      });

      // Parsear resultado según formato de notebooklm-mcp
      const text = typeof result === 'string' ? result : JSON.stringify(result);
      
      // Intentar parsear como JSON
      try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          return parsed;
        }
        if (parsed.notebooks && Array.isArray(parsed.notebooks)) {
          return parsed.notebooks;
        }
      } catch {
        // No es JSON, devolver como texto
        console.log('Notebooks (raw):', text);
      }

      return [];
    } catch (error) {
      console.error('Error listando notebooks:', error);
      return [];
    }
  }

  /**
   * Selecciona un notebook activo
   */
  async selectNotebook(notebookId: string): Promise<void> {
    this.ensureConnected();

    try {
      await this.client!.callTool({
        name: 'notebooklm_select_notebook',
        arguments: { notebook_id: notebookId },
      });
      this.config.notebookId = notebookId;
      console.log(`✓ Notebook seleccionado: ${notebookId}`);
    } catch (error) {
      throw new Error(`Error seleccionando notebook: ${error}`);
    }
  }

  /**
   * Hace una pregunta al notebook activo
   */
  async ask(question: string, sourceFormat: 'inline' | 'footnotes' | 'json' | 'none' = 'footnotes'): Promise<QueryResult> {
    this.ensureConnected();

    if (!this.config.notebookId) {
      throw new Error('No hay notebook seleccionado. Usa selectNotebook() primero.');
    }

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        const result = await this.client!.callTool({
          name: 'notebooklm_ask',
          arguments: {
            question,
            notebook_id: this.config.notebookId,
            source_format: sourceFormat,
          },
        });

        // Parsear resultado
        const text = typeof result === 'string' ? result : JSON.stringify(result);
        return this.parseQueryResult(text);
      } catch (error) {
        lastError = error as Error;
        console.warn(`Intento ${attempt}/${this.config.retries} falló:`, error);
        
        if (attempt < this.config.retries) {
          await this.sleep(1000 * attempt); // Backoff exponencial
        }
      }
    }

    throw new Error(`Error en query después de ${this.config.retries} intentos: ${lastError}`);
  }

  /**
   * Obtiene el texto completo de una fuente
   */
  async getSourceFulltext(sourceId: string): Promise<string> {
    this.ensureConnected();

    try {
      const result = await this.client!.callTool({
        name: 'notebooklm_get_source_fulltext',
        arguments: { source_id: sourceId },
      });

      return typeof result === 'string' ? result : JSON.stringify(result);
    } catch (error) {
      console.error('Error obteniendo fulltext:', error);
      return '';
    }
  }

  /**
   * Añade una fuente al notebook
   */
  async addSource(url: string): Promise<void> {
    this.ensureConnected();

    try {
      await this.client!.callTool({
        name: 'notebooklm_add_url_source',
        arguments: {
          notebook_id: this.config.notebookId,
          url,
        },
      });
      console.log(`✓ Fuente añadida: ${url}`);
    } catch (error) {
      throw new Error(`Error añadiendo fuente: ${error}`);
    }
  }

  /**
   * Hace una pregunta y formatea la respuesta con citations
   */
  async askWithCitation(question: string, claim: string): Promise<string> {
    const result = await this.ask(question, 'footnotes');
    return formatCitation(claim, result);
  }

  /**
   * Ejecuta una query predefinida del Instructor
   */
  async queryInstructor(queryType: 'cronologia' | 'hechos' | 'documentos', topic?: string): Promise<QueryResult> {
    const queries = {
      cronologia: 'Extrae todos los eventos relevantes ordenados por fecha. Para cada evento indica: 1) Fecha exacta o aproximada, 2) Qué ocurrió, 3) Qué documento lo prueba.',
      hechos: `Busca todos los documentos relacionados con ${topic || 'el conflicto'}. Dame los excerpts relevantes de cada documento con fecha y origen.`,
      documentos: 'Dame un índice de todos los documentos del caso con su tipo, fecha y contenido resumido.',
    };

    return this.ask(queries[queryType]);
  }

  /**
   * Ejecuta una query predefinida del Abogado David
   */
  async queryDavid(queryType: 'contradicciones' | 'mensajes_favorables' | 'ataques', topic?: string): Promise<QueryResult> {
    const queries = {
      contradicciones: `Busca mensajes o emails donde haya versiones contradictorias entre las partes sobre ${topic || 'el conflicto'}.`,
      mensajes_favorables: `Busca mensajes, emails o documentos donde la parte contraria ${topic || 'admite retrasos o indica flexibilidad'}.`,
      ataques: `Busca documentos que puedan utilizarse para atacar la demanda de la parte actora sobre ${topic || 'el caso'}.`,
    };

    return this.ask(queries[queryType]);
  }

  /**
   * Ejecuta una query predefinida del Auditor
   */
  async queryAuditor(queryType: 'importes' | 'facturas', topic?: string): Promise<QueryResult> {
    const queries = {
      importes: `Dame todas las facturas con importes y fechas. Verifica si el IVA está bien calculado.`,
      facturas: `Busca ${topic || 'facturas de suministros'} y resume: concepto, importe, fecha, y si hay anomalías.`,
    };

    return this.ask(queries[queryType]);
  }

  private ensureConnected(): void {
    if (!this.connected || !this.client) {
      throw new Error('No conectado a NotebookLM. Usa connect() primero.');
    }
  }

  private parseQueryResult(text: string): QueryResult {
    try {
      // Intentar parsear como JSON estructurado
      const parsed = JSON.parse(text);
      
      if (parsed.answer && parsed.sources) {
        return {
          answer: parsed.answer,
          sources: parsed.sources || [],
          _provenance: parsed._provenance,
        };
      }

      // Si no tiene estructura esperada, envolver el texto
      return {
        answer: text,
        sources: [],
      };
    } catch {
      // No es JSON, devolver como texto
      return {
        answer: text,
        sources: [],
      };
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Queries predefinidas por agente
export const INSTRUCTOR_QUERIES = {
  cronologia: 'Extrae todos los eventos relevantes ordenados por fecha. Para cada evento indica: 1) Fecha exacta o aproximada, 2) Qué ocurrió, 3) Qué documento lo prueba.',
  
  hechosCerradura: 'Busca todos los documentos relacionados con el cambio de cerradura. Dame los excerpts relevantes de cada documento con fecha y origen.',
  
  hechosSuministros: 'Busca todos los documentos relacionados con la facturación de suministros. Dame los excerpts relevantes.',
  
  comunicaciones: 'Resume las comunicaciones extrajudiciales entre las partes: emails, burofax, cartas. Incluye fechas y contenido relevante.',
  
  mensajesNoPrisa: 'Busca mensajes donde se mencione "no tenía prisa" o expresiones similares sobre la recogida de llaves.',
  
  mensajesPagos: 'Busca mensajes relacionados con el pago de rentas o suministros. Dame fechas y contenido relevante.',
};

export const ABOGADO_DAVID_QUERIES = {
  contradicciones: 'Busca mensajes o emails donde haya versiones contradictorias entre las partes sobre el conflicto.',
  
  mensajesFavorablesDavid: 'Busca mensajes donde la parte actora admita retrasos, indique flexibilidad, o muestre desconocimiento del cambio de cerradura.',
  
  autoIncriminaciones: 'Busca emails o mensajes donde David reconozca haber actuado de forma inadecuada o admita hechos.',
  
  ataquesDemanda: 'Busca documentos que puedan utilizarse para atacar los argumentos de la demanda.',
};

export const AUDITOR_QUERIES = {
  verificacionImportes: 'Dame todas las facturas con importes y fechas. Verifica si el IVA está bien calculado.',
  
  facturasFaltantes: 'Hay algún período sin facturación? Dame un resumen de todas las facturas emitidas por mes.',
  
  erroresIVA: 'Detecta posibles errores en el cálculo del IVA de las facturas.',
  
  correspondenciaPagos: 'Compara los importes facturados con los pagos realizados según los extractos bancarios.',
};

export const ABOGADO_ACTORA_QUERIES = {
  jurisprudenciaGocePacifico: 'Busca jurisprudencia española sobre la obligación de goce pacífico en arrendamientos.',
  
  jurisprudenciaCambioCerradura: 'Busca casos similares de cambio unilateral de cerradura en arrendamientos.',
  
  jurisprudenciaIncumplimiento: 'Busca jurisprudencia sobre incumplimiento contractual y sus consecuencias.',
};

export default NotebookLMClient;
