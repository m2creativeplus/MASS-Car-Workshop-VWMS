---
name: M2 Agent Skills
version: 1.0.0
---

# M2 BRAND TRANSFORMATION AGENT SKILLS

## MCP SERVERS AVAILABLE

### GitHub MCP Server
**Status:** ✅ Connected (Token: `antigravity-workspace`)

| Capability | Tool | Access |
|------------|------|--------|
| Read Repos | `get_file_contents` | ✅ Full |
| Write Files | `create_or_update_file` | ✅ Full |
| Create PRs | `create_pull_request` | ✅ Full |
| Manage Issues | `issue_write` | ✅ Full |
| Search Code | `search_code` | ✅ Full |
| Push Files | `push_files` | ✅ Full |

**Accounts Access:**
- `mahmoudawaleh` (personal): Full access
- `m2creativeplus` (org): Owner access

---

## CORE TOOL CAPABILITIES

### 🌐 Web Intelligence
```yaml
tools:
  - read_url_content: Fetch any public URL
  - search_web: Search engine queries
  - browser_subagent: Full browser automation
```

### 📁 File Operations
```yaml
tools:
  - view_file: Read local files
  - write_to_file: Create new files
  - replace_file_content: Edit existing files
  - find_by_name: Search files by pattern
  - grep_search: Search content in files
```

### 🎨 Creative Assets
```yaml
tools:
  - generate_image: Create images from prompts
    constraints:
      - No device frames unless requested
      - Professional/premium aesthetic
      - Brand-consistent colors
```

### 💻 Terminal Operations
```yaml
tools:
  - run_command: Execute shell commands
  - command_status: Monitor background processes
  - send_command_input: Interactive terminal
```

---

## FILE PERMISSIONS

### Writable Locations
- `/Users/m2creative/.gemini/antigravity/brain/` (artifacts)
- `/Users/m2creative/Documents/MASS-Car-Workshop-VWMS/` (workspace)
- `/Users/m2creative/Documents/` (all projects)

### Read-Only Locations
- System files
- Node modules

---

## AGENT DELEGATION PATTERNS

### Pattern 1: Crawler → Architect
```
1. Crawler fetches competitor data
2. Outputs brand_tokens.json
3. Architect ingests and designs system
4. Outputs BRAND_SYSTEM.md
```

### Pattern 2: Architect → Brand Agent
```
1. Architect defines specifications
2. Brand Agent generates assets
3. Assets pushed to GitHub/platforms
```

### Pattern 3: Full Pipeline
```
Crawler → Architect → Brand Agent → Mailer → Growth
```

---

## OPERATIONAL BOUNDARIES

### ALLOWED
- Create/edit files in workspace
- Push to GitHub repos (both accounts)
- Generate images for branding
- Execute npm/node commands
- Search and crawl public websites

### NOT ALLOWED
- Access private APIs without keys
- Modify system files
- Execute destructive commands without approval
- Share credentials in outputs

---

## QUICK COMMANDS

### GitHub Profile README
```bash
# Push README to profile repo
mcp_github push_files to mahmoudawaleh/mahmoudawaleh
```

### Generate Banner
```bash
# Create LinkedIn banner
generate_image "Professional LinkedIn banner for AI strategist"
```

### Audit Profiles
```bash
# Crawl all social profiles
browser_subagent → navigate to each platform → capture state
```
