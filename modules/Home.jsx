import React from 'react';
import Header from './Header.jsx'
import ArticleThumbnail from './ArticleThumbnail.jsx'
import ArticleContainer from './ArticleContainer.jsx'
import {Link} from 'react-router'
let ulStyle = {
  width : 700,
  margin : 'auto',
  listStyle : 'none',
  padding : 0
}
const demo_article = [
  {
    index : 0,
    heading : "How to create a ReactJS application.",
    subtitle : "With es6 standad of javascript",
    titleImage : "http://placehold.it/350x150",
    content : "Click on the title to go to the full story."
  },
  {
    index : 1,
    heading : "How to create a AngularJS application.",
    subtitle : "With es6 standad of javascript",
    titleImage : "http://placehold.it/350x150",
    content : "Click on the title to go to the full story."
  },
  {
    index : 2,
    heading : "How to create a Android application.",
    subtitle : "With es6 standad of javascript",
    titleImage : "http://placehold.it/350x150",
    content : "Click on the title to go to the full story."
  },
]

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showArticle : -1
    }
  }
  render() {
    return(
        <ul style={ulStyle}>
          <li>
            <Link to="/article/Hell-yeah">GO TO</Link>
            <ArticleThumbnail {...demo_article[0]} onClick={this.onClick}/>
          </li>
          <li>
            <ArticleThumbnail {...demo_article[1]} onClick={this.onClick}/>
          </li>
          <li>
            <ArticleThumbnail {...demo_article[2]} onClick={this.onClick}/>
          </li>
        </ul>
    );

  }

   onClick(index){

   }
}

export default Home;
