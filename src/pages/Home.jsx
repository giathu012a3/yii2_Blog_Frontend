import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../api/services';
import Layout from '../components/layout/Layout';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAll({ expand: 'category,tags,author' });
        setPosts(response.data.data || []);
      } catch (err) {
        if (!err.response) {
          setError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.');
        } else {
          setError('Lỗi khi tải danh sách bài viết.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp * 1000).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="relative overflow-hidden bg-[#07091a] py-16 sm:py-24">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6">
            ✦ Khám phá tri thức lập trình mỗi ngày
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Nơi Chia Sẻ Kiến Thức <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Và Trải Nghiệm Lập Trình.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg text-white/50 leading-relaxed">
            Học hỏi từ các chuyên gia lập trình, cập nhật xu hướng công nghệ mới nhất và nâng cao kỹ năng code của bạn mỗi ngày.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Bài viết mới nhất</h2>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-300 text-sm">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            <span className="text-white/50 text-sm font-medium">Đang tải các bài viết...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-4 border border-white/5">
              <svg className="w-8 h-8 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg">Chưa có bài viết nào</h3>
            <p className="text-white/40 text-sm mt-1 mb-6">Hãy là người đầu tiên đăng tải bài viết đầy cảm hứng.</p>
            <Link
              to="/posts/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all duration-200"
            >
              Viết bài đầu tiên
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 shadow-xl"
              >
                <div className="aspect-[16/10] bg-[#0c0f1d] relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                  <svg className="w-12 h-12 text-white/10 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  {post.category && (
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                      {post.category.name}
                    </span>
                  )}
                </div>

                <div className="flex-grow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-white/40 text-xs font-medium mb-3">
                      <span>{formatDate(post.published_at || post.created_at)}</span>
                      <span>•</span>
                      <span>{post.view_count || 0} lượt xem</span>
                    </div>

                    <h3 className="text-white font-bold text-lg leading-snug group-hover:text-indigo-400 transition-colors line-clamp-2">
                      <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </h3>

                    <p className="text-white/55 text-sm leading-relaxed mt-2.5 line-clamp-3">
                      {post.content ? post.content.replace(/<[^>]*>/g, '') : ''}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-white/70 text-xs font-semibold">
                      {post.author ? post.author.username : 'Ẩn danh'}
                    </span>
                    <Link
                      to={`/posts/${post.id}`}
                      className="text-indigo-400 hover:text-indigo-300 text-xs font-bold inline-flex items-center gap-1 group/btn"
                    >
                      Đọc chi tiết
                      <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
