import { useEffect, useState } from "react";
import "./App.css";
import Videos from "./Components/Videos.jsx";

function App() {
  const [videos, setVideos] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((result) => {
        setVideos(result.data);
      })
      .catch((err) => console.log(err));
  }, [page]);

  if (!videos) return <div className="loading-text">Loading Videos ■■■</div>;

  return (
    <div className="app-container">

      {/* ── TOP NAVIGATION BAR ── */}
      <nav className="top-nav">
        <div className="nav-logo">
          <span className="nav-logo-text">
            Chai<span className="logo-accent">Tube</span>
          </span>
        </div>
        <div className="nav-links">
          <button className="nav-link-btn active">Videos</button>
          <button className="nav-link-btn">Trending</button>
          <button className="nav-link-btn">About</button>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-headline">
            <span className="line-break">Watch.</span>
            <span className="line-break outline-text">Discover.</span>
            <span className="line-break">Repeat.</span>
          </h1>
          <p className="hero-subtitle">
            Premium video content, served raw and unfiltered. 
            No algorithms. No noise. Just pure content.
          </p>
          <div className="hero-cta-group">
            <button className="btn-cta btn-cta-primary" onClick={() => window.scrollTo({ top: document.querySelector('.content-area').offsetTop, behavior: 'smooth' })}>
              Browse Now →
            </button>
            <button className="btn-cta btn-cta-secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          <span className="marquee-text">★ Fresh Content Daily</span>
          <span className="marquee-text">★ No Ads</span>
          <span className="marquee-text">★ Curated Picks</span>
          <span className="marquee-text">★ Community Driven</span>
          <span className="marquee-text">★ Open Source</span>
          <span className="marquee-text">★ Fresh Content Daily</span>
          <span className="marquee-text">★ No Ads</span>
          <span className="marquee-text">★ Curated Picks</span>
          <span className="marquee-text">★ Community Driven</span>
          <span className="marquee-text">★ Open Source</span>
        </div>
      </div>

      {/* ── SECTION HEADER ── */}
      <div className="section-header">
        <h2 className="section-title">Latest Videos</h2>
        <span className="section-tag">Page {page}</span>
      </div>

      {/* ── VIDEO GRID ── */}
      <main className="content-area">
        <div className="product-wrapper">
          {videos?.data?.map((video, index) => {
            let snipet = video?.items?.snippet;
            if (!snipet) return null;
            return (
              <Videos
                key={video?.id || index}
                videoId={video?.items?.id}
                title={snipet?.title}
                description={snipet?.description}
                thumbnail={snipet?.thumbnails?.medium?.url || snipet?.thumbnails?.default?.url}
                channelTitle={snipet?.channelTitle}
              />
            );
          })}
        </div>
      </main>

      {/* ── PAGINATION ── */}
      <footer className="pagination-footer">
        <div className="pagination-controls">
          <button
            className="nav-btn prev"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <span className="icon">←</span> Prev
          </button>
          <div className="page-indicator">Page {page}</div>
          <button
            className="nav-btn next"
            onClick={() => setPage(page + 1)}
          >
            Next <span className="icon">→</span>
          </button>
        </div>
      </footer>

      {/* ── SITE FOOTER ── */}
      <div className="site-footer">
        <p className="footer-text">
          Built with <span className="footer-accent"></span> — ChaiTube © 2026
        </p>
      </div>
    </div>
  );
}

export default App;