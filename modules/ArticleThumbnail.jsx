import React, {Component} from 'react'
import ReactDOM from 'react-dom'

let divStyle = {
  border : "1px solid #e6e6e6",
  margin : 5,
  padding : 5,
  fontFamily : 'roboto',
  background : '#ffffff'
}

class ArticleThumbnail extends Component {
  render(){
    return (
      <div style={divStyle} onClick={()=>{this.props.onClick(this.props.index)}}>
        <h3 style = {{margin : '0.2em'}}>{this.props.heading}</h3>
        <h5 style = {{margin : '0.4em', fontWeight : 'normal', color : '#c6c6c6'}}>{this.props.subtitle}</h5>
        <img style = {{marginTop : 10}} src={this.props.titleImage} width="100%"/>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

ArticleThumbnail.propTypes = {
  heading : React.PropTypes.string.isRequired,
  subtitle : React.PropTypes.string.isRequired,
  titleImage : React.PropTypes.string,
  content : React.PropTypes.string.isRequired
};

export default ArticleThumbnail;
