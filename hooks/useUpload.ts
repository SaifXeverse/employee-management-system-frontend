import { ChangeEvent, useState } from "react";
import axios from "axios";

const useUpload = (onSuccess: (url: string, publicId: string) => void) => {
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("/api/upload", formData);

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

    if (!idToDelete) return;

    setLoading(true);

    try {
      await axios.delete("/api/upload", {
        data: {
          publicId: idToDelete,
          resourceType: "image",
        },
      });

      setImageUrl("");
      setPublicId("");
    } catch (error) {
      // console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    imageUrl,
    publicId,
    loading,
    handleUpload,
    handleDelete,
  };
};

export default useUpload;
