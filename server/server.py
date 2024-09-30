# Se importa la biblioteca de Flask
from flask import Flask, request, jsonify, send_from_directory

# Se crea una aplicación de Flask
app = Flask(__name__)

# Se define la ruta para crear una nota
@app.route('/create-note', methods=['POST'])
def create_note():
  # Se obtiene el título y el contenido de la nota desde la solicitud
  title = request.json['title']
  content = request.json['content']
  # Se agrega la nota al archivo de notas
  with open('notes.json', 'r+') as file:
    notes = json.load(file)
    notes[title] = content
    file.seek(0)
    json.dump(notes, file)
    file.truncate()
  # Se devuelve una respuesta exitosa
  return jsonify({'message': 'Nota creada con éxito!'})

# Se define la ruta para leer las notas
@app.route('/read-notes', methods=['GET'])
def read_notes():
  # Se lee el archivo de notas
  with open('notes.json', 'r') as file:
    notes = json.load(file)
  # Se devuelve la lista de notas
  return jsonify(notes)

# Se define la ruta para actualizar una nota
@app.route('/update-note', methods=['PUT'])
def update_note():
  # Se obtiene el título y el contenido de la nota desde la solicitud
  title = request.json['title']
  content = request.json['content']
  # Se actualiza la nota en el archivo de notas
  with open('notes.json', 'r+') as file:
    notes = json.load(file)
    notes[title] = content
    file.seek(0)
    json.dump(notes, file)
    file.truncate()
  # Se devuelve una respuesta exitosa
  return jsonify({'message': 'Nota actualizada con éxito!'})

# Se define la ruta para eliminar una nota
@app.route('/delete-note', methods=['DELETE'])
def delete_note():
  # Se obtiene el título de la nota desde la solicitud
  title = request.json['title']
  # Se elimina la nota del archivo de notas
  with open('notes.json', 'r+') as file:
    notes = json.load(file)
    del notes[title]
    file.seek(0)
    json.dump(notes, file)
    file.truncate()
  # Se devuelve una respuesta exitosa
  return jsonify({'message': 'Nota eliminada con éxito!'})

# Se define la ruta para servir archivos estáticos desde la carpeta client

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('.', path)

# Se ejecuta la aplicación de Flask
if __name__ == '__main__':
  app.run(debug=True, port=8080)