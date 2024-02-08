import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner.js"; // Adjust the path based on your file structure
import PropTypes from 'prop-types';

export class News extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title=this.props.category;
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6da0c8b4b5e14915a645f54ad5905ed0&page=1&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({ articles: parsedData.articles,totalResults:parsedData.totalResults });
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6da0c8b4b5e14915a645f54ad5905ed0&page=${
      this.state.page - 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false,
    });
  };
  handleNextClick = async () => {
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
   
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6da0c8b4b5e14915a645f54ad5905ed0&page=${
      this.state.page + 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false,
    });
  }
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Top Headlines</h1>
       {!this.state.loading && this.state.loading && <Spinner/>}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  NewsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
          disabled={this.state.page>=this.props.pageSize}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
News.defaultProps={
    country:'in',
    pageSize:8,
    category:'general',
  }
News.propTypes={
   country:PropTypes.string,
   pageSize:PropTypes.number,
   category:PropTypes.string,
  }

export default News;
