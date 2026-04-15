import Navbar from "./Navbar";
import Footer from "./Footer";

interface MarketingPageProps {
    title: string;
    subtitle: string;
    accent?: string;
    cards: Array<{
        eyebrow: string;
        title: string;
        description: string;
        strong?: string;
        featured?: boolean;
    }>;
}

const MarketingPage = ({ title, subtitle, accent, cards }: MarketingPageProps) => {
    return (
        <div className="home">
            <Navbar />

            <section className="page-hero">
                <div className="section-inner">
                    <div className="page-kicker">{accent || "Strux"}</div>
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>
            </section>

            <section className="marketing-section">
                <div className="section-inner">
                    <div className="marketing-grid">
                        {cards.map(({ eyebrow, title: cardTitle, description, strong, featured }) => (
                            <article
                                key={cardTitle}
                                className={`marketing-card ${featured ? "marketing-card--featured" : ""}`.trim()}
                            >
                                <span className="eyebrow">{eyebrow}</span>
                                <h3>{cardTitle}</h3>
                                <p>{description}</p>
                                {strong && <strong>{strong}</strong>}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default MarketingPage;
