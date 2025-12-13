
import React from 'react';

const Features: React.FC = () => {
    return (
        <section id="features" className="features">
            <div className="container">
                <h2>Why ChX?</h2>
                <p className="section-description">Context engineering shouldn't be an afterthought. ChX provides the tools to make it first-class.</p>

                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📐</div>
                        <h3>Structured Context</h3>
                        <p>Define context with clear hierarchies, roles, and boundaries. No more messy prompt concatenation.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔗</div>
                        <h3>File Integration</h3>
                        <p>Reference files and directories with glob patterns. Keep your context synchronized with your codebase.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Scoped Rules</h3>
                        <p>Apply rules at different levels - global, context-specific, or task-specific. Full control over AI behavior.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔄</div>
                        <h3>Composable</h3>
                        <p>Build complex contexts from simple, reusable blocks. Import and extend contexts like modules.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Variables & Logic</h3>
                        <p>Use variables, conditionals, and templates. Dynamic context that adapts to your needs.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Best Practices</h3>
                        <p>Built-in patterns from context engineering research. Write effective prompts by default.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
