# ⟨ChX⟩

## Universal Context Language

[![GitHub Pages](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://chama-x.github.io/ChX/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**ChX** is a Universal Context Language for standardizing context engineering in AI/LLM applications. Write structured prompts, manage file connections, and build advanced AI workflows with a clean, expressive syntax.

🌐 **[Live Documentation & Playground →](https://chama-x.github.io/ChX/)**

---

## Why ChX?

Context engineering for AI applications often becomes:
- 🍝 **Spaghetti prompts** - Hard to maintain, no structure
- 🔄 **Copy-paste chaos** - No reusability across projects
- 📁 **Manual file handling** - Tedious context assembly
- 🎯 **Inconsistent results** - No best practices enforcement

ChX solves this with:
- ✅ **Structured syntax** - Define context with clear hierarchies
- ✅ **File integration** - Reference files with glob patterns
- ✅ **Composable blocks** - Reuse context like code modules
- ✅ **Best practices** - Built-in patterns from research

---

## Quick Example

```chx
@context "code-assistant" {
  @role "senior software engineer"
  
  @rules {
    - Write clean, readable code
    - Follow best practices
    - Explain your reasoning
  }
  
  @include ./src/**/*.ts {
    max_tokens: 5000
  }
  
  @task "review" {
    @goal "Review code for bugs and improvements"
    @output {
      format: "markdown"
      sections: ["summary", "issues", "suggestions"]
    }
  }
}
```

---

## Core Features

### 📐 Context Blocks
Define named scopes with clear boundaries:
```chx
@context "my-assistant" {
  # Everything here belongs to this context
}

@context:system "core-rules" {
  # System-level context (highest priority)
}
```

### 👤 Roles & Expertise
Assign clear identities:
```chx
@role "expert TypeScript developer" {
  @expertise ["system design", "testing", "performance"]
}
```

### 📋 Scoped Rules
Apply rules at different priority levels:
```chx
@rules {
  - Be concise
  - Use examples
}

@rules:critical {
  - Never output harmful content
  - Protect user privacy
}
```

### 📁 File Integration
Reference your codebase:
```chx
@include ./src/**/*.ts
@include ./docs/*.md { max_tokens: 2000 }
@exclude ./node_modules/**
```

### 💎 Variables & Conditions
Dynamic context configuration:
```chx
@let project = "MyApp"
@let env = @env("NODE_ENV", "development")

@if (env == "production") {
  @rules { - Optimize for performance }
}
```

### 🧩 Composition
Build complex contexts from simple blocks:
```chx
@import { coding_rules } from ./contexts/base.chx

@mixin security_checks {
  @rules:critical { - Validate all inputs }
}

@context "api-handler" extends "base-handler" {
  @apply security_checks
}
```

---

## Documentation

Visit the **[full documentation](https://chama-x.github.io/ChX/)** for:

- 📖 Complete language specification
- 🎮 Interactive playground
- 💡 Real-world examples
- 🚀 Getting started guide

---

## Use Cases

| Use Case | Description |
|----------|-------------|
| **Code Review** | Structured review with specific focus areas |
| **Documentation** | Consistent docs from your codebase |
| **Test Generation** | Tests matching your existing patterns |
| **Security Audit** | Systematic vulnerability checking |
| **Refactoring** | Context-aware code improvements |

---

## Project Structure

```
ChX/
├── docs/           # GitHub Pages website
│   ├── index.html  # Main documentation page
│   ├── css/        # Styles
│   └── js/         # Interactive playground
├── README.md       # This file
└── LICENSE         # MIT License
```

---

## Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest features  
- 📖 Improve documentation
- 🔧 Submit pull requests

---

## License

MIT License © 2024 ChX Contributors

---

<p align="center">
  <strong>⟨ChX⟩</strong> - Write Context Like Code
</p>

