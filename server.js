import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './modules/routes'

var jsonfile = require('jsonfile')
var express = require('express')
var path = require('path')
var compression = require('compression')
var fs = require('fs');
var app = express()
app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s', req.method, req.path);
  next();
});

//===API LOGIC START ======

router.get('/article/:articleUrl', function(req, res, next) {
  let articleUrl = req.params.articleUrl;
  let requestHandled = false;
  jsonfile.readFile("articles/index.json", function(err, obj) {
    for(let i = 0 ; i < obj.length; i++){
      if(obj[i].url == articleUrl){
        requestHandled = true;
        fetchArticleFromFolder(obj[i].folder, function(err, articleJson){
          res.send(articleJson)
        })
      }
    }
    if(!requestHandled){
      console.log(requestHandled)
      res.json({"message" : "error"})
    }
  })

});

function fetchArticleFromFolder(folderPath, callback){
  let articleFolderPath = "articles/"+ folderPath + "/" ;

  jsonfile.readFile(articleFolderPath+ "article.json", function(err, articleFile){
    let content = articleFile.content;
    let contentHtml = "";
    for(let i = 0; i < content.length; i++){

      if(content[i].hasOwnProperty("html")){
        let htmlObject = content[i].html;
        if(htmlObject.inFile){
          let htmlSnippet = fs.readFileSync(articleFolderPath + htmlObject.filename);
          contentHtml += htmlSnippet;
        }else{
          contentHtml+= htmlObject.value;
        }

      }else if(content[i].hasOwnProperty("code")){
        let codeObject = content[i].code;
        let codeSnippet = fs.readFileSync(articleFolderPath + codeObject.filename);
        contentHtml += ['<pre><code class="', codeObject.language ,' ">',codeSnippet,"</code></pre>"].join("");
      }

    }
      articleFile.content = contentHtml;
      callback(null,articleFile)
  })
}
//===== API LOGIN ENDS ======
app.use('/api', router);

app.get('*', (req, res) => {
  console.log('%s %s', req.method, req.path);
  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.
    const appHtml = renderToString(<RouterContext {...props}/>)
    console.log(appHtml)
    // dump the HTML into a template, lots of ways to do this, but none are
    // really influenced by React Router, so we're just using a little
    // function, `renderPage`
    res.send(renderPage(appHtml))
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <link rel=stylesheet href=/style.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
