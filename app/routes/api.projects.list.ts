import { listProjects } from "../../lib/server/project-store";

export async function loader() {
    try {
        const projects = await listProjects();
        return Response.json({ projects });
    } catch (error) {
        console.error("Failed to list projects", error);
        return Response.json({ error: "Failed to list projects" }, { status: 500 });
    }
}

export async function action() {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
}
