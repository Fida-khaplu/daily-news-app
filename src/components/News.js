import React, { useEffect, useState } from 'react'
import Newitem from './Newitem'
import Spinner1 from './Spinner1';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { cleanup } from '@testing-library/react';


const News = (props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
 


  const capitalizeFirstLetter= (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
    
   
    const  updateNews= async()=>{
      props.setProgress(0);
      console.log("Upadate News");
      const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=281abf9b38a34166b12785c52f5a2b2e&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      let parseData = await data.json()
      setArticles(parseData.articles)
      setTotalResults(parseData.totalResults)
      setLoading(false)
      props.setProgress(100);
    }

    useEffect(() => {
      document.title= `${capitalizeFirstLetter(props.category)} - Daily News`;
      updateNews();
     
  
    },[]);

    // async componentDidMount(){
    //   console.log("componentDidMount1");
    // //   let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=281abf9b38a34166b12785c52f5a2b2e&page=
    // //   1&pageSize=${props.pageSize}`;
    // //   this.setState({loading:true});
    // //   let data = await fetch(url);
    // //   let parseData = await data.json()
    // //   console.log(parseData);
    // //   this.setState({articles:parseData.articles,
    // //      totalResults:parseData.totalResults,
    // //      loading:false
    // //   })
    // // this.setState({page:this.state.page=1});
    //   this.updateNews();
    //  }

    const handlePreviousClick = async ()=>{
      console.log("previous")
      setPage(page-1);
      updateNews();

    }
   const  handleNextClick = async ()=>{
      console.log("next");
      setPage(page+1);
      updateNews();

    }

    const  fetchMoreData = async() => {
      
     console.log("Upadate News");
      const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=281abf9b38a34166b12785c52f5a2b2e&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1);
      // this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json()
      console.log(parseData);
      setArticles(articles.concat(parseData.articles))
      setTotalResults(parseData.totalResults)
    };
 
    return (
      <>
        <h2 className='text-center' style={{marginTop:`90px`}}> Daily News - Top {capitalizeFirstLetter(props.category)} Headlines </h2>
         {loading && <Spinner1/>} {/*agar loading true ha tu spinner ko dekhana ha. */}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length!==totalResults}
            loader={<Spinner1/>}
          >
            <div className="container">
              <div className="row">
                { articles.map((element)=>{ {/*this.state.loading && is ka matlab ha ki agar ya statement true ha tu necha wala content dekhow agar nahi ha tu loading dekhow.  */}
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
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

      </>
    )
  
}
News.defaultProps ={
  country:'in',
  pageSize:8,
  category:'general'
}
News.propTypes ={
  country:'in',
  pageSize:8,
  category:PropTypes.string
}

export default News
