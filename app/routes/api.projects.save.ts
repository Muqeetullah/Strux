import { type ActionFunctionArgs } from "react-router";
import { saveProject } from "../../lib/server/project-store";

export async function action({ request }: ActionFunctionArgs) {
    if (request.method !== "POST") {
        return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    try {
        const { project } = (await request.json()) as { project?: DesignItem };

        if (!project?.id || !project.sourceImage) {
            return Response.json({ error: "Invalid project payload" }, { status: 400 });
        }

        const savedProject = await saveProject(project);

        return Response.json({ project: savedProject });
    } catch (error) {
        console.error("Failed to save project", error);
        return Response.json({ error: "Failed to save project" }, { status: 500 });
    }
}

export async function loader() {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
}
