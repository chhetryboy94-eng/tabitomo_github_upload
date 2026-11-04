from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = str(data.get("message", "")).strip()

    if not message:
        return jsonify({"reply": "質問を入力してください。"})

    # ルールベースの回答は static/app.js にあります。
    # Flaskはチャット画面とメッセージの受け渡しを担当します。
    return jsonify({"reply": "メッセージを受け取りました。"})


if __name__ == "__main__":
    app.run(debug=True)
