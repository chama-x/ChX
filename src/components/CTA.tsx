
import React from 'react';

const CTA: React.FC = () => {
    return (
        <section className="cta">
            <div className="container">
                <h2>Ready to standardize your context?</h2>
                <p>ChX is open source and ready to use in your projects.</p>
                <div className="cta-actions">
                    <a href="https://github.com/chama-x/ChX" className="btn btn-primary btn-large" target="_blank" rel="noopener noreferrer">
                        View on GitHub
                    </a>
                    <a href="#specification" className="btn btn-secondary btn-large">
                        Read the Docs
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTA;
