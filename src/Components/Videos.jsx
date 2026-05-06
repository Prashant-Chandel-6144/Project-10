function Videos({ videoId, title, description, thumbnail, channelTitle }) {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  
  return (
    <div className="video-card">
      <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="video-card-link">
        <div className="video-thumbnail-wrapper">
          <img src={thumbnail} alt={title} className="video-thumbnail" />
          <div className="video-overlay">
            <button className="play-btn">▶</button>
          </div>
        </div>
      </a>
      <div className="video-info">
        <span className="channel-badge">{channelTitle}</span>
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="video-title-link">
          <h3 className="video-title">{title}</h3>
        </a>
        <p className="video-description">{description.length > 100 ? description.substring(0, 100) + "..." : description}</p>
      </div>
    </div>
  );
}


export default Videos;