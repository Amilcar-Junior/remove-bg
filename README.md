# 🖼️ Removedor de Fundo - Next.js + Python (rembg)

Este é um **Removedor de Fundo de Imagens** desenvolvido com **Next.js** e **Python (Flask + rembg)**. 

✅ **Frontend** moderno usando **Next.js 15** + **shadcn/ui**  
✅ **Backend** em **Python (Flask)** para processar imagens usando **rembg**  
✅ **Upload intuitivo**, **animações fluidas** e **download da imagem sem fundo**  
✅ **Feedback ao usuário** com notificações via **Sonner**  
✅ **Compatível com imagens PNG, JPG e JPEG**  

---

## 🚀 **Tecnologias Usadas**

### **🖥️ Frontend (Next.js 15)**
- **Next.js 15 (App Router)**
- **TypeScript**
- **shadcn/ui** (UI moderna)
- **Sonner** (Notificações)
- **Framer Motion** (Animações)
- **Tailwind CSS** (Estilização)

### **⚙️ Backend (Python)**
- **Flask** (Servidor HTTP)
- **rembg** (Remoção de fundo da imagem)
- **Pillow** (Manipulação de imagens)

---

## 📂 **Estrutura do Projeto**

```
📦 remove-bg-app
├── 📂 app
│   ├── 📂 api
│   │   ├── 📜 remove-bg/route.ts  # API Next.js para processar imagens
│   ├── 📂 components
│   │   ├── 📜 ImageUploader.tsx   # Componente de upload
│   ├── 📜 layout.tsx              # Layout global
│   ├── 📜 page.tsx                # Página principal
├── 📂 public
│   ├── 📂 output                  # Onde as imagens processadas são salvas
├── 📂 server-python               # Pasta do servidor Python
│   ├── 📜 server.py                # Servidor Flask (rembg)
│   ├── 📜 requirements.txt         # Dependências Python
├── 📜 package.json                 # Dependências do Next.js
├── 📜 README.md                    # Documentação do projeto
```

---

## ⚡ **Passo a Passo para Rodar o Projeto**

### 1️⃣ **Configurar e Rodar o Servidor Python (`rembg`)**

> O backend precisa estar rodando para o Next.js processar as imagens.

#### **📥 Instalar Dependências**
```sh
cd server-python
python -m venv venv
# Ativar ambiente virtual:
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

#### **▶️ Rodar o Servidor**
```sh
python server.py
```
✅ O servidor **rodará na porta `5000`**. Se estiver tudo certo, verá a mensagem:
```
 * Running on http://127.0.0.1:5000
```

---

### 2️⃣ **Configurar e Rodar o Next.js**
Agora, no terminal, vá para a pasta do **Next.js** e instale as dependências:

```sh
cd ../remove-bg-app
npm install
```

#### **▶️ Rodar o Next.js**
```sh
npm run dev
```

✅ O frontend **rodará na porta `3000`**.  
Acesse **http://localhost:3000** no navegador.

---

## 🎯 **Como Usar**
1. **Carregue uma imagem** (PNG, JPG ou JPEG).
2. **Clique em "Remover Fundo"** e aguarde o processamento.
3. **Baixe a imagem sem fundo** clicando no botão "📥 Baixar Imagem".

---

## 💡 **Créditos**
Projeto desenvolvido por **Amílcar Júnior**.  
