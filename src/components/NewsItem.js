import React, { useState } from 'react';

function NewsItem(props) {
  const { title, description, imageUrl, NewsUrl } = props;
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className='col-lg-3 col-md-6 col-sm-12 my-3'>
      <div className="card text-center mb-3 news-card" style={{
        width: "24rem",
        height: "25rem",
        background: "radial-gradient(circle,rgb(237, 255, 255),rgb(193, 231, 249))",
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s'
      }} onClick={handleFlip}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}>
          <img src={!imageUrl ? "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg" : imageUrl} className="card-img-top" alt="..." style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <div className="card-body" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', 
            height: 'calc(100% - 200px)' 
          }}>
            <div>
              <h5 className="card-title">{title}...</h5>
            </div>
            <a href={NewsUrl} rel="noopener noreferrer" target="_blank" className="btn btn-md btn-dark">Read more</a>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
          backgroundColor: '#E4FBFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;