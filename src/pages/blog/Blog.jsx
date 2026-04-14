import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Newsletter from '../../components/Newsletter';
import styles from './Blog.module.css';

// Using local images as placeholders since we have no blog images
import blogImg1 from '../../assets/images/banner-1.1.webp';
import blogImg2 from '../../assets/images/banner-2.2.webp';
import blogImg3 from '../../assets/images/ads-2.1.webp';
import blogImg4 from '../../assets/images/ads-2.2.webp';


const MOCK_BLOGS = [
  {
    id: 1,
    title: 'The Best Fashion Trends For This Summer',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '15 June, 2026',
    author: 'Admin',
    comments: 3,
    image: blogImg1,
  },
  {
    id: 2,
    title: 'How to Choose the Right Colors for Your Outfit',
    excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: '12 June, 2026',
    author: 'ShopO Team',
    comments: 5,
    image: blogImg2,
  },
  {
    id: 3,
    title: 'Tips for Building a Minimalist Wardrobe',
    excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: '08 June, 2026',
    author: 'Admin',
    comments: 0,
    image: blogImg3,
  },
  {
    id: 4,
    title: '5 Accessories Every Man Should Own',
    excerpt: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '05 June, 2026',
    author: 'Guest',
    comments: 12,
    image: blogImg4,
  }
];

const MOCK_CATEGORIES = [
  { name: 'Fashion', count: 15 },
  { name: 'Lifestyle', count: 8 },
  { name: 'Accessories', count: 21 },
  { name: 'Trends', count: 11 },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.blogPage}>
      {/* ── Breadcrumb Banner ─────────────────────────── */}
      <div className={styles.breadcrumbBanner}>
        <div className="container-x">
          <div className={styles.breadcrumbInner}>
            <h1 className={styles.breadcrumbTitle}>Our Blogs</h1>
            <div className={styles.breadcrumbTrail}>
              <Link to="/home" className={styles.breadcrumbLink}>Home</Link>
              <span className={styles.breadcrumbSep}>›</span>
              <span className={styles.breadcrumbCurrent}>Blogs</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────── */}
      <div className={styles.blogContent}>
        <div className="container-x">
          <div className={styles.blogLayout}>
            {/* Left Side: Blog Grid */}
            <div>
              <div className={styles.blogGrid}>
                {MOCK_BLOGS.map((blog) => (
                  <div key={blog.id} className={styles.blogCard}>
                    <div className={styles.blogImageWrap}>
                      <img src={blog.image} alt={blog.title} className={styles.blogImage} />
                      <div className={styles.blogDate}>{blog.date.split(',')[0]}</div>
                    </div>
                    
                    <div className={styles.blogInfo}>
                      <div className={styles.blogMeta}>
                        <span>
                          <svg className={styles.blogMetaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          By {blog.author}
                        </span>
                        <span>
                          <svg className={styles.blogMetaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          {blog.comments} Comments
                        </span>
                      </div>
                      
                      <h3 className={styles.blogTitle}>{blog.title}</h3>
                      <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                      
                      <button className={styles.readMoreBtn}>
                        Read More
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className={styles.pagination}>
                <button className={styles.pageBtn}>&lt;</button>
                <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
                <button className={styles.pageBtn}>2</button>
                <button className={styles.pageBtn}>3</button>
                <button className={styles.pageBtn}>&gt;</button>
              </div>
            </div>

            {/* Right Side: Sidebar */}
            <div className={styles.sidebar}>
              {/* Search Widget */}
              <div className={styles.sidebarWidget}>
                <h3 className={styles.widgetTitle}>Search</h3>
                <div className={styles.searchForm}>
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className={styles.searchBtn} aria-label="Search">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Categories Widget */}
              <div className={styles.sidebarWidget}>
                <h3 className={styles.widgetTitle}>Categories</h3>
                <ul className={styles.catList}>
                  {MOCK_CATEGORIES.map((cat, idx) => (
                    <li key={idx} className={styles.catItem}>
                      <span>{cat.name}</span>
                      <span>({cat.count})</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts Widget */}
              <div className={styles.sidebarWidget}>
                <h3 className={styles.widgetTitle}>Recent Posts</h3>
                <div className={styles.recentPostsList}>
                  {MOCK_BLOGS.slice(0, 3).map((post) => (
                    <div key={post.id} className={styles.recentPostItem}>
                      <div className={styles.recentPostImgWrap}>
                        <img src={post.image} alt={post.title} className={styles.recentPostImg} />
                      </div>
                      <div className={styles.recentPostInfo}>
                        <h4 className={styles.recentPostTitle}>
                          {post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title}
                        </h4>
                        <span className={styles.recentPostDate}>{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Newsletter Reused from Components ─────────── */}
      <Newsletter />
    </div>
  );
}
