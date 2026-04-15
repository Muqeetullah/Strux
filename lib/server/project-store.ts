import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), ".data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "projects");

const ensureDir = async (dirPath: string) => {
    await mkdir(dirPath, { recursive: true });
};

const ensureStorage = async () => {
    await Promise.all([ensureDir(DATA_DIR), ensureDir(UPLOADS_DIR)]);
};

const parseProjects = async (): Promise<DesignItem[]> => {
    await ensureStorage();

    try {
        const content = await readFile(PROJECTS_FILE, "utf8");
        const parsed = JSON.parse(content) as DesignItem[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const writeProjects = async (projects: DesignItem[]) => {
    await ensureStorage();
    await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf8");
};

const getDataUrlParts = (value: string) => {
    const match = value.match(/^data:(.+);base64,(.+)$/);

    if (!match) return null;

    return {
        contentType: match[1],
        buffer: Buffer.from(match[2], "base64"),
    };
};

const getExtension = (contentType: string, input: string) => {
    const typeMatch = contentType.match(/image\/(png|jpe?g|webp|gif|svg\+xml|svg)/i);

    if (typeMatch?.[1]) {
        const ext = typeMatch[1].toLowerCase();
        return ext === "jpeg" ? "jpg" : ext === "svg+xml" ? "svg" : ext;
    }

    const urlMatch = input.match(/\.([a-z0-9]+)(?:$|[?#])/i);
    return urlMatch?.[1]?.toLowerCase() || "png";
};

const storeImage = async ({
    input,
    projectId,
    label,
}: {
    input: string;
    projectId: string;
    label: "source" | "rendered";
}) => {
    if (!input) return null;
    if (input.startsWith("/uploads/")) return input;

    let contentType = "";
    let buffer: Buffer | null = null;

    const dataUrl = getDataUrlParts(input);

    if (dataUrl) {
        contentType = dataUrl.contentType;
        buffer = dataUrl.buffer;
    } else {
        const response = await fetch(input);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        contentType = response.headers.get("content-type") || "";
        buffer = Buffer.from(await response.arrayBuffer());
    }

    const ext = getExtension(contentType, input);
    const projectDir = path.join(UPLOADS_DIR, projectId);
    const fileName = `${label}.${ext}`;
    const filePath = path.join(projectDir, fileName);

    await ensureDir(projectDir);
    await writeFile(filePath, buffer);

    return `/uploads/projects/${projectId}/${fileName}`;
};

export const listProjects = async () => {
    const projects = await parseProjects();

    return projects.sort((a, b) => b.timestamp - a.timestamp);
};

export const getProject = async (id: string) => {
    const projects = await parseProjects();
    return projects.find((project) => project.id === id) || null;
};

export const saveProject = async (project: DesignItem) => {
    const projects = await parseProjects();

    const storedProject: DesignItem = {
        ...project,
        ownerId: project.ownerId ?? "local-user",
        sourceImage: await storeImage({
            input: project.sourceImage,
            projectId: project.id,
            label: "source",
        }) || project.sourceImage,
        renderedImage: project.renderedImage
            ? await storeImage({
                input: project.renderedImage,
                projectId: project.id,
                label: "rendered",
            }) || project.renderedImage
            : null,
    };

    const nextProjects = projects.filter(({ id }) => id !== storedProject.id);
    nextProjects.unshift(storedProject);

    await writeProjects(nextProjects);

    return storedProject;
};
