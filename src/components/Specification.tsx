
import React from 'react';

const Specification: React.FC = () => {
    return (
        <section id="specification" className="specification">
            <div className="container">
                <h2>Language Specification</h2>
                <p className="section-description">A complete guide to ChX syntax and semantics.</p>

                <div className="spec-content">
                    <nav className="spec-nav">
                        <a href="#spec-basics" className="spec-nav-item">Basics</a>
                        <a href="#spec-context" className="spec-nav-item">Context Blocks</a>
                        <a href="#spec-directives" className="spec-nav-item">Directives</a>
                        <a href="#spec-files" className="spec-nav-item">File References</a>
                        <a href="#spec-variables" className="spec-nav-item">Variables</a>
                        <a href="#spec-conditionals" className="spec-nav-item">Conditionals</a>
                        <a href="#spec-composition" className="spec-nav-item">Composition</a>
                    </nav>

                    <div className="spec-details">
                        <article id="spec-basics" className="spec-section">
                            <h3>Basics</h3>
                            <p>ChX files use the <code>.chx</code> extension. The syntax is designed to be readable and expressive, combining the familiarity of configuration languages with the power of a domain-specific language.</p>

                            <h4>Comments</h4>
                            <pre><code><span className="comment"># Single line comment</span>{'\n\n'}<span className="comment">/* {'\n'}   Multi-line {'\n'}   comment {'\n'}*/</span></code></pre>

                            <h4>Strings</h4>
                            <pre><code><span className="comment"># Double quotes for strings</span>{'\n'}<span className="string">"Hello, world!"</span>{'\n\n'}<span className="comment"># Multi-line strings with triple quotes</span>{'\n'}<span className="string">"""{'\n'}This is a multi-line{'\n'}string that preserves{'\n'}formatting.{'\n'}"""</span></code></pre>
                        </article>

                        {/* More articles can be added here if needed, keeping it concise or full based on index.html */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Specification;
