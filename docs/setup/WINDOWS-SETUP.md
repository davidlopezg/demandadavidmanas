# Setup Windows: Warp + Pi + NotebookLM MCP

## Prerrequisitos

1. **Git for Windows** — https://git-scm.com/download/win
2. **Node.js 20+** — https://nodejs.org/
3. **Warp** — https://warp.dev/

## Instalación de Pi

```bash
# Opción 1: Script oficial
curl -fsSL https://pi.dev/install.sh | sh

# Opción 2: npm global
npm install -g @earendil-works/pi-coding-agent
```

## Instalar extensión pi-warp (integración Warp)

```bash
pi install npm:@capyup/pi-warp
```

## Instalar extensión pi-mcp-extension

```bash
pi install npm:pi-mcp-extension
```

## Instalar NotebookLM MCP Server

```bash
npm install -g notebooklm-mcp
```

## Autenticación NotebookLM

```bash
# Primera vez: abre Chrome para login
npx notebooklm-mcp@latest setup_auth
```

## Configuración de MCP

Crear archivo `~/.pi/agent/mcp.json`:

```json
{
  "settings": {
    "toolPrefix": "nl",
    "requestTimeoutMs": 60000
  },
  "mcpServers": {
    "notebooklm": {
      "command": "npx",
      "args": ["-y", "notebooklm-mcp@latest"],
      "transport": "stdio",
      "lifecycle": "eager"
    }
  }
}
```

## Añadir el cuaderno NotebookLM

Una vez en Pi:

```
/mcp:start notebooklm
```

Luego:
```
nl_notebooklm_add_notebook url="https://notebooklm.google.com/notebook/4510cc3a-c1c4-4140-a8ec-f80f184618ef"
```

## Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `/mcp` | Ver estado de servers MCP |
| `/mcp notebooklm` | Ver detalle del server NotebookLM |
| `/mcp:start notebooklm` | Iniciar server NotebookLM |
| `/mcp:stop notebooklm` | Detener server |

## Verificar conexión

En Pi:
```
nl_notebooklm_list_notebooks
```

Debería mostrar tu cuaderno.

## Solución de problemas

### "Command not found: pi"
Reiniciar la terminal o ejecutar `source ~/.bashrc`

### Chrome no inicia en setup_auth
```bash
npx notebooklm-mcp@latest setup_auth --browser_channel=chromium
```

### Auth expirado
```bash
npx notebooklm-mcp@latest re_auth
```
