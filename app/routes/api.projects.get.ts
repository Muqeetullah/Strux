import { getProject } from "../../lib/server/project-store";

export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
        return Response.json({ error: "Project id is required" }, { status: 400 });
    }

    try {
        const project = await getProject(id);
        return Response.json({ project });
    } catch (error) {
        console.error("Failed to get project", error);
        return Response.json({ error: "Failed to get project" }, { status: 500 });
    }
}

export async function action() {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
}
