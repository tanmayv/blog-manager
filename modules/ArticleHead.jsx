import React, {Component} from 'react'
import ReactDOM from 'react-dom'

var hljs = require('highlight.js');
          //dangerouslySetInnerHTML={{__html : contentHtml}}
let divStyle = {
  padding : 5,
  width : 700,
  margin : 'auto'
}

class ArticleHead extends Component{

  render(){
    console.log(this.props.heading)
    let heading = this.props.heading || ""
    let subHeading = this.props.sub_heading || "";
    let headerImage = this.props.header_image || "";

    return (
        <div>
          <div style = {divStyle}>
            <h1 >{heading}</h1>
            <h3 style={{color : '#a8a8a8', marginTop : '0', marginBottom : '1em', fontWeight : 300}}>{subHeading}</h3>
          </div>
          <img src={headerImage} width="100%" />
        </div>
      );
    }
}


export default ArticleHead
