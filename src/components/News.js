import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

function News() {
  const [articles, setArticles] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchNews = async (page) => {
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=6da0c8b4b5e14915a645f54ad5905ed0&page=${page}&pagesize=9`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
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
    <div className="container my-3">
      <h1 className="text-center">Top Headlines</h1>
      <div className="row">
        {articles.map((element) => {
          return (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                imageUrl={element.urlToImage}
                NewsUrl={element.url}
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
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

export default News;