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

const NavbarSearch = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  // Debounced fetch
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
    }, 300); // 300ms debounce

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
    <div className="relative w-full">
      <form
        onSubmit={handleSearch}
        className="flex items-stretch rounded-lg overflow-hidden shadow-sm border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all"
      >
        <input
          className="w-full text-sm px-4 py-2.5 outline-none placeholder:text-gray-400"
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => search && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // delay so click works
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
        <div className="absolute group top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
          {suggestions.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer"
              onClick={() => router.push(`/product/${s.slug}`)}
            >
              <img
                src={s.featuredImage}
                alt={s.title}
                className="w-10 h-10 object-cover rounded"
              />
              <span className="text-sm text-gray-700 transition-all group-hover:text-primary">{s.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
