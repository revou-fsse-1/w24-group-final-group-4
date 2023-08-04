import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchInput = () => {
  const search = useSearchParams();
  const [searchInput, setSearchInput] = useState<string | null>(
    search ? search.get('q') : '',
  );
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof searchInput !== 'string') {
      return;
    }

    const encodedSearchInput = encodeURI(searchInput);
    router.push(`/search?q=${encodedSearchInput}`);
  };

  return (
    <form className="flex justify-center w-2/3" onSubmit={handleSubmit}>
      <input
        className="px-5 py-1 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-sky-600 placeholder:text-zinc-400"
        value={searchInput || ''}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="What are you struggling with?"
      />
    </form>
  );
};

export default SearchInput;
