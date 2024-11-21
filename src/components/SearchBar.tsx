interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search notes..."
        className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 bg-white shadow-sm"
      />
    </div>
  );
}
