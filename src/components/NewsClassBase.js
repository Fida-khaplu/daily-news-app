import React, { Component, useState } from 'react'
import Newitem from './Newitem'
import Spinner1 from './Spinner1';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps ={
    country:'in',
    pageSize:8,
    category:'general'
  }
  static propTypes ={
    country:'in',
    pageSize:8,
    category:PropTypes.string
  }
  capitalizeFirstLetter= (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
    
    constructor(props){
        super(props);
        console.log('construcot from news')
        this.state ={
        articles :[],
        page:1,
        loading:true,
        totalResults:0

    }
    document.title= `${this.capitalizeFirstLetter(this.props.category)} - Daily News`;
    }
    async updateNews(){
      this.props.setProgress(0);
      console.log("Upadate News");
      const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=281abf9b38a34166b12785c52f5a2b2e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json()
      console.log(parseData);
      this.setState({articles:parseData.articles,
         totalResults:parseData.totalResults,
         loading:false
      })
      this.props.setProgress(100);
    }

    async componentDidMount(){
      console.log("componentDidMount1");
    //   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=281abf9b38a34166b12785c52f5a2b2e&page=
    //   1&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parseData = await data.json()
    //   console.log(parseData);
    //   this.setState({articles:parseData.articles,
    //      totalResults:parseData.totalResults,
    //      loading:false
    //   })
    // this.setState({page:this.state.page=1});
      this.updateNews();
     }

    handlePreviousClick = async ()=>{
      console.log("previous")
      this.setState({page:this.state.page-1});
      this.updateNews();

    }
    handleNextClick = async ()=>{
      console.log("next");
      this.setState({page:this.state.page+1});
      this.updateNews();

    }

     fetchMoreData = async() => {
     this.setState({page:this.state.page+1});
     console.log("Upadate News");
      const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=281abf9b38a34166b12785c52f5a2b2e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json()
      console.log(parseData);
      this.setState({
         articles:this.state.articles.concat(parseData.articles),
         totalResults:parseData.totalResults,
         loading:false
      })
    };
  render() {
    return (
      <>
        <h2 className='text-center my-3'> Daily News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
         {this.state.loading && <Spinner1/>} {/*agar loading true ha tu spinner ko dekhana ha. */}
        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length!= this.state.totalResults}
            loader={<Spinner1/>}
          >
            <div className="container">
              <div className="row">
                { this.state.articles.map((element)=>{ {/*this.state.loading && is ka matlab ha ki agar ya statement true ha tu necha wala content dekhow agar nahi ha tu loading dekhow.  */}
                    return <div className="col-md-4 my-3"key={element.url}>
                    <Newitem  title = {element.title?element.title.slice(0,30):""}
                      description ={element.description?element.description.slice(0,90):""} imgUrl= {element.urlToImage}
                      newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                </div>
                
                })}
              
              </div>
            </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className= "btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

      </>
    )
  }
}

export default News
