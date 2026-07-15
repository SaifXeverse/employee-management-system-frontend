import { useState } from "react";

const useUpload = (onSuccess: (url: string, publicId: string) => void) => {
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      setImageUrl(data.url);
      setPublicId(data.publicId);
      onSuccess(data.url, data.publicId);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (overridePublicId?: string) => {
    const idToDelete = overridePublicId || publicId;
    if (!publicId) return;

    setLoading(true);
    try {
      const res = await fetch("/api/uploadImage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: idToDelete }),
      });

      if (res.ok) {
        setImageUrl("");
        setPublicId("");
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { imageUrl, publicId, loading, handleUpload, handleDelete };
};

export default useUpload;
