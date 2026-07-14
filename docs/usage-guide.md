# Guía de Uso — Sistema Multi-Agente Jurídico

## Índice

1. [Quick Start](#quick-start)
2. [Configuración de NotebookLM](#configuración-de-notebooklm)
3. [Ejecutar el Pipeline](#ejecutar-el-pipeline)
4. [Interpretar los Outputs](#interpretar-los-outputs)
5. [Personalizar Agentes](#personalizar-agentes)
6. [Solución de Problemas](#solución-de-problemas)

---

## Quick Start

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar NotebookLM (en desktop)

```bash
# En tu desktop con Chrome:
npm install -g notebooklm-mcp
notebooklm-mcp setup_auth
notebooklm-mcp --transport http --port 3000 --host 0.0.0.0
```

### 3. Obtener IP del desktop

```bash
# Linux: ip addr show | grep inet
# macOS: ipconfig getifaddr en0
# Windows: ipconfig

# Ejemplo: 192.168.1.100
```

### 4. Ejecutar pipeline

```bash
export NOTEBOOKLM_URL=http://192.168.1.100:3000
export NOTEBOOKLM_NOTEBOOK_ID=tu-notebook-id

./scripts/run-pipeline.sh Mi-Caso --notebook=tu-notebook-id
```

---

## Configuración de NotebookLM

### Crear un Notebook

1. Ve a https://notebooklm.google.com
2. Crea nuevo notebook
3. Sube tus documentos:
   - Contratos (PDF)
   - Emails (exportados como .eml o .txt)
   - WhatsApp (exportar chat como .txt)
   - Facturas (PDF o fotos)
   - Cualquier documento relevante
4. Copia el **Notebook ID** de la URL

### Estructura recomendada de documentos

```
Carpeta del caso/
├── contratos/
│   ├── contrato-subarrendamiento.pdf
│   └── anexo-1.pdf
├── correspondencia/
│   ├── email-2025-01-15.eml
│   ├── email-2025-02-20.eml
│   └── burofax-2025-03-10.pdf
├── mensajes/
│   ├── whatsapp-david-2025-03.txt
│   └── whatsapp-david-2025-04.txt
├── facturas/
│   ├── factura-2025-01.pdf
│   ├── factura-2025-02.pdf
│   └── factura-2025-03.pdf
└── pruebas/
    ├── foto-local.jpg
    └── screenshot-email.png
```

### Subir documentos a NotebookLM

Hay dos opciones:

**Opción A: Manual (recomendado para empezar)**
1. Descarga los documentos a tu computadora
2. Ve a NotebookLM y súbelo manualmente
3. Copia el Notebook ID

**Opción B: Automático (avanzado)**
```bash
# Usando la API de NotebookLM
notebooklm-mcp add-source --notebook=tu-id --file=documento.pdf
```

---

## Ejecutar el Pipeline

### Pipeline completo (5 fases)

```bash
./scripts/run-pipeline.sh FOODAY-vs-MANAS \
  --notebook=abc123def456 \
  --url=http://192.168.1.100:3000
```

### Ejecutar solo ciertos agentes

```bash
# Solo Instructor
./scripts/run-pipeline.sh Mi-Caso --agents=instructor

# Instructor + Abogado David
./scripts/run-pipeline.sh Mi-Caso --agents=instructor,abogado-david
```

### Ver opciones disponibles

```bash
./scripts/run-pipeline.sh --help
```

### Sin NotebookLM

Si no tienes acceso a NotebookLM, el sistema puede funcionar con prompts 
genericos, pero pierde la capacidad de buscar en documentos:

```bash
./scripts/run-pipeline.sh Mi-Caso --skip-notebooklm
```

---

## Interpretar los Outputs

### Estructura de outputs

```
cases/Mi-Caso/
├── expediente/
│   └── expediente-maestro.md      # Resumen completo del caso
├── demanda/
│   ├── demanda-v1.md              # Primera versión de la demanda
│   └── demanda-final.md           # Versión post-debate
├── defensa/
│   └── informe-destruccion.md    # Análisis de puntos débiles
├── evaluacion/
│   ├── veredicto-simulado.md     # Probabilidades de éxito
│   └── preguntas-vista.md         # Preguntas para el juicio
├── auditoria/
│   └── auditoria-numerica.md      # Verificación de números
└── debate/
    └── ronda2.md                 # Registro del debate
```

### Cómo leer cada documento

#### Expediente Maestro

Contiene:
- Resumen ejecutivo (3 páginas)
- Partes
- Contrato
- Cronología
- Hechos clasificados por nivel (A/B/C/D)
- Lagunas detectadas
- Matriz de pruebas

**Niveles de prueba:**
- 🟢 **A**: Probado (documento firmado/reconocimiento)
- 🟡 **B**: Probable (documento sin contradicción)
- 🟠 **C**: Débil (testimonial/recuerdo)
- 🔴 **D**: No usable (interpretación)

#### Demanda

Estructura legal completa:
- Antecedentes de hecho
- Fundamentos de derecho
- Pretensiones
- Pruebas

#### Informe de Destrucción

Análisis ataque por ataque de la demanda. Cada ataque incluye:
- Contradicciones
- Silencios sospechosos
- Lagunas en el relato
- Impacto (1-10)

#### Veredicto del Judge

Perspectiva neutral:
- Hechos que un juez admitiría
- Hechos que rechazaría
- Probabilidades por pretensión
- Preguntas para la vista

#### Auditoría Numérica

Verificación pura de números:
- Tabla de rentas
- Verificación de facturas
- Cruce factura ↔ pago
- Saldo provisional

---

## Personalizar Agentes

### Modificar un prompt

Los prompts están en `/prompts/`:

```bash
# Editar prompt del Instructor
vim prompts/instructor.md

# Los cambios se aplican en el siguiente pipeline
```

### Añadir nuevos agentes

1. Crear prompt en `/prompts/nuevo-agente.md`
2. Añadir lógica en `/scripts/orchestrator.ts`
3. Actualizar templates en `/templates/`

### Ajustar queries de NotebookLM

Editar `/scripts/notebooklm-client.ts`:

```typescript
export const INSTRUCTOR_QUERIES = {
  // Modificar queries existentes
  cronologia: 'Nueva query...',
  
  // Añadir nuevas queries
  misDocumentos: 'Buscar documentos específicos...',
};
```

---

## Solución de Problemas

### "Cannot connect to NotebookLM"

1. Verificar que el servidor está corriendo en desktop:
   ```bash
   curl http://localhost:3000/healthz
   ```

2. Verificar IP del desktop:
   ```bash
   # En desktop, obtener IP
   ip addr show | grep inet
   ```

3. Verificar firewall:
   ```bash
   # En desktop, permitir puerto 3000
   sudo ufw allow 3000/tcp
   ```

### "Authentication failed"

```bash
# Re-autenticar
notebooklm-mcp re-auth
```

### "Timeout en query"

Aumentar timeout:
```bash
export ANSWER_TIMEOUT_MS=120000
```

### "Document not found"

Verificar que el Notebook ID es correcto:
```bash
notebooklm-mcp list
```

### Errores de TypeScript

```bash
# Rebuild
npm run build

# Verificar instalación
npm install
```

---

## Mejores Prácticas

### Preparación de documentos

1. **Organiza por tipo**: Contratos, correspondencia, facturas, mensajes
2. **Nombra con fechas**: `email-2025-03-15-asunto.pdf`
3. **Incluye todo**: even lo que parece irrelevante puede ser útil
4. **Verifica idioma**: Mantén el idioma original de cada documento

### Uso del sistema

1. **Revisa el expediente primero**: Es la base de todo
2. **Lee el veredicto del Judge**: Te da expectativas realistas
3. **Atención a los marcadores**: `[SIN PRUEBA SUFICIENTE]` indica gaps
4. **Itera**: Mejora los prompts según los resultados

### Interpretación de resultados

- **Demanda**: Es un borrador, noadvice legal
- **Destrucción**: Los ataques son escenarios, no predicciones
- **Veredicto**: Probabilidades, no certezas
- **Auditoría**: Verificación de números, no opiniones

---

## Próximos Pasos

1. Prueba con un caso pequeño primero
2. Personaliza los prompts según tu estilo
3. Integra con tu flujo de trabajo existente
4. Contribuye mejoras al proyecto
