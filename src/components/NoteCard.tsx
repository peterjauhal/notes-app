import { Note } from '@/types/note';
import { useState } from 'react';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = () => {
    onEdit({
      ...note,
      title: editedTitle,
      content: editedContent,
      updatedAt: new Date(),
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full mb-2 text-lg font-semibold border-b focus:outline-none focus:border-blue-500"
        />
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full h-32 p-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 text-sm text-gray-600 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="mb-2 text-lg font-semibold">{note.title}</h3>
      <p className="mb-4 text-gray-600">{note.content}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-50"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="px-3 py-1 text-sm text-red-500 border border-red-500 rounded hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
