import React from 'react';
import Header from './Header.jsx'
import ArticleThumbnail from './ArticleThumbnail.jsx'
import ArticleContainer from './ArticleContainer.jsx'
import {StickyContainer, Sticky} from 'react-sticky'
import './app.scss'
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

class App extends React.Component {

  render() {
    return (
      <StickyContainer>
        <div style={{background : "#fafafa"}}>
          <Header />
          <StickyContainer>
            {this.props.children}
          </StickyContainer>
        </div>
      </StickyContainer>

    );
  }

}

export default App;
