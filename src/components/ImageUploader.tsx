"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner"; // Corrigido para usar Sonner
import { motion } from "framer-motion";

export default function ImageUploader() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setOutputImage(null);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("/api/remove-bg", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const outputURL = URL.createObjectURL(blob);
      setOutputImage(outputURL);
      toast.success("Imagem processada com sucesso! 🎉");
    } else {
      toast.error("Erro ao processar imagem 😢");
    }

    setLoading(false);
  };

  const handleDownload = () => {
    if (!outputImage) return;
    const link = document.createElement("a");
    link.href = outputImage;
    link.download = "imagem_sem_fundo.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h2 className="text-3xl font-bold text-center">🖼️ Removedor de Fundo</h2>

      <motion.div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full max-w-lg text-center cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput" />
        <label htmlFor="fileInput" className="cursor-pointer text-gray-500 text-lg">
          📂 Arraste e solte ou clique para selecionar uma imagem
        </label>
      </motion.div>

      {preview && (
        <motion.div className="relative w-64 h-64 border rounded-lg overflow-hidden shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Image src={preview} alt="Preview" layout="fill" objectFit="cover" />
        </motion.div>
      )}

      <Button onClick={handleUpload} disabled={!image || loading} className="w-full max-w-sm" variant="default">
        {loading ? "Processando..." : "Remover Fundo 🚀"}
      </Button>

      {loading && <Progress value={50} className="w-full max-w-sm" />}

      {outputImage && (
        <Card className="p-4 mt-4 max-w-sm">
          <CardContent>
            <motion.div className="relative w-64 h-64 border rounded-lg overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Image src={outputImage} alt="Resultado" layout="fill" objectFit="cover" />
            </motion.div>
            <Button onClick={handleDownload} className="mt-4 w-full" variant="outline">
              📥 Baixar Imagem
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
