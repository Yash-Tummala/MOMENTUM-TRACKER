import { useState } from "react";
import { motion } from "framer-motion";
import SectionCard from "../../components/Common/SectionCard";
import { useApp } from "../../context/useApp";
import { pageTransition } from "../../animations/presets";
import "./Notes.css";

function Notes() {
  const { appState, uiState, setSearch, addNote, updateNote, deleteNote } = useApp();
  const [form, setForm] = useState({ title: "", content: "", color: "#8b5cf6", pinned: false });

  const filteredNotes = appState.notes.filter((note) => {
    const query = uiState.search.toLowerCase();
    return note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query);
  });

  const submitNote = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      return;
    }

    addNote({
      title: form.title.trim(),
      content: form.content.trim(),
      color: form.color,
      pinned: form.pinned,
    });
    setForm({ title: "", content: "", color: "#8b5cf6", pinned: false });
  };

  return (
    <motion.div className="notes-page" {...pageTransition}>
      <SectionCard title="Notes" subtitle="Capture fleeting ideas before they vanish">
        <div className="notes-toolbar">
          <input value={uiState.search} onChange={(event) => setSearch(event.target.value)} placeholder="Search notes" />
          <span className="pill">{appState.notes.length} notes</span>
        </div>
        <form className="note-form" onSubmit={submitNote}>
          <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Title" />
          <textarea value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} placeholder="Capture your idea" rows={4} />
          <div className="note-form__controls">
            <input type="color" value={form.color} onChange={(event) => setForm((current) => ({ ...current, color: event.target.value }))} />
            <label>
              <input type="checkbox" checked={form.pinned} onChange={(event) => setForm((current) => ({ ...current, pinned: event.target.checked }))} />
              Pin note
            </label>
            <button className="button button--primary" type="submit">Add note</button>
          </div>
        </form>
      </SectionCard>

      <div className="note-list">
        {filteredNotes.map((note) => (
          <div key={note.id} className="note-card" style={{ borderColor: `${note.color}44` }}>
            <div className="note-card__header">
              <strong>{note.title}</strong>
              <div className="note-card__actions">
                <button onClick={() => updateNote(note.id, { pinned: !note.pinned })}>{note.pinned ? "Unpin" : "Pin"}</button>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            </div>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Notes;
