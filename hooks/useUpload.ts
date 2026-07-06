import { useState } from "react";

const useUpload = (onSuccess: (url: string) => void) => {
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)

   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.url);
    onSuccess(data.url)
    setLoading(false);
  };

  return {
    imageUrl,
    loading,
    handleUpload
  }
}

export default useUpload
