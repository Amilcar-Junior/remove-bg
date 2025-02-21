from flask import Flask, request, send_file, jsonify
from rembg import remove
from PIL import Image
import io

app = Flask(__name__)

@app.route("/remove-bg", methods=["POST"])
def remove_bg():
    if "image" not in request.files:
        return jsonify({"error": "Nenhuma imagem enviada"}), 400

    file = request.files["image"]
    try:
        # Abrir e processar a imagem
        image = Image.open(file).convert("RGBA")
        output = remove(image)

        # Salvar a imagem processada em um buffer
        img_io = io.BytesIO()
        output.save(img_io, format="PNG")
        img_io.seek(0)

        print("✅ Imagem processada com sucesso!")  # Log para debug
        return send_file(img_io, mimetype="image/png")

    except Exception as e:
        print("❌ Erro ao processar a imagem:", e)  # Log detalhado
        return jsonify({"error": "Erro ao processar a imagem"}), 500

if __name__ == "__main__":
    print("🚀 Iniciando servidor Flask na porta 5000...")
    app.run(host="0.0.0.0", port=5000, debug=True)
