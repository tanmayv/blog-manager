/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(2);

	var _reactRouter = __webpack_require__(3);

	var _routes = __webpack_require__(4);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// and these to match the url to routes and then render
	var jsonfile = __webpack_require__(20);
	// we'll use this to render our app to an html string

	var express = __webpack_require__(21);
	var path = __webpack_require__(22);
	var compression = __webpack_require__(23);
	var fs = __webpack_require__(24);
	var app = express();
	app.use(compression());

	// serve our static stuff like index.css
	app.use(express.static(path.join(__dirname, 'public')));

	var router = express.Router();

	router.use(function (req, res, next) {
	  console.log('%s %s', req.method, req.path);
	  next();
	});

	//===API LOGIC START ======

	router.get('/article/:articleUrl', function (req, res, next) {
	  var articleUrl = req.params.articleUrl;
	  var requestHandled = false;
	  jsonfile.readFile("articles/index.json", function (err, obj) {
	    for (var i = 0; i < obj.length; i++) {
	      if (obj[i].url == articleUrl) {
	        requestHandled = true;
	        fetchArticleFromFolder(obj[i].folder, function (err, articleJson) {
	          res.send(articleJson);
	        });
	      }
	    }
	    if (!requestHandled) {
	      console.log(requestHandled);
	      res.json({ "message": "error" });
	    }
	  });
	});

	function fetchArticleFromFolder(folderPath, callback) {
	  var articleFolderPath = "articles/" + folderPath + "/";

	  jsonfile.readFile(articleFolderPath + "article.json", function (err, articleFile) {
	    var content = articleFile.content;
	    var contentHtml = "";
	    for (var i = 0; i < content.length; i++) {

	      if (content[i].hasOwnProperty("html")) {
	        var htmlObject = content[i].html;
	        if (htmlObject.inFile) {
	          var htmlSnippet = fs.readFileSync(articleFolderPath + htmlObject.filename);
	          contentHtml += htmlSnippet;
	        } else {
	          contentHtml += htmlObject.value;
	        }
	      } else if (content[i].hasOwnProperty("code")) {
	        var codeObject = content[i].code;
	        var codeSnippet = fs.readFileSync(articleFolderPath + codeObject.filename);
	        contentHtml += ['<pre><code class="', codeObject.language, ' ">', codeSnippet, "</code></pre>"].join("");
	      }
	    }
	    articleFile.content = contentHtml;
	    callback(null, articleFile);
	  });
	}
	//===== API LOGIN ENDS ======
	app.use('/api', router);

	app.get('*', function (req, res) {
	  console.log('%s %s', req.method, req.path);
	  // match the routes to the url
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    // `RouterContext` is what the `Router` renders. `Router` keeps these
	    // `props` in its state as it listens to `browserHistory`. But on the
	    // server our app is stateless, so we need to use `match` to
	    // get these props before rendering.
	    var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	    console.log(appHtml);
	    // dump the HTML into a template, lots of ways to do this, but none are
	    // really influenced by React Router, so we're just using a little
	    // function, `renderPage`
	    res.send(renderPage(appHtml));
	  });
	});

	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>My First React Router App</title>\n    <link rel=stylesheet href=/index.css>\n    <link rel=stylesheet href=/style.css>\n    <div id=app>' + appHtml + '</div>\n    <script src="/bundle.js"></script>\n   ';
	}

	var PORT = process.env.PORT || 8080;
	app.listen(PORT, function () {
	  console.log('Production Express server running at localhost:' + PORT);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	var _App = __webpack_require__(5);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(19);

	var _Home2 = _interopRequireDefault(_Home);

	var _ArticleContainer = __webpack_require__(11);

	var _ArticleContainer2 = _interopRequireDefault(_ArticleContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/article/:articleUrl', component: _ArticleContainer2.default })
	);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Header = __webpack_require__(6);

	var _Header2 = _interopRequireDefault(_Header);

	var _ArticleThumbnail = __webpack_require__(9);

	var _ArticleThumbnail2 = _interopRequireDefault(_ArticleThumbnail);

	var _ArticleContainer = __webpack_require__(11);

	var _ArticleContainer2 = _interopRequireDefault(_ArticleContainer);

	var _reactSticky = __webpack_require__(8);

	__webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var demo_article = [{
	  index: 0,
	  heading: "How to create a ReactJS application.",
	  subtitle: "With es6 standad of javascript",
	  titleImage: "http://placehold.it/350x150",
	  content: "Click on the title to go to the full story."
	}, {
	  index: 1,
	  heading: "How to create a AngularJS application.",
	  subtitle: "With es6 standad of javascript",
	  titleImage: "http://placehold.it/350x150",
	  content: "Click on the title to go to the full story."
	}, {
	  index: 2,
	  heading: "How to create a Android application.",
	  subtitle: "With es6 standad of javascript",
	  titleImage: "http://placehold.it/350x150",
	  content: "Click on the title to go to the full story."
	}];

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App() {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _reactSticky.StickyContainer,
	        null,
	        _react2.default.createElement(
	          'div',
	          { style: { background: "#fafafa" } },
	          _react2.default.createElement(_Header2.default, null),
	          this.props.children
	        )
	      );
	    }
	  }]);

	  return App;
	}(_react2.default.Component);

	exports.default = App;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(7);

	var _reactRouter = __webpack_require__(3);

	var _reactSticky = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = function (_Component) {
	  _inherits(Header, _Component);

	  function Header() {
	    _classCallCheck(this, Header);

	    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	  }

	  _createClass(Header, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'header-container' },
	        _react2.default.createElement(
	          'div',
	          { className: 'header' },
	          _react2.default.createElement('img', { src: '/icon.png' }),
	          _react2.default.createElement(
	            'span',
	            { className: 'title' },
	            'Tanmay Vijayvargiya'
	          )
	        ),
	        _react2.default.createElement(
	          _reactSticky.Sticky,
	          { isActive: true },
	          _react2.default.createElement(
	            'div',
	            { className: 'nav-container' },
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { className: 'nav-link', to: '/', activeClassName: 'active-link' },
	              'Blog'
	            ),
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { className: 'nav-link', to: '/about', activeClassName: 'active-link' },
	              'About'
	            ),
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { className: 'nav-link', to: '/resume', activeClassName: 'active-link' },
	              'Resume'
	            ),
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { className: 'nav-link', to: '/contact', activeClassName: 'active-link' },
	              'Contact'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Header;
	}(_react.Component);

	exports.default = Header;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-sticky");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var divStyle = {
	  border: "1px solid #e6e6e6",
	  margin: 5,
	  padding: 5,
	  fontFamily: 'roboto',
	  background: '#ffffff'
	};

	var ArticleThumbnail = function (_Component) {
	  _inherits(ArticleThumbnail, _Component);

	  function ArticleThumbnail() {
	    _classCallCheck(this, ArticleThumbnail);

	    return _possibleConstructorReturn(this, (ArticleThumbnail.__proto__ || Object.getPrototypeOf(ArticleThumbnail)).apply(this, arguments));
	  }

	  _createClass(ArticleThumbnail, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        { style: divStyle, onClick: function onClick() {
	            _this2.props.onClick(_this2.props.index);
	          } },
	        _react2.default.createElement(
	          'h3',
	          { style: { margin: '0.2em' } },
	          this.props.heading
	        ),
	        _react2.default.createElement(
	          'h5',
	          { style: { margin: '0.4em', fontWeight: 'normal', color: '#c6c6c6' } },
	          this.props.subtitle
	        ),
	        _react2.default.createElement('img', { style: { marginTop: 10 }, src: this.props.titleImage, width: '100%' }),
	        _react2.default.createElement(
	          'p',
	          null,
	          this.props.content
	        )
	      );
	    }
	  }]);

	  return ArticleThumbnail;
	}(_react.Component);

	ArticleThumbnail.propTypes = {
	  heading: _react2.default.PropTypes.string.isRequired,
	  subtitle: _react2.default.PropTypes.string.isRequired,
	  titleImage: _react2.default.PropTypes.string,
	  content: _react2.default.PropTypes.string.isRequired
	};

	exports.default = ArticleThumbnail;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _ArticleHead = __webpack_require__(12);

	var _ArticleHead2 = _interopRequireDefault(_ArticleHead);

	var _ArticleContent = __webpack_require__(14);

	var _ArticleContent2 = _interopRequireDefault(_ArticleContent);

	__webpack_require__(15);

	__webpack_require__(16);

	var _reactFetch = __webpack_require__(17);

	var _reactFetch2 = _interopRequireDefault(_reactFetch);

	var _reactSticky = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var theprops = {
	  'heading': "Essential Guide For Designing Your Android App Architecture: MVP: Part 2",
	  'sub_heading': "This is a sub heading",
	  'header_image': "http://placehold.it/600x250"
	};

	var ArticleContainer = function (_Component) {
	  _inherits(ArticleContainer, _Component);

	  function ArticleContainer(props) {
	    _classCallCheck(this, ArticleContainer);

	    return _possibleConstructorReturn(this, (ArticleContainer.__proto__ || Object.getPrototypeOf(ArticleContainer)).call(this, props));
	  }

	  _createClass(ArticleContainer, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'article' },
	        _react2.default.createElement(
	          _reactFetch2.default,
	          { url: 'http://localhost:8080/api/article/how-to-react' },
	          _react2.default.createElement(_ArticleHead2.default, theprops),
	          _react2.default.createElement(
	            'div',
	            { className: 'left-gully' },
	            _react2.default.createElement(
	              'div',
	              { style: { marginTop: 50 }, className: 'card get-code' },
	              ' Get Code on github '
	            )
	          ),
	          _react2.default.createElement(_ArticleContent2.default, null),
	          _react2.default.createElement(
	            'div',
	            { className: 'right-gully' },
	            _react2.default.createElement(
	              'div',
	              { className: 'card share-article' },
	              ' Share on Facebook '
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return ArticleContainer;
	}(_react.Component);

	exports.default = ArticleContainer;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var hljs = __webpack_require__(13);
	//dangerouslySetInnerHTML={{__html : contentHtml}}
	var divStyle = {
	  padding: 5,
	  width: 700,
	  margin: 'auto'
	};

	var ArticleHead = function (_Component) {
	  _inherits(ArticleHead, _Component);

	  function ArticleHead() {
	    _classCallCheck(this, ArticleHead);

	    return _possibleConstructorReturn(this, (ArticleHead.__proto__ || Object.getPrototypeOf(ArticleHead)).apply(this, arguments));
	  }

	  _createClass(ArticleHead, [{
	    key: 'render',
	    value: function render() {
	      console.log(this.props.heading);
	      var heading = this.props.heading || "";
	      var subHeading = this.props.sub_heading || "";
	      var headerImage = this.props.header_image || "";

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { style: divStyle },
	          _react2.default.createElement(
	            'h1',
	            null,
	            heading
	          ),
	          _react2.default.createElement(
	            'h3',
	            { style: { color: '#a8a8a8', marginTop: '0', marginBottom: '1em', fontWeight: 300 } },
	            subHeading
	          )
	        ),
	        _react2.default.createElement('img', { src: headerImage, width: '100%' })
	      );
	    }
	  }]);

	  return ArticleHead;
	}(_react.Component);

	exports.default = ArticleHead;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("highlight.js");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var hljs = __webpack_require__(13);

	var divStyle = {
	  padding: 5,
	  width: 700,
	  margin: 'auto'
	};

	var ArticleContent = function (_Component) {
	  _inherits(ArticleContent, _Component);

	  function ArticleContent() {
	    _classCallCheck(this, ArticleContent);

	    return _possibleConstructorReturn(this, (ArticleContent.__proto__ || Object.getPrototypeOf(ArticleContent)).apply(this, arguments));
	  }

	  _createClass(ArticleContent, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.highlightCode();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var contentHtml = this.props.content;
	      return _react2.default.createElement(
	        'div',
	        { className: 'article-content' },
	        _react2.default.createElement(
	          'p',
	          null,
	          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quamquam tu hanc copiosiorem etiam soles dicere. Zenonis est, inquam, hoc Stoici. Eodem modo is enim tibi nemo dabit, quod, expetendum sit, id esse laudabile. Potius inflammat, ut coercendi magis quam dedocendi esse videantur. Non igitur potestis voluptate omnia dirigentes aut tueri aut retinere virtutem. Ut optime, secundum naturam affectum esse possit. Duo Reges: constructio interrete. Illa sunt similia: hebes acies est cuipiam oculorum, corpore alius senescit; '
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'Istam voluptatem, inquit, Epicurus ignorat? Philosophi autem in suis lectulis plerumque moriuntur. Intellegi quidem, ut propter aliam quampiam rem, verbi gratia propter voluptatem, nos amemus; Vos autem cum perspicuis dubia debeatis illustrare, dubiis perspicua conamini tollere. '
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'Ab his oratores, ab his imperatores ac rerum publicarum principes extiterunt. Quae iam oratio non a philosopho aliquo, sed a censore opprimenda est. Si longus, levis. Quem Tiberina descensio festo illo die tanto gaudio affecit, quanto L. Venit ad extremum; Hoc sic expositum dissimile est superiori. '
	        ),
	        _react2.default.createElement(
	          'ul',
	          null,
	          _react2.default.createElement(
	            'li',
	            null,
	            'Aeque enim contingit omnibus fidibus, ut incontentae sint.'
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            'Non potes, nisi retexueris illa.'
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            'Potius inflammat, ut coercendi magis quam dedocendi esse videantur.'
	          ),
	          _react2.default.createElement(
	            'li',
	            null,
	            'Frater et T.'
	          )
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'Esse enim quam vellet iniquus iustus poterat inpune. Ita relinquet duas, de quibus etiam atque etiam consideret. Neque enim disputari sine reprehensione nec cum iracundia aut pertinacia recte disputari potest. Quae quo sunt excelsiores, eo dant clariora indicia naturae. '
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'Certe non potest. Nonne igitur tibi videntur, inquit, mala? Duo enim genera quae erant, fecit tria. '
	        ),
	        _react2.default.createElement(
	          'pre',
	          null,
	          _react2.default.createElement('code', null)
	        )
	      );
	    }
	  }, {
	    key: 'highlightCode',
	    value: function highlightCode() {
	      console.log("Starting highlights");
	      var _codeBlocks = document.getElementsByTagName('code');
	      for (var i = 0, j = _codeBlocks.length; i < j; ++i) {
	        hljs.highlightBlock(_codeBlocks[i]);
	        console.log(_codeBlocks[i]);
	      }
	    }
	  }]);

	  return ArticleContent;
	}(_react.Component);

	exports.default = ArticleContent;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("react-fetch");

