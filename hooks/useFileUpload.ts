import { ChangeEvent, useState } from "react";

const useFileUpload = (onSuccess?: (url: string, publicId: string) => void) => {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [publicId, setPublicId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

 const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return null;

  setLoading(true);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();

    setFileUrl(data.url);
    setPublicId(data.publicId);

    onSuccess?.(data.url, data.publicId);
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  } finally {
    setLoading(false);
  }
};
  const handleDelete = async (overridePublicId?: string) => {
    const idToDelete = overridePublicId || publicId;

    if (!idToDelete) {
      console.log("No publicId provided for deletion");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: idToDelete }),
      });
      
       if (!res.ok) throw new Error("Resume delete failed");
      

      if (res.ok) {
        if (idToDelete === publicId) {
          setFileUrl("");
          setPublicId("");
        }
      }
    } catch (error) {
      console.error("Delete error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { fileUrl, publicId, loading, handleUpload, handleDelete };
};
export default useFileUpload;
