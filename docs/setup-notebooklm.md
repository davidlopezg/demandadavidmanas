# Setup NotebookLM MCP — Guía de Instalación

## Requisitos

- **Node.js 18+** (para ejecutar notebooklm-mcp)
- **Google Chrome** instalado en el desktop
- **Python 3.10+** (para notebooklm-py si se usa directamente)
- **Cuenta de Google** con acceso a NotebookLM (notebooklm.google.com)

## Arquitectura

```
┌─────────────────────┐         ┌─────────────────────┐
│     TU DESKTOP      │   HTTP   │    PI / TERMUX      │
│                     │  :3000   │                     │
│  ┌───────────────┐  │◄────────►│  ┌───────────────┐  │
│  │ Chrome/       │  │          │  │  Sistema       │  │
│  │ Playwright    │  │          │  │  Agentes       │  │
│  └───────┬───────┘  │          │  └───────┬───────┘  │
│          │          │          │          │          │
│  ┌───────▼───────┐  │          │          │          │
│  │ notebooklm-mcp│  │          │          │          │
│  │   Server      │  │          │          │          │
│  └───────────────┘  │          │          │          │
└─────────────────────┘          └─────────────────────┘
```

## Paso 1: Instalar notebooklm-mcp en Desktop

### Opción A: Usando npx (Recomendado)

```bash
# No necesita instalación global
npx notebooklm-mcp@latest setup_auth
```

### Opción B: Instalación global

```bash
npm install -g notebooklm-mcp
notebooklm-mcp setup_auth
```

## Paso 2: Autenticarse con Google (Solo primera vez)

```bash
# Esto abre Chrome para iniciar sesión
notebooklm-mcp setup_auth
```

### Qué ocurre:
1. Se abre una ventana de Chrome
2. Inicias sesión con tu cuenta de Google
3. Aceptas los permisos
4. Se cierran automáticamente los cookies

### Verificar autenticación:

```bash
notebooklm-mcp auth check
# Debería mostrar: Authenticated ✓
```

### Perfiles múltiples (opcional):

```bash
# Si usas varias cuentas de Google
notebooklm-mcp setup_auth --account trabajo
notebooklm-mcp setup_auth --account personal
```

## Paso 3: Crear un Notebook en NotebookLM

1. Ve a [https://notebooklm.google.com](https://notebooklm.google.com)
2. Crea un nuevo notebook para el caso
3. Sube los documentos relevantes:
   - Contratos
   - Emails
   - WhatsApp exports
   - Facturas
   - Cualquier documento relevante
4. Copia el **Notebook ID** de la URL:
   ```
   https://notebooklm.google.com/notebook/ABCDEF123456
   #                                         ^^^^^^^^^^
   #                                         Notebook ID
   ```

## Paso 4: Arrancar el Servidor HTTP

```bash
# Arrancar en desktop (mantener corriendo)
notebooklm-mcp --transport http --port 3000 --host 0.0.0.0
```

### Verificación:

```bash
# En otra terminal del desktop:
curl http://localhost:3000/healthz

# Debería responder:
# {"status":"ok","version":"2.0.0"}
```

### Opciones de transporte:

```bash
# STDIO (para Claude CLI local):
notebooklm-mcp

# HTTP en puerto específico:
notebooklm-mcp --transport http --port 3000

# HTTP en todas las interfaces (para acceso desde otro dispositivo):
notebooklm-mcp --transport http --port 3000 --host 0.0.0.0

# Forzar Chromium bundled (si Chrome no funciona):
BROWSER_CHANNEL=chromium notebooklm-mcp --transport http --port 3000
```

## Paso 5: Configurar Pi para conectar al Desktop

### Obtener la IP del Desktop:

```bash
# En desktop:
# Linux:    ip addr show | grep inet
# macOS:    ipconfig getifaddr en0
# Windows:  ipconfig

# Ejemplo: 192.168.1.100
```

### Variables de entorno (opcional):

```bash
# En Pi, crear ~/.notebooklm/env
export NOTEBOOKLM_URL=http://192.168.1.100:3000
export NOTEBOOKLM_NOTEBOOK_ID=tu-notebook-id-aqui
```

## Paso 6: Usar desde Pi

### Verificar conexión:

```bash
# Desde Pi:
curl http://192.168.1.100:3000/healthz
```

### Queries básicas con notebooklm-mcp:

```bash
# Listar notebooks
npx notebooklm-mcp list

# Seleccionar notebook
npx notebooklm-mcp select tu-notebook-id

# Hacer una pregunta
npx notebooklm-mcp ask "Dame todos los emails de julio 2025"
```

## Solución de Problemas

### Chrome no se abre

```bash
# Forzar Chrome específico
notebooklm-mcp setup_auth --browser=/path/to/chrome

# O usar Chromium bundled
BROWSER_CHANNEL=chromium notebooklm-mcp setup_auth
```

### Error: "Browser closed unexpectedly"

```bash
# Ejecutar con display visible (no headless)
notebooklm-mcp setup_auth --show-browser
```

### Error: "Authentication failed"

```bash
# Re-autenticar
notebooklm-mcp re-auth
```

### Timeout en queries

```bash
# Aumentar timeout (default: 60000ms)
ANSWER_TIMEOUT_MS=120000 notebooklm-mcp ask "tu pregunta"
```

### Servidor no responde desde Pi

```bash
# Verificar que el firewall permite el puerto
# En desktop:
sudo ufw allow 3000/tcp  # Linux

# Verificar que está escuchando en todas las interfaces
notebooklm-mcp --transport http --port 3000 --host 0.0.0.0
```

### Sesión expirada

```bash
# Renovar autenticación
notebooklm-mcp re-auth
```

## Comandos Rápidos de Referencia

```bash
# Autenticación
notebooklm-mcp setup_auth          # Primera vez
notebooklm-mcp auth check          # Verificar
notebooklm-mcp re-auth             # Renovar

# Servidor
notebooklm-mcp --transport http --port 3000  # Arrancar

# Notebooks
notebooklm-mcp list                # Listar
notebooklm-mcp select <id>         # Seleccionar

# Queries
notebooklm-mcp ask "tu pregunta"   # Hacer pregunta

# Limpieza
notebooklm-mcp cleanup             # Borrar datos
```

## Estructura de Archivos

```
~/.notebooklm/
├── chrome_profile/          # Cookies de autenticación
├── accounts/               # Perfiles múltiples
│   ├── default/
│   ├── trabajo/
│   └── personal/
├── library.json           # Lista de notebooks
└── settings.json          # Configuración
```

## Seguridad

- Las cookies de Google se almacenan localmente
- No se comparten credenciales con terceros
- El servidor HTTP es solo para acceso local/red doméstica
- **No exponer el puerto 3000 a Internet**

## Alternativa: Ejecutar todo en Desktop

Si prefieres no usar MCP, puedes ejecutar el pipeline completo en desktop:

```bash
# En desktop:
cd sistema-agentes-juridicos
npm install
npm run pipeline -- --case-id FOODAY-vs-MANAS --notebook-id tu-id
```

## Soporte

- Issues del proyecto: [github.com/PleasePrompto/notebooklm-mcp](https://github.com/PleasePrompto/notebooklm-mcp)
- Documentación: [github.com/mulyg/notebooklm-mcp](https://github.com/mulyg/notebooklm-mcp)
