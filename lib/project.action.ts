import { getFeaturedProjectById } from "./featured-projects";

export const createProject = async ({ item }: CreateProjectParams): Promise<DesignItem | null> => {
    try {
        const response = await fetch("/api/projects/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                project: item,
            }),
        });

        if (!response.ok) {
            console.error("Failed to save the project", await response.text());
            return null;
        }

        const data = (await response.json()) as { project?: DesignItem | null };
        return data?.project ?? null;
    } catch (error) {
        console.error("Failed to save project", error);
        return null;
    }
};

export const getProjects = async () => {
    try {
        const response = await fetch("/api/projects/list");

        if (!response.ok) {
            console.error("Failed to fetch projects", await response.text());
            return [];
        }

        const data = (await response.json()) as { projects?: DesignItem[] | null };
        return Array.isArray(data?.projects) ? data.projects : [];
    } catch (error) {
        console.error("Failed to get projects", error);
        return [];
    }
};

export const getProjectById = async ({ id }: { id: string }) => {
    try {
        const response = await fetch(`/api/projects/get?id=${encodeURIComponent(id)}`);

        if (!response.ok) {
            console.error("Failed to fetch project", await response.text());
            return null;
        }

        const data = (await response.json()) as { project?: DesignItem | null };
        return data?.project ?? getFeaturedProjectById(id);
    } catch (error) {
        console.error("Failed to fetch project", error);
        return getFeaturedProjectById(id);
    }
};
