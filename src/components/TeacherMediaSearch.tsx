'use client';

import { useState } from 'react';

export default function TeacherMediaSearch() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<{ imageUrls: string[]; videoUrls: string[] }>({
    imageUrls: [],
    videoUrls: [],
  });

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/media?q=${query}`);
      const data = await res.json();
      setMedia(data);
    } catch (err) {
      console.error('Failed to fetch media:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search topic (e.g. volcanoes)"
          className="flex-1 px-4 py-2 border rounded-xl text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500">Fetching media...</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {media.imageUrls.map((url, index) => (
          <img key={index} src={url} alt="Media" className="rounded-xl w-full h-40 object-cover" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {media.videoUrls.map((url, index) => (
          <iframe key={index} src={url} className="w-full h-60 rounded-xl" allowFullScreen />
        ))}
      </div>
    </div>
  );
}
