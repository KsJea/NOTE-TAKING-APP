// script.js

// Función para crear una nota
function createNote() {
  // Obtiene el título y el contenido de la nota desde los campos de texto
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  
  // Crea un objeto nota con título, contenido y un ID único generado con Date.now()
  const note = { title, content, id: Date.now() };
  
  // Agrega la nota a la base de datos
  addNoteToDatabase(note);
  
  // Limpia los campos de texto para que el usuario pueda crear una nueva nota
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
}

// Función para agregar una nota a la base de datos
function addNoteToDatabase(note) {
  // Obtiene la lista de notas existentes en la base de datos
  const notes = getNotesFromDatabase();
  
  // Agrega la nueva nota a la lista
  notes.push(note);
  
  // Guarda la lista actualizada en el almacenamiento local como una cadena JSON
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Función para obtener las notas de la base de datos
function getNotesFromDatabase() {
  // Obtiene la cadena JSON de la base de datos
  const notes = localStorage.getItem('notes');
  
  // Si hay notas en la base de datos, las devuelve como un array
  if (notes) {
    return JSON.parse(notes);
  } else {
    // Si no hay notas, devuelve un array vacío
    return [];
  }
}

// Función para mostrar las notas en la lista
function showNotes() {
  // Obtiene la lista de notas de la base de datos
  const notes = getNotesFromDatabase();
  
  // Obtiene el elemento ul que contiene la lista de notas
  const noteListUl = document.getElementById('note-list-ul');
  
  // Limpia la lista para que no se dupliquen las notas
  noteListUl.innerHTML = '';
  
  // Itera sobre la lista de notas y crea un elemento li para cada una
  notes.forEach((note) => {
    const noteLi = document.createElement('li');
    noteLi.textContent = note.title;
    noteLi.dataset.noteId = note.id;
    noteListUl.appendChild(noteLi);
  });
}

// Función para mostrar el modal de edición
function showEditModal() {
  // Obtiene el elemento modal de edición
  const editModal = document.getElementById('edit-note-modal');
  
  // Muestra el modal
  editModal.style.display = 'block';
  
  // Obtiene los campos de texto para editar la nota
  const editTitleInput = document.getElementById('edit-title');
  const editContentInput = document.getElementById('edit-content');
  
  // Obtiene el ID de la nota que se va a editar
  const noteId = editTitleInput.dataset.noteId;
  
  // Obtiene la nota correspondiente desde la base de datos
  const note = getNoteFromDatabase(noteId);
  
  // Rellena los campos de texto con los valores de la nota
  editTitleInput.value = note.title;
  editContentInput.value = note.content;
}

// Función para guardar los cambios en la nota
function saveNoteChanges() {
  // Obtiene los campos de texto para editar la nota
  const editTitleInput = document.getElementById('edit-title');
  const editContentInput = document.getElementById('edit-content');
  
  // Obtiene el ID de la nota que se va a editar
  const noteId = editTitleInput.dataset.noteId;
  
  // Obtiene la nota correspondiente desde la base de datos
  const note = getNoteFromDatabase(noteId);
  
  // Actualiza los valores de la nota con los nuevos valores de los campos de texto
  note.title = editTitleInput.value;
  note.content = editContentInput.value;
  
  // Actualiza la nota en la base de datos
  updateNoteInDatabase(note);
  
  // Oculta el modal de edición
  document.getElementById('edit-note-modal').style.display = 'none';
  
  // Muestra la lista de notas actualizada
  showNotes();
}

// Función para eliminar una nota
function deleteNote() {
  // Obtiene el ID de la nota que se va a eliminar
  const noteId = document.getElementById('edit-title').dataset.noteId;
  
  // Elimina la nota de la base de datos
  deleteNoteFromDatabase(noteId);
  
  // Oculta el modal de edición
  document.getElementById('edit-note-modal').style.display = 'none';
  
   // Muestra la lista de notas actualizada
 showNotes();
}

// Función para obtener una nota de la base de datos
function getNoteFromDatabase(noteId) {
  // Obtiene la lista de notas de la base de datos
  const notes = getNotesFromDatabase();
  
  // Busca la nota con el ID especificado y la devuelve
  return notes.find((note) => note.id === parseInt(noteId));
}

// Función para actualizar una nota en la base de datos
function updateNoteInDatabase(note) {
  // Obtiene la lista de notas de la base de datos
  const notes = getNotesFromDatabase();
  
  // Busca la nota con el ID especificado y la actualiza
  const index = notes.findIndex((n) => n.id === note.id);
  notes[index] = note;
  
  // Guarda la lista actualizada en el almacenamiento local como una cadena JSON
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Función para eliminar una nota de la base de datos
function deleteNoteFromDatabase(noteId) {
  // Obtiene la lista de notas de la base de datos
  const notes = getNotesFromDatabase();
  
  // Busca la nota con el ID especificado y la elimina
  const index = notes.findIndex((note) => note.id === parseInt(noteId));
  notes.splice(index, 1);
  
  // Guarda la lista actualizada en el almacenamiento local como una cadena JSON
  localStorage.setItem('notes', JSON.stringify(notes));
}