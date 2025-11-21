// File: mini-notepad.js

const noteTitle = document.getElementById("noteTitle");
const noteTopic = document.getElementById("noteTopic");
const noteDescription = document.getElementById("noteDescription");
const savedNotesDiv = document.getElementById("savedNotes");
const btnSave = document.getElementById("btnSave");
const btnClear = document.getElementById("btnClear");

const NOTES_KEY = "miniNotes";

// Initialize: load saved notes
function init() {
  renderNotes();
}

// Render all saved notes
function renderNotes() {
  const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
  savedNotesDiv.innerHTML = notes
    .map((note, i) => {
      return `
<div class="note-card bg-white p-4  rounded-lg shadow " data-index="${i}">
  <div class="">
    <div class="text-black mt-1 "><strong>Title : </strong><p style="opacity:0.6; font-style:italic; display:inline-block;">${escapeHtml(
      note.title
    )}</p></div>
    <div class="text-sm text-black mt-1" ><strong  style="margin-right:3px;">Topic:</strong><p style="opacity:0.6; font-style:italic; display:inline-block;"> ${escapeHtml(
      note.topic
    )} </p></div>
    <div class="text-sm text-black mt-1"><strong style="margin-right:3px;">Description :</strong><p style="opacity:0.6; font-style:italic; display:inline-block;"> ${escapeHtml(
      note.description
    )}</p></div>
  </div>
  <div class="mt-3  gap-1 md:gap-2">
    <button class="edit bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs" onclick="editNote(${i})">Edit</button>
    <button class="delete bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs" onclick="deleteNote(${i})">Delete</button>
  </div>
</div>
`;
    })
    .join("");
}

// Escape HTML to prevent injection
function escapeHtml(text) {
  return (text + "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Save new note
function saveNote() {
  const title = noteTitle.value.trim();
  const topic = noteTopic.value.trim();
  const description = noteDescription.value.trim();

  if (!title && !topic && !description)
    return alert("Cannot save an empty note.");

  const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
  notes.push({ title, topic, description });
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));

  noteTitle.value = "";
  noteTopic.value = "";
  noteDescription.value = "";

  renderNotes();
}

// Clear all fields
function clearFields() {
  noteTitle.value = "";
  noteTopic.value = "";
  noteDescription.value = "";
}

// Delete note
function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
  if (index < 0 || index >= notes.length) return;
  notes.splice(index, 1);
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  renderNotes();
}

// Edit note
function editNote(index) {
  const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
  if (index < 0 || index >= notes.length) return;
  const note = notes[index];

  noteTitle.value = note.title;
  noteTopic.value = note.topic;
  noteDescription.value = note.description;

  notes.splice(index, 1);
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  renderNotes();
}

// Event listeners
btnSave.addEventListener("click", saveNote);
btnClear.addEventListener("click", clearFields);

// Make functions globally accessible
window.deleteNote = deleteNote;
window.editNote = editNote;

// Initialize on page load
init();
