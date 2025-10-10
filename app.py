from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


responses = {
    "hola": "¡Hola! 😊 ¿En qué puedo ayudarte hoy?",
    "horarios": "Nuestro horario de atención es de lunes a viernes, de 9 a 6.",
    "ubicacion": "Estamos ubicados en Ciudad de México, pero atendemos en todo el país.",
    "contacto": "Puedes contactarnos al correo soporte@empresa.com",
}

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/chat', methods = ["POST"])
def chat():
    user_msg = request.json.get("message").lower()
    response = "No entendí bien tu pregunta 🤔. ¿Podrías reformularla?"

    for key, value in responses.items():
        if key in user_msg:
            response = value
            break
        
    
    return jsonify({"reply": response})

if __name__ == "__main__":
    app.run(debug=True)
