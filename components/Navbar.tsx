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
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/community">Community</Link></li>
                        <li><Link to="/enterprise">Enterprise</Link></li>
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
