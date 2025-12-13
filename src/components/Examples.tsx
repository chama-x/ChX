
import React from 'react';

const Examples: React.FC = () => {
    return (
        <section id="examples" className="examples">
            <div className="container">
                <h2>Real-World Examples</h2>
                <p className="section-description">See how ChX can be used in various scenarios.</p>

                <div className="examples-grid">
                    <article className="example-card">
                        <h3>🔧 Code Review Assistant</h3>
                        <p>A context for thorough code reviews with specific focus areas.</p>
                        <pre><code><span className="keyword">@context</span> <span className="string">"code-reviewer"</span> {'{'}
                            <span className="keyword">@role</span> <span className="string">"senior code reviewer"</span>

                            <span className="keyword">@rules</span> {'{'}
                            - Check for security issues
                            - Identify performance problems
                            - Suggest improvements
                            - Be constructive
                            {'}'}

                            <span className="keyword">@include</span> <span className="path">./src/**/*.{'{'}ts,js{'}'}</span>
                            <span className="keyword">@exclude</span> <span className="path">./src/**/*.test.*</span>

                            <span className="keyword">@output</span> {'{'}
                            format: <span className="string">"markdown"</span>
                            sections: [
                            <span className="string">"critical-issues"</span>,
                            <span className="string">"suggestions"</span>,
                            <span className="string">"praise"</span>
                            ]
                            {'}'}
                            {'}'}</code></pre>
                    </article>

                    <article className="example-card">
                        <h3>📚 Documentation Writer</h3>
                        <p>Generate consistent documentation from your codebase.</p>
                        <pre><code><span className="keyword">@context</span> <span className="string">"doc-writer"</span> {'{'}
                            <span className="keyword">@role</span> <span className="string">"technical writer"</span>

                            <span className="keyword">@let</span> project = <span className="keyword">@json</span>(<span className="path">./package.json</span>)

                            <span className="keyword">@rules</span> {'{'}
                            - Write clear, concise docs
                            - Include code examples
                            - Target: ${'{'}project.audience{'}'}
                            {'}'}

                            <span className="keyword">@include</span> <span className="path">./src/index.ts</span>
                            <span className="keyword">@include</span> <span className="path">./src/types.ts</span>

                            <span className="keyword">@task</span> <span className="string">"readme"</span> {'{'}
                            <span className="keyword">@template</span> <span className="path">./templates/readme.md</span>
                            {'}'}
                            {'}'}</code></pre>
                    </article>

                    {/* Simplified for brevity, included most relevant ones */}
                </div>
            </div>
        </section>
    );
};

export default Examples;
