import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "Nenhuma imagem enviada" }, { status: 400 });
    }

    // Criar um FormData para enviar ao servidor Python
    const formData = new FormData();
    formData.append("image", file);

    // Enviar para o servidor `rembg` rodando no Python
    const response = await fetch("http://127.0.0.1:5000/remove-bg", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro do servidor Python:", errorText);
      return NextResponse.json({ error: "Erro ao remover fundo" }, { status: 500 });
    }

    // Receber a imagem processada e retornar ao frontend
    const outputBuffer = await response.arrayBuffer();
    return new Response(Buffer.from(outputBuffer), { headers: { "Content-Type": "image/png" } });
  } catch (error) {
    console.error("Erro na API Next.js:", error);
    return NextResponse.json({ error: "Erro no processamento" }, { status: 500 });
  }
}
