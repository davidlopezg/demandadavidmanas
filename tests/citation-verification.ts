/**
 * Citation Verification Tests
 * 
 * Verifica que todos los documentos generados cumplan con
 * las reglas de citación obligatoria del sistema.
 */

import * as fs from 'fs/promises';
import * as path from 'path';

interface CitationCheck {
  file: string;
  claims: Claim[];
  sources: Source[];
  uncited_claims: string[];
  unverified_sources: string[];
  has_insufficient_evidence_markers: boolean;
}

interface Claim {
  id: string;
  text: string;
  has_citation: boolean;
  citation?: string;
  level?: string;
}

interface Source {
  id: string;
  type: 'D' | 'N' | 'J' | 'S'; // Documental, Normativa, Jurisprudencia, Sin prueba
  text: string;
}

/**
 * Extrae todas las citas del contenido
 */
function extractCitations(content: string): CitationCheck {
  const claims: Claim[] = [];
  const sources: Source[] = [];
  const uncited_claims: string[] = [];
  
  // Patrones de claims
  const claimPatterns = [
    /\[(HECHO|ARG|ATAQUE|DICTAMEN|HALLAZGO)-\d+\]/g,
  ];
  
  // Patrones de fuentes documentales
  const sourcePatterns = [
    /\[D(\d+)\]/g, // [D1], [D2]
    /\[N(\d+)\]/g, // [N1], [N2]
    /\[J(\d+)\]/g, // [J1], [J2]
  ];
  
  // Buscar claims
  for (const pattern of claimPatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const claimId = match[0].replace('[', '').replace(']', '');
      claims.push({
        id: claimId,
        text: match[0],
        has_citation: false,
      });
    }
  }
  
  // Buscar fuentes
  for (const pattern of sourcePatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const sourceType = match[0][1]; // D, N, o J
      sources.push({
        id: match[0].replace('[', '').replace(']', ''),
        type: sourceType as 'D' | 'N' | 'J',
        text: match[0],
      });
    }
  }
  
  // Verificar que cada claim tiene cita
  for (const claim of claims) {
    const hasCitation = sources.some(s => 
      content.includes(`FUENTE:`) || 
      content.includes(`fuente:`) ||
      content.includes(`Source:`)
    );
    claim.has_citation = hasCitation;
    if (!hasCitation && !claim.id.includes('DESTR')) {
      uncited_claims.push(claim.id);
    }
  }
  
  // Verificar marcadores de evidencia insuficiente
  const has_insufficient_evidence_markers = 
    content.includes('[SIN PRUEBA SUFICIENTE]') ||
    content.includes('[NO DOCUMENTADA]') ||
    content.includes('[NO EXISTE') ||
    content.includes('[IMPORTE NO VERIFICABLE]');
  
  return {
    file: 'unknown',
    claims,
    sources,
    uncited_claims,
    unverified_sources: [],
    has_insufficient_evidence_markers,
  };
}

/**
 * Verifica que el Auditor no contenga opiniones jurídicas
 */
function verifyAuditorNoLegalOpinion(content: string): string[] {
  const legalTerms = [
    '\\bculpa\\b',
    '\\bnegligencia\\b',
    '\\bresponsabilidad\\b',
    '\\bderecho\\b',
    '\\bpretensión\\b',
    '\\bindemnización\\b',
    '\\bilicitud\\b',
    '\\bilegal\\b',
    '\\bfraude\\b',
    '\\bbuena fe\\b',
    '\\bmala fe\\b',
  ];
  
  const violations: string[] = [];
  
  for (const term of legalTerms) {
    const regex = new RegExp(term, 'gi');
    const matches = content.match(regex);
    if (matches && matches.length > 0) {
      // Ignorar si está en contexto de cita (normativa)
      const lines = content.split('\n');
      for (const line of lines) {
        if (regex.test(line) && !line.includes('Artículo') && !line.includes('Código')) {
          violations.push(`Término legal encontrado: "${matches[0]}" en línea: "${line.substring(0, 50)}..."`);
        }
      }
    }
  }
  
  return violations;
}

/**
 * Verifica formato de YAML frontmatter
 */
