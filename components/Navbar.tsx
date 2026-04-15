import {Box} from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
    return (
        <header className="navbar">
            <nav className="inner">
                <div className="left">
                    <Link to="/" className="brand">
                        <Box  className="logo" />

                        <span className="name">
                            Strux
                        </span>
                    </Link>

                    <ul className="links">
                        <Link to="/pricing">Pricing</Link>
                        <Link to="/community">Community</Link>
                        <Link to="/enterprise">Enterprise</Link>
                    </ul>
                </div>

                <div className="actions">
                    <Link to="/#upload" className="cta">Get Started</Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
