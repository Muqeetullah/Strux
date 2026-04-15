import type { Route } from "./+types/pricing";
import MarketingPage from "../../components/MarketingPage";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Pricing | Strux" },
        { name: "description", content: "Strux pricing plans for solo designers, studios, and enterprise teams." },
    ];
}

export default function PricingPage() {
    return (
        <MarketingPage
            title="Pricing Built For Fast Architectural Iteration"
            subtitle="Choose a plan that matches your design pace, from early concept exploration to high-volume studio delivery."
            accent="Pricing"
            cards={[
                {
                    eyebrow: "Starter",
                    title: "Concepts on demand",
                    description: "Perfect for fast client moodboards, floor plan tests, and early-stage visual exploration.",
                    strong: "$19/mo",
                },
                {
                    eyebrow: "Studio",
                    title: "Built for daily iterations",
                    description: "More renders, cleaner organization, and a smoother review flow for active design teams.",
                    strong: "$79/mo",
                    featured: true,
                },
                {
                    eyebrow: "Scale",
                    title: "For multi-project pipelines",
                    description: "Designed for firms that need reliable volume, polished output delivery, and tighter operational control.",
                    strong: "Custom",
                },
            ]}
        />
    );
}