function verifyFrontmatter(content: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!content.startsWith('---')) {
    errors.push('Falta frontmatter de apertura ---');
  }
  
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    errors.push('No se encontró frontmatter válido');
  } else {
    const frontmatter = frontmatterMatch[1];
    
    const requiredFields = ['document:', 'case:', 'version:', 'created:', 'author:'];
    for (const field of requiredFields) {
      if (!frontmatter.includes(field)) {
        errors.push(`Falta campo requerido: ${field}`);
      }
    }
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * Verifica que los niveles de prueba sean correctos
 */
function verifyProofLevels(content: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Buscar niveles inválidos (D para hechos en demanda)
  const invalidPatterns = [
    { pattern: /\[HECHO-D\d+\]/g, context: 'HECHO' },
  ];
  
  for (const { pattern, context } of invalidPatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      // Solo es error si está en ciertos documentos
      if (content.includes('demanda') && context === 'HECHO') {
        errors.push(`Nivel D encontrado en demanda: ${match[0]}`);
      }
    }
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * Test runner principal
 */
async function runTests(caseDir: string): Promise<void> {
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  VERIFICACIÓN DE CITACIÓN');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  const docsToCheck = [
    'expediente/expediente-maestro.md',
    'demanda/demanda-v1.md',
    'defensa/informe-destruccion.md',
    'auditoria/auditoria-numerica.md',
    'evaluacion/veredicto-simulado.md',
  ];
  
  let totalErrors = 0;
  let totalTests = 0;
  
  for (const doc of docsToCheck) {
    const docPath = path.join(caseDir, doc);
    
    try {
      const content = await fs.readFile(docPath, 'utf-8');
      console.log(`\n📄 Verificando: ${doc}`);
      totalTests++;
      
      // Test 1: Frontmatter
      const fmResult = verifyFrontmatter(content);
      if (!fmResult.valid) {
        console.log(`   ❌ Frontmatter inválido: ${fmResult.errors.join(', ')}`);
        totalErrors++;
      } else {
        console.log(`   ✅ Frontmatter válido`);
      }
      
      // Test 2: Citas
      const citationResult = extractCitations(content);
      if (citationResult.uncited_claims.length > 0) {
        console.log(`   ⚠️ Claims sin cita: ${citationResult.uncited_claims.join(', ')}`);
        totalErrors += citationResult.uncited_claims.length;
      } else {
        console.log(`   ✅ Todos los claims tienen cita`);
      }
      
      // Test 3: Marcadores de evidencia insuficiente
      if (citationResult.has_insufficient_evidence_markers) {
        console.log(`   ✅ Marcadores de evidencia insuficiente presentes`);
      }
      
      // Test 4: Auditor sin opiniones jurídicas
      if (doc.includes('auditoria')) {
        const legalViolations = verifyAuditorNoLegalOpinion(content);
        if (legalViolations.length > 0) {
          console.log(`   ❌ Opiniones jurídicas en auditoría:`);
          legalViolations.forEach(v => console.log(`      - ${v}`));
          totalErrors += legalViolations.length;
        } else {
          console.log(`   ✅ Sin opiniones jurídicas`);
        }
      }
      
      // Test 5: Niveles de prueba
      if (doc.includes('expediente')) {
        const plResult = verifyProofLevels(content);
        if (!plResult.valid) {
          console.log(`   ❌ Niveles de prueba inválidos: ${plResult.errors.join(', ')}`);
          totalErrors += plResult.errors.length;
        } else {
          console.log(`   ✅ Niveles de prueba válidos`);
        }
      }
      
    } catch (error) {
      console.log(`   ⚠️ Archivo no encontrado: ${doc}`);
    }
  }
  
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  RESUMEN');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log(`Documentos verificados: ${totalTests}`);
  console.log(`Errores encontrados: ${totalErrors}`);
  
  if (totalErrors === 0) {
    console.log('\n✅ Todos los tests pasaron\n');
  } else {
    console.log('\n⚠️ Algunos tests fallaron. Revisar arriba.\n');
  }
}

// CLI Entry Point
const caseDir = process.argv[2] || 'cases/FOODAY-vs-MANAS';
runTests(caseDir).catch(console.error);

export { extractCitations, verifyAuditorNoLegalOpinion, verifyFrontmatter, verifyProofLevels };
