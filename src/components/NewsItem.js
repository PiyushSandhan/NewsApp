import React from 'react';

function NewsItem(props) {
  const { title, description, imageUrl, NewsUrl } = props;

  return (
    <div>
      <div className='col-lg-3 col-md-6 col-sm-12 my-3'>
        <div className="card text-center mb-3" style={{ width: "24rem", backgroundColor: "#E4FBFF",height:"25rem"}}>
          <img src={!imageUrl ? "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg" : imageUrl} className="card-img-top" alt="..." style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={NewsUrl} rel="noopener noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;