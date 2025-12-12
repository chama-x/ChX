// ChX Parser and Playground
// A simple tokenizer and parser for the ChX language

class ChXParser {
    constructor() {
        this.tokens = [];
        this.current = 0;
    }

    // Tokenizer
    tokenize(source) {
        const tokens = [];
        let i = 0;
        
        while (i < source.length) {
            // Skip whitespace
            if (/\s/.test(source[i])) {
                i++;
                continue;
            }
            
            // Comments
            if (source[i] === '#') {
                let comment = '';
                while (i < source.length && source[i] !== '\n') {
                    comment += source[i];
                    i++;
                }
                tokens.push({ type: 'COMMENT', value: comment });
                continue;
            }
            
            // Multi-line comments
            if (source[i] === '/' && i + 1 < source.length && source[i + 1] === '*') {
                let comment = '/*';
                i += 2;
                while (i < source.length && !(source[i] === '*' && i + 1 < source.length && source[i + 1] === '/')) {
                    comment += source[i];
                    i++;
                }
                if (i < source.length) {
                    comment += '*/';
                    i += 2;
                }
                tokens.push({ type: 'COMMENT', value: comment });
                continue;
            }
            
            // Directives (@keyword)
            if (source[i] === '@') {
                let directive = '@';
                i++;
                while (i < source.length && /[a-zA-Z0-9_:]/.test(source[i])) {
                    directive += source[i];
                    i++;
                }
                tokens.push({ type: 'DIRECTIVE', value: directive });
                continue;
            }
            
            // Strings
            if (source[i] === '"') {
                let str = '';
                const isTriple = source.slice(i, i + 3) === '"""';
                
                if (isTriple) {
                    i += 3;
                    while (i < source.length && source.slice(i, i + 3) !== '"""') {
                        str += source[i];
                        i++;
                    }
                    if (i < source.length) {
                        i += 3;
                    }
                } else {
                    i++;
                    while (i < source.length && source[i] !== '"') {
                        if (source[i] === '\\' && i + 1 < source.length) {
                            str += source[i];
                            i++;
                        }
                        if (i < source.length) {
                            str += source[i];
                            i++;
                        }
                    }
                    if (i < source.length) {
                        i++;
                    }
                }
                tokens.push({ type: 'STRING', value: str });
                continue;
            }
            
            // Paths (starts with ./ or ../)
            if ((source[i] === '.' && source[i + 1] === '/') || 
                (source[i] === '.' && source[i + 1] === '.' && source[i + 2] === '/')) {
                let path = '';
                while (i < source.length && /[a-zA-Z0-9_./*{},\-]/.test(source[i])) {
                    path += source[i];
                    i++;
                }
                tokens.push({ type: 'PATH', value: path });
                continue;
            }
            
            // Numbers
            if (/[0-9]/.test(source[i])) {
                let num = '';
                while (i < source.length && /[0-9.]/.test(source[i])) {
                    num += source[i];
                    i++;
                }
                tokens.push({ type: 'NUMBER', value: parseFloat(num) });
                continue;
            }
            
            // Identifiers and keywords
            if (/[a-zA-Z_]/.test(source[i])) {
                let ident = '';
                while (i < source.length && /[a-zA-Z0-9_]/.test(source[i])) {
                    ident += source[i];
                    i++;
                }
                
                // Check for boolean
                if (ident === 'true' || ident === 'false') {
                    tokens.push({ type: 'BOOLEAN', value: ident === 'true' });
                } else if (['extends', 'from', 'as'].includes(ident)) {
                    tokens.push({ type: 'KEYWORD', value: ident });
                } else {
                    tokens.push({ type: 'IDENTIFIER', value: ident });
                }
                continue;
            }
            
            // Operators and punctuation
            const punct = {
                '{': 'LBRACE',
                '}': 'RBRACE',
                '[': 'LBRACKET',
                ']': 'RBRACKET',
                '(': 'LPAREN',
                ')': 'RPAREN',
                ':': 'COLON',
                ',': 'COMMA',
                '=': 'EQUALS',
                '-': 'DASH',
                '*': 'STAR',
                '>': 'ARROW'
            };
            
            if (punct[source[i]]) {
                tokens.push({ type: punct[source[i]], value: source[i] });
                i++;
                continue;
            }
            
            // Skip unknown characters
            i++;
        }
        
        return tokens;
    }

    // Parser
    parse(source) {
        this.tokens = this.tokenize(source);
        this.current = 0;
        
        const ast = {
            type: 'Program',
            body: []
        };
        
        while (this.current < this.tokens.length) {
            const node = this.parseStatement();
            if (node) {
                ast.body.push(node);
            }
        }
        
        return ast;
    }

    peek() {
        return this.tokens[this.current];
    }

    advance() {
        return this.tokens[this.current++];
    }

    parseStatement() {
        const token = this.peek();
        
        if (!token) return null;
        
        if (token.type === 'COMMENT') {
            this.advance();
            return { type: 'Comment', value: token.value };
        }
        
        if (token.type === 'DIRECTIVE') {
            return this.parseDirective();
        }
        
        // Skip other tokens
        this.advance();
        return null;
    }

    parseDirective() {
        const directive = this.advance();
        
        switch (directive.value) {
            case '@context':
            case '@context:system':
            case '@context:user':
            case '@context:assistant':
                return this.parseContext(directive.value);
            
            case '@role':
                return this.parseRole();
            
            case '@rules':
            case '@rules:critical':
                return this.parseRules(directive.value);
            
            case '@include':
                return this.parseInclude();
            
            case '@exclude':
                return this.parseExclude();
            
            case '@task':
                return this.parseTask();
            
            case '@let':
                return this.parseLet();
            
            case '@if':
                return this.parseIf();
            
            case '@import':
                return this.parseImport();
            
            case '@mixin':
                return this.parseMixin();
            
            case '@apply':
                return this.parseApply();
            
            case '@output':
                return this.parseOutput();
            
            case '@goal':
            case '@prefer':
            case '@tone':
            case '@template':
            case '@reference':
                return this.parseSimpleDirective(directive.value);
            
            default:
                return { type: 'Directive', name: directive.value };
        }
    }

    parseContext(type) {
        const name = this.peek()?.type === 'STRING' ? this.advance().value : 'anonymous';
        let extendsFrom = null;
        
        // Check for extends
        if (this.peek()?.type === 'KEYWORD' && this.peek()?.value === 'extends') {
            this.advance(); // consume 'extends'
            extendsFrom = this.advance()?.value;
        }
        
        const body = this.parseBlock();
        
        return {
            type: 'Context',
            contextType: type,
            name,
            extends: extendsFrom,
            body
        };
    }

    parseRole() {
        const value = this.peek()?.type === 'STRING' ? this.advance().value : '';
        let expertise = null;
        
        if (this.peek()?.type === 'LBRACE') {
            const block = this.parseBlock();
            expertise = block;
        }
        
        return {
            type: 'Role',
            value,
            expertise
        };
    }

    parseRules(type) {
        const rules = [];
        
        if (this.peek()?.type === 'LBRACE') {
            this.advance(); // consume '{'
            
            while (this.peek() && this.peek().type !== 'RBRACE') {
                if (this.peek().type === 'DASH') {
                    this.advance(); // consume '-'
                    let rule = '';
                    while (this.peek() && 
                           this.peek().type !== 'DASH' && 
                           this.peek().type !== 'RBRACE') {
                        const token = this.advance();
                        rule += (token.value || token.type) + ' ';
                    }
                    rules.push(rule.trim());
                } else {
                    this.advance();
                }
            }
            
            if (this.peek()?.type === 'RBRACE') {
                this.advance();
            }
        }
        
        return {
            type: 'Rules',
            priority: type === '@rules:critical' ? 'critical' : 'normal',
            rules
        };
    }

    parseInclude() {
        let paths = [];
        let options = null;
        
        if (this.peek()?.type === 'LBRACKET') {
            this.advance();
            while (this.peek() && this.peek().type !== 'RBRACKET') {
                if (this.peek().type === 'PATH' || this.peek().type === 'STRING') {
                    paths.push(this.advance().value);
                } else {
                    this.advance();
                }
            }
            if (this.peek()?.type === 'RBRACKET') {
                this.advance();
            }
        } else if (this.peek()?.type === 'PATH') {
            paths.push(this.advance().value);
        }
        
        if (this.peek()?.type === 'LBRACE') {
            options = this.parseOptions();
        }
        
        return {
            type: 'Include',
            paths,
            options
        };
    }

    parseExclude() {
        const paths = [];
        
        if (this.peek()?.type === 'LBRACKET') {
            this.advance();
            while (this.peek() && this.peek().type !== 'RBRACKET') {
                if (this.peek().type === 'PATH' || this.peek().type === 'STRING') {
                    paths.push(this.advance().value);
                } else {
                    this.advance();
                }
            }
            if (this.peek()?.type === 'RBRACKET') {
                this.advance();
            }
        } else if (this.peek()?.type === 'PATH') {
            paths.push(this.advance().value);
        }
        
        return {
            type: 'Exclude',
            paths
        };
    }

    parseTask() {
        const name = this.peek()?.type === 'STRING' ? this.advance().value : 'anonymous';
        const body = this.parseBlock();
        
        return {
            type: 'Task',
            name,
            body
        };
    }

    parseLet() {
        const name = this.peek()?.type === 'IDENTIFIER' ? this.advance().value : '';
        
        // consume '='
        if (this.peek()?.type === 'EQUALS') {
            this.advance();
        }
        
        let value = null;
        if (this.peek()?.type === 'STRING') {
            value = { type: 'String', value: this.advance().value };
        } else if (this.peek()?.type === 'NUMBER') {
            value = { type: 'Number', value: this.advance().value };
        } else if (this.peek()?.type === 'DIRECTIVE') {
            value = { type: 'FunctionCall', name: this.advance().value };
            if (this.peek()?.type === 'LPAREN') {
                this.advance();
                const args = [];
                while (this.peek() && this.peek().type !== 'RPAREN') {
                    if (this.peek().type === 'STRING' || this.peek().type === 'PATH') {
                        args.push(this.advance().value);
                    } else {
                        this.advance();
                    }
                }
                if (this.peek()?.type === 'RPAREN') {
                    this.advance();
                }
                value.args = args;
            }
        }
        
        return {
            type: 'Let',
            name,
            value
        };
    }

    parseIf() {
        // Parse condition
        let condition = '';
        if (this.peek()?.type === 'LPAREN') {
            this.advance();
            let depth = 1;
            while (this.peek() && depth > 0) {
                if (this.peek().type === 'LPAREN') depth++;
                if (this.peek().type === 'RPAREN') depth--;
                if (depth > 0) {
                    condition += (this.advance().value || '') + ' ';
                } else {
                    this.advance();
                }
            }
        }
        
        const body = this.parseBlock();
        
        return {
            type: 'If',
            condition: condition.trim(),
            body
        };
    }

    parseImport() {
        let imports = [];
        let from = null;
        let alias = null;
        
        if (this.peek()?.type === 'PATH') {
            from = this.advance().value;
        } else if (this.peek()?.type === 'LBRACE') {
            this.advance();
            while (this.peek() && this.peek().type !== 'RBRACE') {
                if (this.peek().type === 'IDENTIFIER') {
                    imports.push(this.advance().value);
                } else {
                    this.advance();
                }
            }
            if (this.peek()?.type === 'RBRACE') {
                this.advance();
            }
            
            if (this.peek()?.type === 'KEYWORD' && this.peek()?.value === 'from') {
                this.advance();
                from = this.advance()?.value;
            }
        } else if (this.peek()?.type === 'STAR') {
            this.advance();
            if (this.peek()?.type === 'KEYWORD' && this.peek()?.value === 'as') {
                this.advance();
                alias = this.advance()?.value;
            }
            if (this.peek()?.type === 'KEYWORD' && this.peek()?.value === 'from') {
                this.advance();
                from = this.advance()?.value;
            }
        }
        
        return {
            type: 'Import',
            imports,
            from,
            alias
        };
    }

    parseMixin() {
        const name = this.peek()?.type === 'IDENTIFIER' ? this.advance().value : '';
        const body = this.parseBlock();
        
        return {
            type: 'Mixin',
            name,
            body
        };
    }

    parseApply() {
        const name = this.peek()?.type === 'IDENTIFIER' ? this.advance().value : '';
        
        return {
            type: 'Apply',
            mixin: name
        };
    }

    parseOutput() {
        const options = this.parseOptions();
        
        return {
            type: 'Output',
            options
        };
    }

    parseSimpleDirective(name) {
        let value = null;
        
        if (this.peek()?.type === 'STRING') {
            value = this.advance().value;
        } else if (this.peek()?.type === 'PATH') {
            value = this.advance().value;
        } else if (this.peek()?.type === 'IDENTIFIER') {
            let values = [];
            while (this.peek()?.type === 'IDENTIFIER') {
                values.push(this.advance().value);
                if (this.peek()?.type === 'COMMA') {
                    this.advance();
                }
            }
            value = values.join(', ');
        }
        
        return {
            type: 'SimpleDirective',
            name,
            value
        };
    }

    parseBlock() {
        const body = [];
        
        if (this.peek()?.type !== 'LBRACE') {
            return body;
        }
        
        this.advance(); // consume '{'
        
        while (this.peek() && this.peek().type !== 'RBRACE') {
            const node = this.parseStatement();
            if (node) {
                body.push(node);
            }
        }
        
        if (this.peek()?.type === 'RBRACE') {
            this.advance();
        }
        
        return body;
    }

    parseOptions() {
        const options = {};
        
        if (this.peek()?.type !== 'LBRACE') {
            return options;
        }
        
        this.advance(); // consume '{'
        
        while (this.peek() && this.peek().type !== 'RBRACE') {
            if (this.peek()?.type === 'IDENTIFIER') {
                const key = this.advance().value;
                
                if (this.peek()?.type === 'COLON') {
                    this.advance();
                }
                
                let value;
                if (this.peek()?.type === 'STRING') {
                    value = this.advance().value;
                } else if (this.peek()?.type === 'NUMBER') {
                    value = this.advance().value;
                } else if (this.peek()?.type === 'BOOLEAN') {
                    value = this.advance().value;
                } else if (this.peek()?.type === 'LBRACKET') {
                    value = this.parseArray();
                } else {
                    value = this.advance()?.value;
                }
                
                options[key] = value;
            } else {
                this.advance();
            }
        }
        
        if (this.peek()?.type === 'RBRACE') {
            this.advance();
        }
        
        return options;
    }

    parseArray() {
        const arr = [];
        
        this.advance(); // consume '['
        
        while (this.peek() && this.peek().type !== 'RBRACKET') {
            if (this.peek()?.type === 'STRING') {
                arr.push(this.advance().value);
            } else if (this.peek()?.type === 'NUMBER') {
                arr.push(this.advance().value);
            } else if (this.peek()?.type === 'PATH') {
                arr.push(this.advance().value);
            } else {
                this.advance();
            }
        }
        
        if (this.peek()?.type === 'RBRACKET') {
            this.advance();
        }
        
        return arr;
    }
}

// Prompt Generator
class PromptGenerator {
    generate(ast) {
        const parts = [];
        let systemContent = [];
        let userContent = [];
        let rules = [];
        let role = null;
        let tasks = [];
        let includes = [];
        let roleHolder = [null]; // Use array as mutable holder
        
        this.extractFromBody(ast.body, {
            systemContent,
            userContent,
            rules,
            roleHolder,
            tasks,
            includes
        });
        
        const role = roleHolder[0];
        
        // Build prompt
        if (systemContent.length > 0 || rules.length > 0 || role) {
            parts.push('=== SYSTEM ===');
            if (role) {
                parts.push(`You are a ${role}.`);
            }
            parts.push(...systemContent);
            if (rules.length > 0) {
                parts.push('\nRules:');
                rules.forEach(r => parts.push(`• ${r}`));
            }
        }
        
        if (includes.length > 0) {
            parts.push('\n=== CONTEXT FILES ===');
            includes.forEach(inc => {
                parts.push(`[Include: ${inc}]`);
            });
        }
        
        if (tasks.length > 0) {
            parts.push('\n=== TASKS ===');
            tasks.forEach(task => {
                parts.push(`Task: ${task.name}`);
                if (task.goal) {
                    parts.push(`Goal: ${task.goal}`);
                }
            });
        }
        
        return parts.join('\n');
    }
    
    extractFromBody(body, ctx) {
        for (const node of body) {
            switch (node.type) {
                case 'Context':
                    this.extractFromBody(node.body, ctx);
                    break;
                case 'Role':
                    ctx.roleHolder[0] = node.value;
                    break;
                case 'Rules':
                    ctx.rules.push(...node.rules);
                    break;
                case 'Include':
                    ctx.includes.push(...node.paths);
                    break;
                case 'Task':
                    const task = { name: node.name };
                    for (const child of node.body) {
                        if (child.type === 'SimpleDirective' && child.name === '@goal') {
                            task.goal = child.value;
                        }
                    }
                    ctx.tasks.push(task);
                    break;
            }
        }
    }
}

// AST to Tree View
function astToTree(node, indent = 0) {
    const prefix = '  '.repeat(indent);
    let result = '';
    
    if (Array.isArray(node)) {
        node.forEach(n => {
            result += astToTree(n, indent);
        });
        return result;
    }
    
    if (!node || typeof node !== 'object') {
        return '';
    }
    
    switch (node.type) {
        case 'Program':
            result += `${prefix}📄 Program\n`;
            result += astToTree(node.body, indent + 1);
            break;
        case 'Context':
            result += `${prefix}📦 Context: "${node.name}"${node.extends ? ` extends ${node.extends}` : ''}\n`;
            result += `${prefix}   type: ${node.contextType}\n`;
            result += astToTree(node.body, indent + 1);
            break;
        case 'Role':
            result += `${prefix}👤 Role: "${node.value}"\n`;
            break;
        case 'Rules':
            result += `${prefix}📋 Rules (${node.priority})\n`;
            node.rules.forEach(r => {
                result += `${prefix}   • ${r}\n`;
            });
            break;
        case 'Include':
            result += `${prefix}📥 Include\n`;
            node.paths.forEach(p => {
                result += `${prefix}   └ ${p}\n`;
            });
            if (node.options && Object.keys(node.options).length > 0) {
                result += `${prefix}   options: ${JSON.stringify(node.options)}\n`;
            }
            break;
        case 'Exclude':
            result += `${prefix}📤 Exclude\n`;
            node.paths.forEach(p => {
                result += `${prefix}   └ ${p}\n`;
            });
            break;
        case 'Task':
            result += `${prefix}✅ Task: "${node.name}"\n`;
            result += astToTree(node.body, indent + 1);
            break;
        case 'Let':
            result += `${prefix}💎 Let: ${node.name}\n`;
            if (node.value) {
                result += `${prefix}   = ${JSON.stringify(node.value)}\n`;
            }
            break;
        case 'If':
            result += `${prefix}❓ If: ${node.condition}\n`;
            result += astToTree(node.body, indent + 1);
            break;
        case 'Import':
            result += `${prefix}📦 Import from: ${node.from}\n`;
            if (node.imports.length > 0) {
                result += `${prefix}   imports: ${node.imports.join(', ')}\n`;
            }
            if (node.alias) {
                result += `${prefix}   as: ${node.alias}\n`;
            }
            break;
        case 'Mixin':
            result += `${prefix}🧩 Mixin: ${node.name}\n`;
            result += astToTree(node.body, indent + 1);
            break;
        case 'Apply':
            result += `${prefix}➡️ Apply: ${node.mixin}\n`;
            break;
        case 'Output':
            result += `${prefix}📊 Output\n`;
            result += `${prefix}   ${JSON.stringify(node.options)}\n`;
            break;
        case 'SimpleDirective':
            result += `${prefix}📌 ${node.name}: ${node.value}\n`;
            break;
        case 'Comment':
            result += `${prefix}💬 ${node.value}\n`;
            break;
        default:
            result += `${prefix}? ${node.type}\n`;
    }
    
    return result;
}

// Initialize playground
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chx-input');
    const output = document.getElementById('chx-output');
    const formatSelect = document.getElementById('output-format');
    const resetBtn = document.getElementById('reset-btn');
    
    const parser = new ChXParser();
    const generator = new PromptGenerator();
    
    const defaultCode = input.value;
    
    function updateOutput() {
        try {
            const ast = parser.parse(input.value);
            const format = formatSelect.value;
            
            switch (format) {
                case 'ast':
                    output.textContent = astToTree(ast);
                    break;
                case 'json':
                    output.textContent = JSON.stringify(ast, null, 2);
                    break;
                case 'prompt':
                    output.textContent = generator.generate(ast);
                    break;
            }
        } catch (e) {
            output.textContent = `Error: ${e.message}`;
        }
    }
    
    input.addEventListener('input', updateOutput);
    formatSelect.addEventListener('change', updateOutput);
    
    resetBtn.addEventListener('click', () => {
        input.value = defaultCode;
        updateOutput();
    });
    
    // Initial render
    updateOutput();
    
    // Spec navigation
    const specNavItems = document.querySelectorAll('.spec-nav-item');
    const specSections = document.querySelectorAll('.spec-section');
    
    specNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            specNavItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const targetId = item.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Update active nav on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                specNavItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3 });
    
    specSections.forEach(section => observer.observe(section));
    
    // Mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
