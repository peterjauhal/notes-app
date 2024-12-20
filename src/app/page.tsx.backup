'use client';

import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import AddNoteForm from '@/components/AddNoteForm';
import NoteCard from '@/components/NoteCard';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        tags: note.tags || [], // Handle existing notes without tags
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      ...noteData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const editNote = (updatedNote: Note) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  // Get all unique tags from all notes
  const allTags = Array.from(
    new Set(notes.flatMap((note) => note.tags))
  ).sort();

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = searchQuery.toLowerCase().trim() === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every((tag) => note.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <main className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">My Notes</h1>
        <div className="space-y-4 mb-6">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          {allTags.length > 0 && (
            <TagFilter
              availableTags={allTags}
              selectedTags={selectedTags}
              onTagSelect={handleTagSelect}
            />
          )}
        </div>
        <AddNoteForm onAdd={addNote} />
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onEdit={editNote}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
