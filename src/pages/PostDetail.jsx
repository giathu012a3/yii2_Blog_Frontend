import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Layout from '../components/layout/Layout';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/posts/${id}?expand=category,author,tags,content`);
        setPost(res.data.data);
        setError(null);
      } catch (err) {
        setError('Không tìm thấy bài viết hoặc đã có lỗi xảy ra.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLikeLoading(true);
      const res = await axiosInstance.post(`/api/posts/like?post_id=${post.id}`);
      if (res.data) {
        setLiked(res.data.liked);
        if (res.data.liked) {
          setLikeCount(prev => prev + 1);
        } else {
          setLikeCount(prev => Math.max(0, prev - 1));
        }
      }
    } catch (err) {
      alert('Không thể thực hiện thích bài viết. Vui lòng thử lại sau.');
    } finally {
      setLikeLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div style={S.loadingContainer}>
          <div style={S.spinner} />
          <p style={S.loadingText}>Đang tải bài viết...</p>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div style={S.errorContainer}>
          <h2 style={S.errorTitle}>Lỗi tải dữ liệu</h2>
          <p style={S.errorText}>{error || 'Không tìm thấy bài viết này.'}</p>
          <Link to="/" style={S.backBtn}>Quay lại trang chủ</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={S.page}>
        <div style={S.breadcrumb}>
          <Link to="/" style={S.breadLink}>Trang chủ</Link>
          <span style={S.breadSep}>/</span>
          {post.category && (
            <>
              <span style={S.breadActive}>{post.category.name}</span>
              <span style={S.breadSep}>/</span>
            </>
          )}
          <span style={S.breadActive}>{post.title}</span>
        </div>

        <article style={S.article}>
          <h1 style={S.title}>{post.title}</h1>

          <div style={S.metaRow}>
            <div style={S.authorBox}>
              <div style={S.avatar}>
                {post.author?.username ? post.author.username.substring(0, 2).toUpperCase() : 'AD'}
              </div>
              <div>
                <div style={S.authorName}>{post.author?.username || 'Ẩn danh'}</div>
                <div style={S.postDate}>Đăng ngày {formatDate(post.published_at || post.created_at)}</div>
              </div>
            </div>

            <div style={S.statsBox}>
              <span style={S.statItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                {post.view_count || 0} lượt xem
              </span>

              <button
                onClick={handleLike}
                disabled={likeLoading}
                style={{
                  ...S.likeBtn,
                  background: liked ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: liked ? '#f87171' : 'rgba(255, 255, 255, 0.6)',
                  border: liked ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill={liked ? '#f87171' : 'none'} stroke="currentColor" strokeWidth="2.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {liked ? 'Đã thích' : 'Thích'}
              </button>
            </div>
          </div>

          {post.thumbnail && (
            <div style={S.bannerBox}>
              <img src={post.thumbnail} alt={post.title} style={S.bannerImg} />
            </div>
          )}

          <div
            style={S.content}
            dangerouslySetInnerHTML={{ __html: post.content || '<p style="color: rgba(255,255,255,0.4)">Không có nội dung bài viết.</p>' }}
          />

          {post.tags && post.tags.length > 0 && (
            <div style={S.tagSection}>
              <span style={S.tagLabel}>Tags:</span>
              <div style={S.tagList}>
                {post.tags.map(tag => (
                  <span key={tag.id} style={S.tagPill}>
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={S.authorBio}>
            <div style={S.bioAvatar}>
              {post.author?.username ? post.author.username.substring(0, 2).toUpperCase() : 'AD'}
            </div>
            <div>
              <h3 style={S.bioName}>Tác giả: {post.author?.username || 'Ẩn danh'}</h3>
              <p style={S.bioDesc}>
                Thành viên của Yii2 Blog. Đam mê chia sẻ những kiến thức bổ ích về công nghệ, lập trình và cuộc sống.
              </p>
            </div>
          </div>

          <div style={S.actionRow}>
            <Link to="/" style={S.backHomeBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Quay lại danh sách
            </Link>
          </div>
        </article>
      </div>
    </Layout>
  );
}

const S = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '1rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(99, 102, 241, 0.1)',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '1rem',
    padding: '2rem',
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#ef4444',
    margin: 0,
  },
  errorText: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.6)',
    maxWidth: '400px',
    margin: '0 0 1rem',
  },
  backBtn: {
    padding: '0.75rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  page: {
    width: '100%',
    maxWidth: '820px',
    margin: '0 auto',
    padding: '2rem 1rem 6rem',
    fontFamily: "'Inter', sans-serif",
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.825rem',
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: '2rem',
  },
  breadLink: {
    color: 'rgba(255, 255, 255, 0.4)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  breadSep: {
    color: 'rgba(255, 255, 255, 0.2)',
  },
  breadActive: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '200px',
  },
  article: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#fff',
    lineHeight: '1.25',
    margin: '0 0 1.5rem',
    letterSpacing: '-0.5px',
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    marginBottom: '2rem',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  authorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
  },
  avatar: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '0.85rem',
    fontWeight: '700',
  },
  authorName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#f1f5f9',
  },
  postDate: {
    fontSize: '0.78rem',
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: '2px',
  },
  statsBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  statItem: {
    fontSize: '0.83rem',
    color: 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  likeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.9rem',
    borderRadius: '10px',
    fontSize: '0.825rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
  },
  bannerBox: {
    width: '100%',
    borderRadius: '20px',
    overflow: 'hidden',
    marginBottom: '2.5rem',
    aspectRatio: '16/9',
    background: '#0c0f1d',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    fontSize: '1.05rem',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.8',
    letterSpacing: '-0.1px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  tagSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginTop: '3.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
  },
  tagLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  tagPill: {
    fontSize: '0.78rem',
    fontWeight: '500',
    color: '#818cf8',
    background: 'rgba(129, 140, 248, 0.1)',
    padding: '0.25rem 0.65rem',
    borderRadius: '8px',
  },
  authorBio: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '24px',
    marginTop: '3rem',
  },
  bioAvatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '700',
    flexShrink: 0,
  },
  bioName: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#f1f5f9',
    margin: '0 0 0.4rem',
  },
  bioDesc: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: '1.6',
    margin: 0,
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '3rem',
  },
  backHomeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
};
