interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export default function TagFilter({
  availableTags,
  selectedTags,
  onTagSelect,
}: TagFilterProps) {
  return (
    <div className="mb-4">
      <div className="text-sm text-gray-600 mb-2">Filter by tags:</div>
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-2 py-1 text-sm rounded-full ${
              selectedTags.includes(tag)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
