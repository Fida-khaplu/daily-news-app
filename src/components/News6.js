import React, { Component, useState } from 'react'
import Newitem from './Newitem'
import Spinner1 from './Spinner1';
import PropTypes from 'prop-types'


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
        loading:false

    }
    document.title= `${this.capitalizeFirstLetter(this.props.category)} - Daily News`;
    }
    async updateNews(){

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
      // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=281abf9b38a34166b12785c52f5a2b2e&page=
      // ${this.state.page-1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      // let data = await fetch(url);
      // let parseData = await data.json(); 
      // this.setState({
      //   page:this.state.page -1,
      //   articles:parseData.articles,
      //   loading:false
      // } );
      this.setState({page:this.state.page-1});
      this.updateNews();

    }
    handleNextClick = async ()=>{
      console.log("next");

      // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

      //   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=281abf9b38a34166b12785c52f5a2b2e&page=
      //   ${this.state.page+1}&pageSize=${this.props.pageSize}`;
      //   this.setState({loading:true});
      //   let data = await fetch(url);
      //   let parseData = await data.json();
      //   this.setState({
      //     page:this.state.page +1,
      //     articles:parseData.articles,
      //     loading:false
      //   } );

      // }
      this.setState({page:this.state.page+1});
      this.updateNews();

      

    }
  render() {
    return (
      <div className='container'>
        <h2 className='text-center'> Daily News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
         {this.state.loading && <Spinner1/>} {/*agar loading true ha tu spinner ko dekhana ha. */}
       
        <div className="row">
         {!this.state.loading && this.state.articles.map((element)=>{ {/*this.state.loading && is ka matlab ha ki agar ya statement true ha tu necha wala content dekhow agar nahi ha tu loading dekhow.  */}
             return <div className="col-md-4 my-3"key={element.url}>
             <Newitem  title = {element.title?element.title.slice(0,30):""}
              description ={element.description?element.description.slice(0,90):""} imgUrl= {element.urlToImage}
              newsUrl={element.url} author={element.author} date={element.publishedAt}/>
         </div>
            
        })}
           
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className= "btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>

      </div>
    )
  }
}

export default News
