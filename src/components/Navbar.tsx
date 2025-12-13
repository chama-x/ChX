
import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <a href="#" className="logo">
                    <span className="logo-symbol">⟨</span>ChX<span className="logo-symbol">⟩</span>
                </a>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li key="features"><a href="#features">Features</a></li>
                    <li key="spec"><a href="#specification">Specification</a></li>
                    <li key="play"><a href="#playground">Playground</a></li>
                    <li key="ex"><a href="#examples">Examples</a></li>
                    <li key="gh"><a href="https://github.com/chama-x/ChX" className="btn btn-outline" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                </ul>
                <button className="mobile-menu-btn" aria-label="Toggle menu" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
