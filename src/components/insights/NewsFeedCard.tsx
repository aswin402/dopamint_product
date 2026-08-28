import React from 'react';
import { useCryptoStore } from '../../store/useCryptoStore';

export const NewsFeedCard: React.FC = () => {
  const news = useCryptoStore((s) => s.news);
  const mainNews = news[0];

  return (
    <div className="bg-white rounded-2xl border border-[#ECECEC] p-4 shadow-card select-none">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm text-[#111111] tracking-tight">Latest News</h3>
        <a
          href={mainNews?.url || 'https://coindesk.com'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#5B5CEB] hover:underline flex items-center gap-0.5"
        >
          <span>View All</span>
        </a>
      </div>

      {mainNews && (
        <a
          href={mainNews.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#F0F2F6] relative">
            <img
              src={mainNews.imageUrl}
              alt={mainNews.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-xs text-[#111111] group-hover:text-[#5B5CEB] transition-colors leading-snug line-clamp-2">
              {mainNews.title}
            </h4>
            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#8E8E93] font-medium">
              <span className="text-[#333333] font-semibold">{mainNews.source}</span>
              <span>•</span>
              <span>{mainNews.timeAgo}</span>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};
