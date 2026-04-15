import type { Route } from "./+types/community";
import MarketingPage from "../../components/MarketingPage";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Community | Strux" },
        { name: "description", content: "Discover Strux community workflows, showcases, and inspiration." },
    ];
}

export default function CommunityPage() {
    return (
        <MarketingPage
            title="A Community For Designers Who Think Visually"
            subtitle="Share transformations, gather feedback, and turn before-and-after stories into work that clients and peers instantly understand."
            accent="Community"
            cards={[
                {
                    eyebrow: "Weekly Drops",
                    title: "Fresh layout inspiration",
                    description: "Browse standout transformations, emerging visual styles, and curated prompt experiments from real projects.",
                },
                {
                    eyebrow: "Crit Sessions",
                    title: "Feedback that moves designs forward",
                    description: "Share work-in-progress concepts and gather fast visual feedback from peers who speak the same design language.",
                    featured: true,
                },
                {
                    eyebrow: "Showcase",
                    title: "Publish polished case studies",
                    description: "Turn plan-to-render transformations into portfolio-ready presentations that feel intentional and easy to scan.",
                },
            ]}
        />
    );
}
