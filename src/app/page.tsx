'use client';

import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import { supabase } from '@/lib/supabase';
import AddNoteForm from '@/components/AddNoteForm';
import NoteCard from '@/components/NoteCard';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setNotes(data.map((note: any) => ({
        ...note,
        createdAt: new Date(note.created_at),
        updatedAt: new Date(note.updated_at),
      })));
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addNote = async (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([{
          title: noteData.title,
          content: noteData.content,
          tags: noteData.tags,
        }])
        .select()
        .single();

      if (error) throw error;

      setNotes(prev => [{
        ...data,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      }, ...prev]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const editNote = async (updatedNote: Note) => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({
          title: updatedNote.title,
          content: updatedNote.content,
          tags: updatedNote.tags,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updatedNote.id);

      if (error) throw error;

      setNotes(prev => prev.map(note => 
        note.id === updatedNote.id 
          ? { ...updatedNote, updatedAt: new Date() }
          : note
      ));
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const allTags = Array.from(
    new Set(notes.flatMap(note => note.tags))
  ).sort();

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchQuery.toLowerCase().trim() === '' ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every(tag => note.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <p>Loading notes...</p>
    </div>;
  }

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
          {filteredNotes.map(note => (
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
