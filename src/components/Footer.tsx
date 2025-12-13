
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="logo">
                            <span className="logo-symbol">⟨</span>ChX<span className="logo-symbol">⟩</span>
                        </span>
                        <p>Universal Context Language</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Documentation</h4>
                            <a href="#specification">Specification</a>
                            <a href="#examples">Examples</a>
                            <a href="#playground">Playground</a>
                        </div>
                        <div className="footer-column">
                            <h4>Community</h4>
                            <a href="https://github.com/chama-x/ChX" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://github.com/chama-x/ChX/issues" target="_blank" rel="noopener noreferrer">Issues</a>
                            <a href="https://github.com/chama-x/ChX/discussions" target="_blank" rel="noopener noreferrer">Discussions</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>MIT License © 2024 ChX Contributors</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
