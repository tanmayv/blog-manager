import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ArticleHead from './ArticleHead.jsx'
import ArticleContent from './ArticleContent.jsx'
import './articleContainer.scss'
import './syntax_highlight.scss'
import Fetch from 'react-fetch'
import {Sticky, StickyContainer} from 'react-sticky'

let theprops = {
  'heading' : "Essential Guide For Designing Your Android App Architecture: MVP: Part 2",
  'sub_heading' : "This is a sub heading",
  'header_image' : "http://placehold.it/600x250"
}
class ArticleContainer extends Component{
  constructor(props){
    super(props);
  }


  render(){
    return(
      <div className="article">


        <Fetch url="http://localhost:8080/api/article/how-to-react">
          <ArticleHead {...theprops}/>
          <Sticky style={{display:"inline-block"}}>
          <div className="left-gully">
            <div style={{marginTop : 50}} className="card get-code"> Get Code on github </div>
          </div>
          </Sticky>
          <ArticleContent />
          <Sticky style={{display:"inline-block"}}>
            <div className="right-gully">
              <div className="card share-article"> Share on Facebook </div>
            </div>
          </Sticky>
        </Fetch>


      </div>
    );
  }
}

export default ArticleContainer;
