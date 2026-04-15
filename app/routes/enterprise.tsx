import type { Route } from "./+types/enterprise";
import MarketingPage from "../../components/MarketingPage";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Enterprise | Strux" },
        { name: "description", content: "Enterprise collaboration, governance, and rollout support for Strux." },
    ];
}

export default function EnterprisePage() {
    return (
        <MarketingPage
            title="Enterprise Workflows With Stronger Consistency"
            subtitle="Built for firms that need brand control, team-wide alignment, and a smoother path from concept review to stakeholder-ready presentation."
            accent="Enterprise"
            cards={[
                {
                    eyebrow: "Governance",
                    title: "Shared standards across teams",
                    description: "Keep outputs aligned with your firm’s visual language, review process, and presentation quality expectations.",
                },
                {
                    eyebrow: "Workflow",
                    title: "Faster collaboration from plan to pitch",
                    description: "Centralize reviews, compare iterations, and package visualizations for stakeholders in a cleaner workflow.",
                    featured: true,
                },
                {
                    eyebrow: "Support",
                    title: "White-glove rollout",
                    description: "Get onboarding help, integration guidance, and a more tailored setup for high-volume design organizations.",
                },
            ]}
        />
    );
}
