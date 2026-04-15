import { Link } from "react-router";
import { Box } from "lucide-react";

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="section-inner">
                <div className="footer-top">
                    <Link to="/" className="brand">
                        <Box className="logo" />
                        <span className="name">Strux</span>
                    </Link>
                </div>

                <div className="footer-grid">
                    <div className="footer-column">
                        <span className="eyebrow">Explore</span>
                        <Link to="/">Home</Link>
                        <Link to="/pricing">Pricing</Link>
                        <Link to="/community">Community</Link>
                        <Link to="/enterprise">Enterprise</Link>
                    </div>

                    <div className="footer-column">
                        <span className="eyebrow">Workflow</span>
                        <a href="/#upload">Upload Plans</a>
                        <a href="/#upload">Generate Renders</a>
                        <a href="/#upload">Compare Outputs</a>
                    </div>

                    <div className="footer-column">
                        <span className="eyebrow">Contact</span>
                        <a href="mailto:hello@strux.design">hello@strux.design</a>
                        <a href="mailto:enterprise@strux.design">enterprise@strux.design</a>
                        <span>Remote-first, built for design teams</span>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 Strux. Crafted for modern architecture teams.</span>
                    <span>Design faster. Present better.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
