from flask import Flask, request, jsonify
from flask_cors import CORS
from pypresence import Presence
import time

app = Flask(__name__)
CORS(app)

CLIENT_ID = "1390580267613294713"
rpc = Presence(CLIENT_ID)
rpc.connect()

# Le timer commence au lancement du script
start_time = int(time.time())

def truncate(text, max_len=128):
    if text is None:
        return ""
    return text if len(text) <= max_len else text[:max_len-3] + "..."

@app.route('/update', methods=['POST'])
def update():
    data = request.json
    title = truncate(data.get('title', 'Inconnu'))
    chapter = truncate(data.get('chapter', 'Inconnu'))

    try:
        rpc.update(
            details=title,
            state=chapter,
            start=start_time,  # ⬅️ Timer persistant ici
            large_image="icon",
            large_text="SushiScan"
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'status': 'success'})

@app.route('/clear', methods=['POST'])
def clear():
    try:
        rpc.clear()
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return jsonify({'status': 'cleared'})

if __name__ == '__main__':
    print("✅ RPC Server lancé sur http://localhost:7123/")
    app.run(port=7123)
