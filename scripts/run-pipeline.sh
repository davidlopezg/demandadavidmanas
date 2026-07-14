#!/bin/bash
#===============================================================================
# run-pipeline.sh — Launcher para el Sistema Multi-Agente Jurídico
#
# Uso:
#   ./run-pipeline.sh <case-id> [--notebook=<id>] [--url=<url>]
#
# Ejemplos:
#   ./run-pipeline.sh FOODAY-vs-MANAS --notebook=abc123 --url=http://192.168.1.100:3000
#   ./run-pipeline.sh Caso-Nuevo
#===============================================================================

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones de logging
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[OK]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Mostrar ayuda
show_help() {
    cat << EOF
SISTEMA MULTI-AGENTE JURÍDICO — Pipeline Launcher

Uso:
    ./run-pipeline.sh <case-id> [opciones]

Argumentos:
    case-id              Identificador del caso (ej: FOODAY-vs-MANAS)

Opciones:
    --notebook=<id>     Notebook ID de NotebookLM
    --url=<url>         URL del servidor NotebookLM (default: http://localhost:3000)
    --skip-notebooklm   Ejecutar sin NotebookLM (solo prompts)
    --agents=<lista>     Agentes a ejecutar (default: todos)
    --help, -h          Mostrar esta ayuda

Ejemplos:
    ./run-pipeline.sh FOODAY-vs-MANAS --notebook=abc123 --url=http://192.168.1.100:3000
    ./run-pipeline.sh Caso-Nuevo
    ./run-pipeline.sh Caso-SinNotebook --skip-notebooklm

Variables de entorno:
    NOTEBOOKLM_URL       URL del servidor NotebookLM
    NOTEBOOKLM_NOTEBOOK_ID  Notebook ID por defecto

EOF
}

# Parsear argumentos
CASE_ID=""
NOTEBOOK_ID="${NOTEBOOKLM_NOTEBOOK_ID:-}"
NOTEBOOKLM_URL="${NOTEBOOKLM_URL:-http://localhost:3000}"
SKIP_NOTEBOOKLM=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --notebook=*)
            NOTEBOOK_ID="${1#*=}"
            shift
            ;;
        --url=*)
            NOTEBOOKLM_URL="${1#*=}"
            shift
            ;;
        --skip-notebooklm)
            SKIP_NOTEBOOKLM=true
            shift
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        -*)
            log_error "Opción desconocida: $1"
            show_help
            exit 1
            ;;
        *)
            if [ -z "$CASE_ID" ]; then
                CASE_ID="$1"
            else
                log_error "Argumento desconocido: $1"
                exit 1
            fi
            shift
            ;;
    esac
done

# Validar argumentos obligatorios
if [ -z "$CASE_ID" ]; then
    log_error "Se requiere case-id"
    echo ""
    show_help
    exit 1
fi

# Banner
echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║          SISTEMA MULTI-AGENTE JURÍDICO                       ║"
echo "║          Pipeline Launcher                                    ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Mostrar configuración
log_info "Configuración:"
echo "    Caso:           $CASE_ID"
echo "    Notebook ID:    ${NOTEBOOK_ID:-[no seleccionado]}"
echo "    NotebookLM URL: $NOTEBOOKLM_URL"
echo "    Skip NotebookLM: $SKIP_NOTEBOOKLM"
echo ""

# Verificar que Node.js está disponible
if ! command -v node &> /dev/null; then
    log_error "Node.js no está instalado o no está en PATH"
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    log_error "Se requiere Node.js 18+. Versión actual: $(node --version)"
    exit 1
fi

# Crear estructura de carpetas si no existe
CASE_DIR="cases/$CASE_ID"
mkdir -p "$CASE_DIR"/{expediente,demanda,defensa,evaluacion,auditoria,debate}
mkdir -p "$CASE_DIR/documents"/{contratos,correspondencia,mensajes,facturas,pruebas}

log_success "Estructura de carpetas creada: $CASE_DIR"

# Verificar conexión a NotebookLM si no se salta
if [ "$SKIP_NOTEBOOKLM" = false ]; then
    log_info "Verificando conexión a NotebookLM..."
    
    if curl -s --max-time 5 "$NOTEBOOKLM_URL/healthz" > /dev/null 2>&1; then
        log_success "NotebookLM accesible en $NOTEBOOKLM_URL"
    else
        log_warn "No se puede conectar a NotebookLM en $NOTEBOOKLM_URL"
        log_warn "Asegúrate de que el servidor esté corriendo:"
        echo "    notebooklm-mcp --transport http --port 3000 --host 0.0.0.0"
        echo ""
        read -p "¿Continuar de todos modos? (s/n) " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Ss]$ ]]; then
            exit 0
        fi
    fi
fi

# Construir comando
CMD="node scripts/orchestrator.js --case-id=$CASE_ID"

if [ -n "$NOTEBOOK_ID" ]; then
    CMD="$CMD --notebook-id=$NOTEBOOK_ID"
fi

if [ -n "$NOTEBOOKLM_URL" ]; then
    CMD="$CMD --notebook-lm-url=$NOTEBOOKLM_URL"
fi

# Ejecutar pipeline
echo ""
log_info "Ejecutando pipeline..."
echo ""

export NOTEBOOKLM_URL
export NOTEBOOKLM_NOTEBOOK_ID

eval $CMD

# Resultado
if [ $? -eq 0 ]; then
    echo ""
    log_success "Pipeline completado exitosamente"
    echo ""
    log_info "Outputs disponibles en: $CASE_DIR/"
    echo "    ├── expediente/     (Expediente maestro)"
    echo "    ├── demanda/        (Demanda)"
    echo "    ├── defensa/        (Informe de destrucción)"
    echo "    ├── evaluacion/     (Veredicto del juez)"
    echo "    ├── auditoria/      (Auditoría numérica)"
    echo "    └── debate/         (Rondas adversarial)"
    echo ""
else
    echo ""
    log_error "Pipeline falló"
    exit 1
fi
