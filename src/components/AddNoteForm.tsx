import { useState } from 'react';
import { Note } from '@/types/note';
import TagInput from './TagInput';

type AddNoteFormProps = {
  onAdd: (note: Omit<Note, 'id' | 'created_at' | 'updated_at'>) => void;
}

export default function AddNoteForm({ onAdd }: AddNoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAdd({
      title: title.trim(),
      content: content.trim(),
      tags,
    });

    setTitle('');
    setContent('');
    setTags([]);
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
      <TagInput tags={tags} onTagsChange={setTags} />
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Add Note
      </button>
    </form>
  );
}
