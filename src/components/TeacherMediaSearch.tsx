'use client';

import { useState } from 'react';
import { API_BASE } from '@/lib/config'; // ✅ 记得创建 config.ts 并引入
import Image from 'next/image';

export default function TeacherMediaSearch() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<{ imageUrls: string[]; videoUrls: string[] }>({
    imageUrls: [],
    videoUrls: [],
  });

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const imageRes = await fetch(`${API_BASE}/image?topic=${query}`);
      const videoRes = await fetch(`${API_BASE}/video?topic=${query}`);

      const imageData = await imageRes.json();
      const videoData = await videoRes.json();

      const imageUrl = imageData?.url || '';
      const videoUrl = videoData?.url || '';
      const embedVideoUrl = videoUrl.includes('youtube')
        ? videoUrl.replace('watch?v=', 'embed/')
        : '';

      setMedia({
        imageUrls: imageUrl ? [imageUrl] : [],
        videoUrls: embedVideoUrl ? [embedVideoUrl] : [],
      });
    } catch (err) {
      console.error('Failed to fetch media:', err);
      setMedia({ imageUrls: [], videoUrls: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 输入栏 */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search topic (e.g. DNA, photosynthesis)"
          className="flex-1 px-4 py-2 border rounded-full text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm"
        >
          Search
        </button>
      </div>

      {/* 加载状态 */}
      {loading && <p className="text-sm text-gray-500">Fetching media...</p>}

      {/* 图片 + 视频展示 */}
      <div className="flex flex-col md:flex-row gap-4 mt-2">
        {media.imageUrls[0] && (
          <Image
            src={media.imageUrls[0]}
            alt="Visual"
            className="rounded-xl w-full md:w-1/2 h-64 object-cover"
            width={500} // 请根据实际大小调整宽高
            height={500}
          />
        )}
        {media.videoUrls[0] && (
          <iframe
            src={media.videoUrls[0]}
            className="w-full md:w-1/2 h-64 rounded-xl"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
