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
  console.log(videos);

  if (!videos) return <div className="loading-text">Brewing your video...</div>;

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="logo-section">
          <div className="logo-icon">☕</div>
          <h1>Chai <span className="highlight">Tube</span></h1>
        </div>
        <p className="subtitle">Discover premium content, one cup at a time.</p>
      </header>
      
      <main className="content-area">
        <div className="product-wrapper">
          {videos?.data?.map((video, index)=>{
            let snipet = video?.items?.snippet;
            if(!snipet) return null;
            console.log(video?.items?.id)
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

      <footer className="pagination-footer">
        <div className="pagination-controls">
          <button
            className="nav-btn prev"
            onClick={()=>{setPage(page - 1)}}
            disabled={page === 1}
          >
            <span className="icon">←</span> Previous
          </button>
          <div className="page-indicator">Page {page}</div>
          <button 
            className="nav-btn next"
            onClick={()=>{setPage(page + 1)}}
          >
            Next <span className="icon">→</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;