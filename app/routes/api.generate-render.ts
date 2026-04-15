import { type ActionFunctionArgs } from "react-router";
import { STRUX_RENDER_PROMPT } from "../../lib/constants";

const GEMINI_IMAGE_MODEL = "gemini-2.0-flash-preview-image-generation";

const parseDataUrl = (dataUrl: string) => {
    const match = dataUrl.match(/^data:(.+);base64,(.+)$/);

    if (!match) {
        throw new Error("Invalid base64 image payload");
    }

    return {
        mimeType: match[1],
        data: match[2],
    };
};

const extractGeneratedImage = (payload: unknown): string | null => {
    if (!payload || typeof payload !== "object" || !("candidates" in payload)) {
        return null;
    }

    const candidates = payload.candidates;

    if (!Array.isArray(candidates)) {
        return null;
    }

    for (const candidate of candidates) {
        if (!candidate || typeof candidate !== "object" || !("content" in candidate)) {
            continue;
        }

        const content = candidate.content;
        if (!content || typeof content !== "object" || !("parts" in content)) {
            continue;
        }

        const parts = content.parts;
        if (!Array.isArray(parts)) {
            continue;
        }

        for (const part of parts) {
            if (
                part &&
                typeof part === "object" &&
                "inlineData" in part &&
                part.inlineData &&
                typeof part.inlineData === "object" &&
                "data" in part.inlineData &&
                typeof part.inlineData.data === "string"
            ) {
                const mimeType =
                    "mimeType" in part.inlineData && typeof part.inlineData.mimeType === "string"
                        ? part.inlineData.mimeType
                        : "image/png";
                return `data:${mimeType};base64,${part.inlineData.data}`;
            }
        }
    }

    return null;
};

const extractGeminiError = (payload: unknown) => {
    if (!payload || typeof payload !== "object" || !("error" in payload)) {
        return null;
    }

    const apiError = payload.error;

    if (!apiError || typeof apiError !== "object") {
        return null;
    }

    const message = "message" in apiError && typeof apiError.message === "string"
        ? apiError.message
        : "Generation failed";
    const status = "status" in apiError && typeof apiError.status === "string"
        ? apiError.status
        : "";

    return { message, status };
};

export async function action({ request }: ActionFunctionArgs) {
    if (request.method !== "POST") {
        return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
    if (!geminiApiKey) {
        return Response.json(
            { error: "Missing GEMINI_API_KEY" },
            { status: 500 },
        );
    }

    try {
        const { image } = (await request.json()) as { image?: string };

        if (!image) {
            return Response.json({ error: "Image is required" }, { status: 400 });
        }

        const { mimeType, data } = parseDataUrl(image);

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_IMAGE_MODEL}:generateContent`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": geminiApiKey,
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: STRUX_RENDER_PROMPT },
                            {
                                inlineData: {
                                    mimeType,
                                    data,
                                },
                            },
                        ],
                    }],
                    generationConfig: {
                        responseModalities: ["TEXT", "IMAGE"],
                    },
                }),
            },
        );

        const payload = await response.json();
        const apiError = extractGeminiError(payload);

        if (!response.ok) {
            const quotaReached =
                response.status === 429 ||
                apiError?.status === "RESOURCE_EXHAUSTED" ||
                apiError?.status === "RATE_LIMIT_EXCEEDED" ||
                apiError?.message.toLowerCase().includes("quota") ||
                apiError?.message.toLowerCase().includes("rate limit");

            return Response.json(
                {
                    error: quotaReached
                        ? "Today's free Gemini image generation limit has been reached. Please try again later."
                        : (apiError?.message || "Generation failed"),
                },
                { status: quotaReached ? 429 : response.status || 500 },
            );
        }

        const generatedImage = extractGeneratedImage(payload);

        if (!generatedImage) {
            return Response.json(
                {
                    error: "Gemini did not return an image. This preview model may be temporarily unavailable.",
                },
                { status: 502 },
            );
        }

        return Response.json({ image: generatedImage });
    } catch (error) {
        console.error("Gemini generation failed", error);
        return Response.json({ error: "Generation failed" }, { status: 500 });
    }
}

export async function loader() {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
}
