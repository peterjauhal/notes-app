import { useState } from 'react';
import { Note } from '@/types/note';

interface AddNoteFormProps {
  onAdd: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export default function AddNoteForm({ onAdd }: AddNoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAdd({
      title: title.trim(),
      content: content.trim(),
    });

    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-6 bg-white rounded-lg shadow-md">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note Content"
        className="w-full h-32 p-2 mb-4 border rounded focus:outline-none focus:border-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Add Note
      </button>
    </form>
  );
}