# NotebookLM MCP Server Setup (Windows)

## Prerrequisitos

1. **Node.js 18+** — [Descargar](https://nodejs.org/)
2. **Google Chrome** (canal estable)
3. **Cuenta de Google** con acceso al cuaderno NotebookLM

## Instalación del MCP Server

### Opción 1: Claude Code / Codex

```bash
# Claude Code
claude mcp add notebooklm npx notebooklm-mcp@latest

# Codex CLI
codex mcp add notebooklm -- npx notebooklm-mcp@latest
```

### Opción 2: Cursor

Editar `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "notebooklm": {
      "command": "npx",
      "args": ["-y", "notebooklm-mcp@latest"]
    }
  }
}
```

### Opción 3: Generic MCP (stdio)

```bash
npx notebooklm-mcp@latest
```

## Autenticación

### Primera vez — setup_auth

```bash
npx notebooklm-mcp@latest setup_auth
```

Se abrirá Chrome. Iniciá sesión con tu cuenta de Google y otorgá permisos.

### Verificar conexión

```bash
npx notebooklm-mcp@latest status
```

## Añadir el Cuaderno a la Biblioteca

```bash
npx notebooklm-mcp@latest add_notebook "https://notebooklm.google.com/notebook/4510cc3a-c1c4-4140-a8ec-f80f184618ef"
```

## Modo HTTP (para agentes remotos)

Si querés que Pi (desde Termux) se conecte a tu Windows:

```bash
npx notebooklm-mcp@latest --transport http --port 3000 --host 0.0.0.0
```

> ⚠️ **Seguridad**: Esto expone el servidor en la red. Usá solo en red privada o con firewall.

## Tools Disponibles

| Tool | Descripción |
|------|-------------|
| `ask_question` | Preguntar sobre el cuaderno |
| `list_notebooks` | Listar cuadernos |
| `select_notebook` | Seleccionar cuaderno activo |
| `add_notebook` | Añadir cuaderno por URL |
| `generate_audio` | Generar audio overview |
| `download_audio` | Descargar audio generado |

## Ejemplo de Uso

```bash
# Seleccionar cuaderno
npx notebooklm-mcp@latest select_notebook "nombre-del-cuaderno"

# Hacer pregunta
npx notebooklm-mcp@latest ask_question "¿Cuáles son los puntos clave del caso?"
```

## Solución de Problemas

### Chrome no inicia
```bash
# Forzar Chrome bundled
npx notebooklm-mcp@latest --browser_channel=chromium
```

### Auth expirado
```bash
npx notebooklm-mcp@latest re_auth
```

### Ver docs completas
- [README original](https://github.com/PleasePrompto/notebooklm-mcp)
- [Configuration](https://github.com/PleasePrompto/notebooklm-mcp/blob/main/docs/configuration.md)
- [Tools](https://github.com/PleasePrompto/notebooklm-mcp/blob/main/docs/tools.md)
- [Troubleshooting](https://github.com/PleasePrompto/notebooklm-mcp/blob/main/docs/troubleshooting.md)
