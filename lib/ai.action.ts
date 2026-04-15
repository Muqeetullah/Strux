export const fetchAsDataUrl = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const generate3DView = async ({ sourceImage }: Generate3DViewParams) => {
    const dataUrl = sourceImage.startsWith('data:')
        ? sourceImage
        : await fetchAsDataUrl(sourceImage);
    const response = await fetch("/api/generate-render", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            image: dataUrl,
        }),
    });

    const payload = (await response.json()) as { image?: string; error?: string };

    if (!response.ok || !payload.image) {
        throw new Error(payload.error || "Generation failed");
    }

    const renderedImage = payload.image.startsWith("data:")
        ? payload.image
        : await fetchAsDataUrl(payload.image);

    return { renderedImage, renderedPath: undefined };
}
