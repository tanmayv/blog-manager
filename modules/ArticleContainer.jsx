import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ArticleHead from './ArticleHead.jsx'
import './articleContainer.scss'
class ArticleContainer extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <ArticleHead />
      </div>
    );
  }
}

export default ArticleContainer;
