'use client';

import { useState } from 'react';
import { API_BASE } from '@/lib/config';
import Image from 'next/image';

export default function MediaRecommendation() {
  const [query, setQuery] = useState('');
  const [media, setMedia] = useState<{ imageUrls: string[]; videoUrls: string[] }>({
    imageUrls: [],
    videoUrls: [],
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const [imageRes, videoRes] = await Promise.all([
        fetch(`${API_BASE}/image?topic=${encodeURIComponent(query)}`),
        fetch(`${API_BASE}/video?topic=${encodeURIComponent(query)}`),
      ]);

      const imageData = await imageRes.json();
      const videoData = await videoRes.json();

      const imageUrl = imageData?.url || '';
      const videoUrl = videoData?.url || '';

      const embedVideoUrl = videoUrl.includes('youtube.com')
        ? videoUrl.replace('watch?v=', 'embed/')
        : '';

      setMedia({
        imageUrls: imageUrl ? [imageUrl] : [],
        videoUrls: embedVideoUrl ? [embedVideoUrl] : [],
      });
    } catch (err) {
      console.error('Fetch media failed:', err);
      setMedia({ imageUrls: [], videoUrls: [] });
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* 输入框 */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter topic (e.g. DNA, photosynthesis)"
          className="flex-1 px-4 py-2 border rounded-full text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* 加载提示 */}
      {loading && <p className="text-sm text-gray-500">Fetching media...</p>}

      {/* 展示内容 */}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {media.imageUrls.map((url, index) => (          
        <Image
          key={index}
          src={url}
          alt="Recommended visual"
          className="rounded-xl w-full md:w-1/2 h-60 object-cover"
           layout="responsive"  // 使用 responsive 布局
          width={500} // 请根据实际大小调整宽高
          height={500}
        />
        ))}
        {media.videoUrls.map((url, index) => (
          <iframe
            key={index}
            src={url}
            className="w-full md:w-1/2 h-60 rounded-xl"
            allowFullScreen
          />
        ))}
      </div>
    </div>
  );
}
