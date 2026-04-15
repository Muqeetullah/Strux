export const FEATURED_PROJECTS: DesignItem[] = [
    {
        id: "featured-floor",
        name: "Modern Floor Plan",
        description:
            "A clean residential floor plan transformed into a bright presentation-ready visualization with stronger materials, clearer zones, and a polished architectural look.",
        sourceImage: "/uploads/assets/floor.webp",
        renderedImage: "/uploads/assets/floor-gen.png",
        timestamp: Date.now(),
        sharedBy: "Strux Demo",
    },
    {
        id: "featured-apartment",
        name: "Apartment Layout",
        description:
            "A compact apartment scheme turned into a more legible, furnished render that shows how the flat geometry translates into a refined top-down concept.",
        sourceImage: "/uploads/assets/apartment.webp",
        renderedImage: "/uploads/assets/apart-gen.png",
        timestamp: Date.now() - 86_400_000,
        sharedBy: "Strux Demo",
    },
    {
        id: "featured-room",
        name: "Residential Room Plan",
        description:
            "A room-focused transformation sample with cleaner textures, improved lighting balance, and stronger visual hierarchy between structural and furnished elements.",
        sourceImage: "/uploads/assets/room.jpeg",
        renderedImage: "/uploads/assets/room-gen.png",
        timestamp: Date.now() - 172_800_000,
        sharedBy: "Strux Demo",
    },
];

export const getFeaturedProjectById = (id: string) =>
    FEATURED_PROJECTS.find((project) => project.id === id) || null;
