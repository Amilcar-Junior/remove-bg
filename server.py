from flask import Flask, request, send_file
from rembg import remove
from PIL import Image
import io

app = Flask(__name__)

@app.route("/remove-bg", methods=["POST"])
def remove_bg():
    if "image" not in request.files:
        return {"error": "Nenhuma imagem enviada"}, 400

    file = request.files["image"]
    try:
        image = Image.open(file).convert("RGBA")

        # Processar a imagem com rembg
        output = remove(image)

        # Salvar a imagem processada em um buffer
        img_io = io.BytesIO()
        output.save(img_io, format="PNG")
        img_io.seek(0)

        return send_file(img_io, mimetype="image/png")
    
    except Exception as e:
        print("Erro ao processar a imagem:", e)
        return {"error": "Erro ao processar a imagem"}, 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
