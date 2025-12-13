
import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { ChXParser, PromptGenerator, astToTree } from '../lib/parser';
import '../App.css'; // Ensure styles are applied

const sampleCode = `# Welcome to ChX!
# Try editing this context definition

@context "code-assistant" {
  @role "senior software engineer"
  
  @rules {
    - Write clean, readable code
    - Follow best practices
    - Explain your reasoning
  }
  
  @task "review" {
    @goal "Review code for issues"
    @output {
      format: "markdown"
    }
  }
  
  @if (@exists(./src)) {
    @include ./src/**/*.ts {
      max_tokens: 5000
    }
  }
}`;

const Playground: React.FC = () => {
    const [code, setCode] = useState(sampleCode);
    const [outputFormat, setOutputFormat] = useState<'ast' | 'json' | 'prompt'>('ast');
    const [output, setOutput] = useState('');

    useEffect(() => {
        try {
            const parser = new ChXParser();
            const ast = parser.parse(code);

            if (outputFormat === 'json') {
                setOutput(JSON.stringify(ast, null, 2));
            } else if (outputFormat === 'prompt') {
                const generator = new PromptGenerator();
                setOutput(generator.generate(ast));
            } else {
                setOutput(astToTree(ast));
            }
        } catch (e) {
            setOutput('Error parsing code: ' + (e as Error).message);
        }
    }, [code, outputFormat]);

    const handleReset = () => setCode(sampleCode);

    return (
        <section id="playground" className="playground">
            <div className="container">
                <h2>Interactive Playground</h2>
                <p className="section-description">Try ChX syntax in real-time. Edit the code and see the parsed output.</p>

                <div className="playground-container">
                    <div className="playground-editor">
                        <div className="editor-header">
                            <span className="editor-title">context.chx</span>
                            <button className="btn btn-small" onClick={handleReset}>Reset</button>
                        </div>
                        <div style={{ flex: 1, overflow: 'auto', maxHeight: '500px', backgroundColor: 'transparent' }}>
                            <Editor
                                value={code}
                                onValueChange={code => setCode(code)}
                                highlight={code => highlight(code, languages.js, 'js')}
                                padding={20}
                                style={{
                                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                                    fontSize: 14,
                                    backgroundColor: 'transparent',
                                    minHeight: '100%',
                                }}
                                textareaClassName="chx-input"
                            />
                        </div>
                    </div>

                    <div className="playground-output">
                        <div className="editor-header">
                            <span className="editor-title">Parsed Output</span>
                            <select
                                id="output-format"
                                value={outputFormat}
                                onChange={(e) => setOutputFormat(e.target.value as any)}
                            >
                                <option value="ast">AST (Tree)</option>
                                <option value="json">JSON</option>
                                <option value="prompt">Generated Prompt</option>
                            </select>
                        </div>
                        <pre id="chx-output" style={{ flex: 1, margin: 0, padding: 20, overflow: 'auto' }}>{output}</pre>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Playground;
