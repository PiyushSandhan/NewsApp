import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import Navbar from './Navbar'
function News() {
  const [articles, setArticles] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchNews = async (page) => {
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=6da0c8b4b5e14915a645f54ad5905ed0&page=${page}&pagesize=10`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    console.log('Fetched Data:', parsedData.articles);
console.log('Total Results:', parsedData.totalResults);
console.log('Articles Count:', parsedData.articles.length);

  };
  

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  if (loading) {
    return <Spinner />; 
  }
  const handlePrevClick = () => {
    setPage(page - 1);
  };

  const handleNextClick = () => {
    if (page + 1 > Math.ceil(totalResults / 9)) {
      return;
    }
    setPage(page + 1);
  };
  

  return (
    <>
    
   <div style={{ background: "linear-gradient(to top,rgb(255, 255, 255),rgb(235, 240, 242))",flex: 1, minHeight: '100vh'}}>
    <Navbar/>
    <div className="container my-4"  >
      <h1 className="text-center" style={{fontFamily:"fantasy",fontSize:"30px"}}>Top Headlines</h1>
      <div className="row" style={{marginBottom:"4%",display:"flex",justifyContent:"space-between"}}>
        {articles.map((element,index) => {
          return (
            <div className="col-md-4 " key={index} >
              <NewsItem
                 title={element.title || "No Title Available"}
                 description={element.description || "No Description Available"}
                 imageUrl={element.urlToImage || "https://cdn4.iconfinder.com/data/icons/solid-part-6/128/image_icon-512.png"}
                 NewsUrl={element.url || "#"}
              />
            </div>
          );
        })}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
        disabled={page+1>= Math.ceil(totalResults / 9)}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  </div>
 
    </>
  );
}

export default News;