import {useCallback, useEffect, useState} from 'react'
import {useOutletContext} from "react-router";
import {AlertCircle, CheckCircle2, ImageIcon, LoaderCircle, Sparkles, UploadIcon} from "lucide-react";
import {generate3DView} from "../lib/ai.action";
import Button from "./ui/Button";

const Upload = ({ onComplete }: UploadProps) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { isSignedIn } = useOutletContext<AuthContext>();

    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const fileToBase64 = useCallback((file: File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
    }), []);

    const processFile = useCallback((file: File) => {
        if (!isSignedIn) return;

        setPreviewImage((currentPreview) => {
            if (currentPreview) {
                URL.revokeObjectURL(currentPreview);
            }

            return URL.createObjectURL(file);
        });
        setUploadedFile(file);
        setGeneratedImage(null);
        setError(null);
    }, [isSignedIn]);

    const handleGenerate = useCallback(async () => {
        if (!uploadedFile || loading) return;

        try {
            setLoading(true);
            setError(null);
            setGeneratedImage(null);

            const sourceImage = await fileToBase64(uploadedFile);
            const result = await generate3DView({ sourceImage });

            if (!result.renderedImage) {
                throw new Error("No render was returned");
            }

            setGeneratedImage(result.renderedImage);
            await onComplete?.({
                sourceImage,
                renderedImage: result.renderedImage,
            });
        } catch (generationError) {
            console.error(generationError);
            setError(
                generationError instanceof Error
                    ? generationError.message
                    : "We couldn't generate a render right now. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    }, [fileToBase64, loading, onComplete, uploadedFile]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!isSignedIn) return;
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (!isSignedIn) return;

        const droppedFile = e.dataTransfer.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (droppedFile && allowedTypes.includes(droppedFile.type)) {
            processFile(droppedFile);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isSignedIn) return;

        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };

    return (
        <div className="upload">
            {!uploadedFile ? (
                <div
                    className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        className="drop-input"
                        accept=".jpg,.jpeg,.png,.webp"
                        disabled={!isSignedIn}
                        onChange={handleChange}
                    />

                    <div className="drop-content">
                        <div className="drop-icon">
                            <UploadIcon size={20} />
                        </div>
                        <p>
                            {isSignedIn ? (
                                "Click to upload or just drag and drop"
                            ): ("Uploads are currently unavailable")}
                        </p>
                        <p className="help">Maximum file size 50 MB.</p>
                    </div>
                </div>
            ) : (
                <div className="upload-flow">
                    <div className="upload-status">
                        <div className="status-content">
                            {previewImage && (
                                <div className="selected-preview">
                                    <img
                                        src={previewImage}
                                        alt="Uploaded floor plan preview"
                                        className="selected-preview-image"
                                    />
                                </div>
                            )}

                            <div className="status-icon">
                                {generatedImage ? (
                                    <CheckCircle2 className="check" />
                                ): loading ? (
                                    <LoaderCircle className="spinner" />
                                ) : (
                                    <ImageIcon className="image" />
                                )}
                            </div>

                            <h3>{uploadedFile.name}</h3>

                            <p className="status-text">
                                {loading
                                    ? 'Generating photorealistic render...'
                                    : generatedImage
                                        ? 'Render ready'
                                        : 'Floor plan ready for generation'}
                            </p>

                            <div className="status-actions">
                                <Button
                                    type="button"
                                    size="md"
                                    onClick={handleGenerate}
                                    disabled={loading}
                                    className="generate-btn"
                                >
                                    {loading ? (
                                        <>
                                            <LoaderCircle className="w-4 h-4 animate-spin" /> Generating
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" /> Generate Render
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="upload-error" role="alert">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    {generatedImage && (
                        <div className="generated-result fade-in">
                            <img src={generatedImage} alt="Generated architectural render" className="generated-image" />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
export default Upload
