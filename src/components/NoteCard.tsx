import { Note } from '@/types/note';
import { useState } from 'react';
import TagInput from './TagInput';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [editedTags, setEditedTags] = useState(note.tags);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSave = () => {
    onEdit({
      ...note,
      title: editedTitle,
      content: editedContent,
      tags: editedTags,
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
        <TagInput tags={editedTags} onTagsChange={setEditedTags} />
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
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className="text-sm text-gray-500 mt-2">
        Created: {formatDate(note.created_at)}
        {note.updated_at !== note.created_at && 
          ` • Updated: ${formatDate(note.updated_at)}`}
      </div>
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