/***/ },
/* 18 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Header = __webpack_require__(6);

	var _Header2 = _interopRequireDefault(_Header);

	var _ArticleThumbnail = __webpack_require__(9);

	var _ArticleThumbnail2 = _interopRequireDefault(_ArticleThumbnail);

	var _ArticleContainer = __webpack_require__(11);

	var _ArticleContainer2 = _interopRequireDefault(_ArticleContainer);

	var _reactRouter = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ulStyle = {
	  width: 700,
	  margin: 'auto',
	  listStyle: 'none',
	  padding: 0
	};
	var demo_article = [{
	  index: 0,
	  heading: "How to create a ReactJS application.",
	  subtitle: "With es6 standad of javascript",
	  titleImage: "http://placehold.it/350x150",
	  content: "Click on the title to go to the full story."
	}, {
	  index: 1,
	  heading: "How to create a AngularJS application.",
	  subtitle: "With es6 standad of javascript",
	  titleImage: "http://placehold.it/350x150",
	  content: "Click on the title to go to the full story."
	}, {
	  index: 2,
	  heading: "How to create a Android application.",
	  subtitle: "With es6 standad of javascript",
	  titleImage: "http://placehold.it/350x150",
	  content: "Click on the title to go to the full story."
	}];

	var Home = function (_React$Component) {
	  _inherits(Home, _React$Component);

	  function Home(props) {
	    _classCallCheck(this, Home);

	    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

	    _this.state = {
	      showArticle: -1
	    };
	    return _this;
	  }

	  _createClass(Home, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'ul',
	        { style: ulStyle },
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/article/Hell-yeah' },
	            'GO TO'
	          ),
	          _react2.default.createElement(_ArticleThumbnail2.default, _extends({}, demo_article[0], { onClick: this.onClick }))
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(_ArticleThumbnail2.default, _extends({}, demo_article[1], { onClick: this.onClick }))
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(_ArticleThumbnail2.default, _extends({}, demo_article[2], { onClick: this.onClick }))
	        )
	      );
	    }
	  }]);

	  return Home;
	}(_react2.default.Component);

	exports.default = Home;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("jsonfile");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ }
/******/ ]);