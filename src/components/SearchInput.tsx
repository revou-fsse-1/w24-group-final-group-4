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
    <form onSubmit={handleSubmit}>
      <input
        value={searchInput || ''}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="What are you struggling with?"
      />
    </form>
  );
};

export default SearchInput;
