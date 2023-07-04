import React, { Component } from 'react'

export class Newitem extends Component {
  render() {
    let {title , description,imgUrl, newsUrl , author , date} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={!imgUrl?"https://www.livemint.com/lm-img/img/2023/06/20/600x338/alibaba_1687236822536_1687236822804.JPG":imgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title"> {title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {date}</small></p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default Newitem
