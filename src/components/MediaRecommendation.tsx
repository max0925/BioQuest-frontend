// src/components/MediaRecommendation.tsx
'use client';

import { useState } from 'react';

export default function MediaRecommendation() {
  const [query, setQuery] = useState('');
  const [media, setMedia] = useState<{ imageUrls: string[]; videoUrls: string[] }>({
    imageUrls: [],
    videoUrls: [],
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch(`/api/media?q=${query}`);
    const data = await res.json();
    setMedia(data);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter topic (e.g. volcanoes)"
          className="flex-1 px-4 py-2 border rounded-xl"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500">Fetching content...</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {media.imageUrls.map((url, index) => (
          <img key={index} src={url} alt="Recommended" className="rounded-xl w-full h-40 object-cover" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {media.videoUrls.map((url, index) => (
          <iframe
            key={index}
            src={url}
            className="w-full h-60 rounded-xl"
            allowFullScreen
          />
        ))}
      </div>
    </div>
  );
}
