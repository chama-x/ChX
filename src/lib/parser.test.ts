
import { describe, it, expect } from 'vitest';
import { ChXParser, PromptGenerator } from './parser';

describe('ChXParser', () => {
    it('should tokenize basic syntax', () => {
        const parser = new ChXParser();
        const source = '@context "test" { @role "admin" }';
        const tokens = parser.tokenize(source);

        expect(tokens.length).toBeGreaterThan(0);
        expect(tokens[0]).toEqual({ type: 'DIRECTIVE', value: '@context' });
        expect(tokens[1]).toEqual({ type: 'STRING', value: 'test' });
        expect(tokens[2]).toEqual({ type: 'LBRACE', value: '{' });
        expect(tokens[3]).toEqual({ type: 'DIRECTIVE', value: '@role' });
    });

    it('should parse a complete context block', () => {
        const parser = new ChXParser();
        const source = `
      @context "assistant" {
        @role "helper"
        @rules {
          - Be nice
        }
      }
    `;
        const ast = parser.parse(source);

        expect(ast.type).toBe('Program');
        expect(ast.body.length).toBe(1);

        const context = ast.body[0];
        expect(context.type).toBe('Context');
        expect(context.name).toBe('assistant');
        expect(context.body.length).toBe(2); // Role and Rules
    });
});

describe('PromptGenerator', () => {
    it('should generate a prompt from AST', () => {
        const parser = new ChXParser();
        const generator = new PromptGenerator();
        const source = `
          @context "test" {
            @role "bot"
            @rules { - Rule 1 }
          }
        `;
        const ast = parser.parse(source);
        const prompt = generator.generate(ast);

        expect(prompt).toContain('=== SYSTEM ===');
        expect(prompt).toContain('You are a bot.');
        expect(prompt).toContain('Rules:');
        expect(prompt).toContain('• Rule 1');
    });
});
