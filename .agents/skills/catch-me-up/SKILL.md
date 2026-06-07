---
name: catch-me-up
description: |
  A structured exploration workflow to help users rapidly understand unfamiliar codebases. 
  Use this skill whenever the user wants to "catch up" on a project, understand a codebase, 
  explore unfamiliar code, or asks about project structure, architecture, conventions, or 
  how things work. This skill organizes exploration into six modes: Architecture (high-level 
  system design), Conventions (coding standards), Feature Traces (data/function flow), 
  Syntax (language constructs), Testing (validation patterns), and History (why decisions 
  were made). Always use this before implementing features in new codebases to build an 
  accurate mental model. Perfect for onboarding to new repos, investigating bug causes, or 
  understanding legacy code.
---

# Catch Me Up - Codebase Exploration Skill

This skill helps you rapidly understand any codebase using a structured exploration approach. Instead of jumping straight into code changes, you'll build a mental model first — which leads to better decisions and fewer bugs.

## Why This Matters

When you start working in an unfamiliar codebase without understanding its structure, you risk:
- Breaking existing patterns or conventions
- Misunderstanding how features interact
- Writing code that doesn't fit the project's style
- Missing important edge cases already handled elsewhere

The "Catch Me Up" approach reverses this: **comprehension before implementation**.

## The Six Exploration Modes

Use these modes to systematically understand any codebase:

### 1. Architecture
**What it reveals:** High-level system design, components, dependencies, and how pieces fit together.

**What to explore:**
- Entry points (main files, index files, app bootstraps)
- Directory structure and organization
- Key dependencies and their roles
- Data flow between components
- Configuration files

**Output:** A mental map of "what talks to what"

### 2. Conventions
**What it reveals:** Coding standards, patterns, and practices the project follows.

**What to explore:**
- Naming conventions (files, functions, variables)
- Code organization patterns (how files are structured)
- Error handling approaches
- State management patterns
- API design patterns
- Testing conventions

**Output:** A style guide you can follow

### 3. Feature Traces
**What it reveals:** How specific functionality moves through the system from input to output.

**What to explore:**
- How a feature starts (user action, API call, event)
- What processing happens along the way
- Where data is stored or retrieved
- What side effects occur
- How the feature ends (response, UI update, etc.)

**Output:** A step-by-step flow diagram in your head

### 4. Syntax
**What it reveals:** Understanding specific language or framework constructs used in the code.

**What to explore:**
- Framework-specific patterns (React hooks, Django decorators, etc.)
- Language features in use
- Custom utilities or helpers
- Third-party library usage patterns

**Output:** Confidence in reading and writing code in this style

### 5. Testing
**What it reveals:** How the code is validated and what test coverage exists.

**What to explore:**
- Test frameworks and tools used
- Test file locations and naming
- What gets tested and what doesn't
- Test patterns and utilities
- How to run tests

**Output:** Ability to add tests that fit existing patterns

### 6. History
**What it reveals:** Why certain decisions were made (often crucial for understanding "why is it like that?").

**What to explore:**
- Git blame for complex areas
- Recent commits and changes
- Documentation of past decisions
- Related issues or PRs

**Output:** Context that explains current state

## How to Use This Skill

### Step 1: Initial Assessment (Quick Scan)
When the user says something like "catch me up on this project" or "I'm new here, help me understand:", start with a quick scan:

1. **List directory structure** - Understand the overall organization
2. **Find entry points** - Identify main files, package.json, main.rs, etc.
3. **Check for README** - Get the high-level description
4. **Identify tech stack** - Note frameworks and key dependencies

### Step 2: Present Options
After the quick scan, present the user with the six exploration modes and let them prioritize based on their needs. Ask:

> "I found the project structure. Which areas would you like to explore first? I can cover:
> - **Architecture** - How the system is designed
> - **Conventions** - Coding standards and patterns
> - **Feature Traces** - How specific features work
> - **Syntax** - Framework/language specifics
> - **Testing** - How code is validated
> - **History** - Why things are the way they are"

### Step 3: Deep Dive (User-Directed)
Based on what the user prioritizes, explore those areas in depth:

- Read relevant files thoroughly
- Trace relationships between components
- Take notes on patterns discovered
- Verify understanding by checking multiple examples

### Step 4: Synthesize and Confirm
After exploration, summarize your findings and verify with the user:

- "Here's what I understand about the architecture..."
- "The convention seems to be..."
- "Does this match your understanding?"

### Step 5: Apply (Post-Exploration)
Only after the user confirms comprehension should you:
- Plan any code changes
- Suggest refactors
- Add new features

## Exploration Output Format

When presenting findings, organize by mode:

```markdown
## Architecture
- Entry point: `src/index.ts`
- Key components:
  - `src/components/` - React UI components
  - `src/services/` - Business logic
  - `src/api/` - API handlers
- Data flow: User → Component → Service → API → Database

## Conventions
- Files: kebab-case (`user-service.ts`)
- Functions: camelCase, verb-prefixed (`getUserById`)
- Components: PascalCase (`.tsx` files)
- Tests: `.spec.ts` suffix, colocated
- etc.
```

## When to Explore vs. Implement

**EXPLORE first when:**
- User is new to the project
- User asks "how does X work?"
- Investigating a bug or unexpected behavior
- Planning significant changes
- Code is complex or legacy

**EXPLORE light-touch when:**
- Small, isolated changes
- Clear, well-documented code
- User explicitly wants to dive in directly
- Time is critical (still do a quick scan though!)

## Pro Tips

1. **Don't overwhelm** - Start with Architecture + Conventions, then let user choose next steps
2. **Cite evidence** - Always point to actual code when explaining patterns
3. **Admit uncertainty** - If something isn't clear, say so and explore more
4. **Connect the dots** - Show how one area relates to others
5. **Keep it practical** - Focus on what matters for the user's specific task
6. **Update the user** - Tell them what you're about to explore before doing it

## Example Workflow

**User says:** "I need to add a new API endpoint to this project. Can you help me understand how the existing ones work?"

**Your response:**

1. Quick scan: list structure, find API directory
2. Present options: "I can show you the Architecture (how the API is organized), Conventions (how endpoints are structured), and Feature Traces (how a request flows through). Which would you like?"
3. Based on user choice, deep dive into those areas
4. Show example endpoint, explain the pattern
5. Ask: "Now that you see the pattern, do you want to add your endpoint, or explore Testing to see how they're validated?"

---

Remember: Your goal is to make the user confident in understanding the codebase. Once they "get it," they're equipped to make good decisions — and that's when the real work begins.