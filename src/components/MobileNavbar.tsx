"use client";
import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Suggestion {
  id: string;
  title: string;
  featuredImage: string;
  slug: string;
}

const MobileNavbarSearch = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  // Fetch live suggestions from backend
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        fetch(
          `${
            process.env.NEXT_PUBLIC_SERVER_URL
          }/api/products/suggestions?q=${encodeURIComponent(search)}`
        )
          .then((res) => res.json())
          .then((data) => {
            setSuggestions(data);
            setShowDropdown(true);
          });
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setShowDropdown(false);
    }
  };

  return (
    <div className="block sm:hidden bg-white/95 border-t border-gray-100 px-4 py-2 w-full absolute top-full z-40 shadow-sm">
      <form
        onSubmit={handleSearch}
        className="flex items-stretch rounded-lg overflow-hidden shadow-sm border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all"
      >
        <input
          className="w-full text-sm px-4 py-2.5 outline-none placeholder:text-gray-400"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          onFocus={() => search && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 cursor-pointer px-4 flex items-center justify-center transition-colors"
        >
          <SearchIcon className="text-white" size={18} />
        </button>
      </form>

      {/* Dropdown suggestions */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full mx-auto  ">
          {suggestions.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-3 px-4 py-2 border-gray-200 rounded-lg shadow-lg z-50 bg-white hover:bg-gray-50 active:bg-gray-50 cursor-pointer"
              onClick={() => router.push(`/product/${s.slug}`)}
            >
              <img
                src={s.featuredImage}
                alt={s.title}
                className="w-10 h-10 object-cover rounded"
              />
              <span className="text-sm text-gray-700">{s.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavbarSearch;
