
import React from 'react';

const Hero: React.FC = () => {
    return (
        <header className="hero">
            <div className="hero-content">
                <div className="hero-badge">Universal Context Language</div>
                <h1>Write Context <span className="gradient-text">Like Code</span></h1>
                <p className="hero-description">
                    ChX standardizes context engineering for AI applications.
                    Define structured prompts, manage file connections, and build
                    advanced AI workflows with a clean, expressive syntax.
                </p>
                <div className="hero-actions">
                    <a href="#playground" className="btn btn-primary">Try Playground</a>
                    <a href="#specification" className="btn btn-secondary">Read Docs</a>
                </div>
                <div className="hero-code">
                    <pre><code><span className="keyword">@context</span> <span className="string">"project-assistant"</span> {'{'}
                        <span className="keyword">@role</span> <span className="string">"expert software engineer"</span>
                        <span className="keyword">@include</span> <span className="path">./codebase/*.ts</span>
                        <span className="keyword">@rules</span> {'{'}
                        - Follow existing patterns
                        - Write comprehensive tests
                        - Document public APIs
                        {'}'}
                        {'}'}</code></pre>
                </div>
            </div>
        </header>
    );
};

export default Hero;
