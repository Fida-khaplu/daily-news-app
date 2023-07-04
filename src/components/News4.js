import React, { Component } from 'react'
import Newitem from './Newitem'
import Spinner1 from './Spinner1';

export class News extends Component {
    
    constructor(){
        super();
        console.log('construcot from news')
        this.state ={
        articles :[],
        page:1,
        loading:false

    }
     
    }

    async componentDidMount(){
      console.log("componentDidMount1");
      let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=281abf9b38a34166b12785c52f5a2b2e&page=1&pageSize=
      ${this.props.pageSize}`;
      let data = await fetch(url);
      let parseData = await data.json()
      console.log(parseData);
      this.setState({articles:parseData.articles, totalResults:parseData.totalResults})
    }

    handlePreviousClick = async ()=>{
      console.log("previosu")
      let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=281abf9b38a34166b12785c52f5a2b2e&page=
      ${this.state.page-1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        page:this.state.page -1,
        articles:parseData.articles
      } );

    }
    handleNextClick = async ()=>{
      console.log("next");

      if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{

        let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=281abf9b38a34166b12785c52f5a2b2e&page=
        ${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
          page:this.state.page +1,
          articles:parseData.articles
        } );

      }

      

    }
  render() {
    return (
      <div className='container'>
        <h2 className='text-center'> Daily News - Top Headlines </h2>
         {this.state.loading && <Spinner1/>} {/*agar loading true ha tu spinner ko dekhana ha. */}
       
        <div className="row">
        {this.state.articles.map((element)=>{
             return <div className="col-md-4 my-3"key={element.url}>
             <Newitem  title = {element.title?element.title.slice(0,30):""}
              description ={element.description?element.description.slice(0,90):""} imgUrl= {element.urlToImage}
              newsUrl={element.url}/>
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
