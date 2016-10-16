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

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _session = __webpack_require__(1);

	var _session2 = _interopRequireDefault(_session);

	var _admin = __webpack_require__(2);

	var _admin2 = _interopRequireDefault(_admin);

	var _try = __webpack_require__(3);

	var _try2 = _interopRequireDefault(_try);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               replx app
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               abunce sept 2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

	var Button = ReactBootstrap.Button;
	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var IndexRoute = _ReactRouter.IndexRoute;
	var Link = _ReactRouter.Link;
	var useRouterHistory = _ReactRouter.useRouterHistory;
	var _History = History;
	var createHistory = _History.createHistory;


	var apiBase = "/replx/api/";

	var axios_json = { headers: { accept: 'application/json' } };

	// http://stackoverflow.com/questions/36158945/double-base-path-when-using-push-with-basename/36159382#36159382
	var appHistory = useRouterHistory(createHistory)({
	  basename: "/replx/ui"
	});

	// https://github.com/ReactTraining/react-router/issues/394#issuecomment-220221604    
	function hashLinkScroll() {
	  var hash = window.location.hash;

	  if (hash !== '') {
	    // Push onto callback queue so it runs after the DOM is updated,
	    // this is required when navigating from a different page so that
	    // the element is rendered on the page before trying to getElementById.
	    setTimeout(function () {
	      var id = hash.replace('#', '');
	      var element = document.getElementById(id);
	      if (element) element.scrollIntoView();
	    }, 0);
	  }
	}

	var App = function (_DefaultApp) {
	  _inherits(App, _DefaultApp);

	  function App(props, context) {
	    _classCallCheck(this, App);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props, context));

	    _this.state = { msg: "Welcome to repl.X +",
	      q: "in app" };
	    return _this;
	  }

	  _createClass(App, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "HolyGrail" },
	        React.createElement(
	          "header",
	          null,
	          React.createElement(HeaderItem, { location: this.props.location.pathname })
	        ),
	        this.props.children,
	        React.createElement(
	          "footer",
	          { className: "infoline" },
	          this.state.msg
	        )
	      );
	    }
	  }]);

	  return App;
	}(DefaultApp);

	;

	var About = function (_React$Component) {
	  _inherits(About, _React$Component);

	  function About() {
	    _classCallCheck(this, About);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(About).apply(this, arguments));
	  }

	  _createClass(About, [{
	    key: "render",
	    value: function render() {
	      var version = document.body.getAttribute("data-version");
	      return React.createElement(
	        GrailBody,
	        null,
	        React.createElement(
	          PanelItem,
	          { title: "About REPL.x (version:  " + version + ")", flex: "1 0 60em" },
	          React.createElement(
	            "p",
	            null,
	            "Provides:"
	          ),
	          React.createElement(
	            "ul",
	            null,
	            React.createElement(
	              "li",
	              null,
	              "XQuery evaluation."
	            ),
	            React.createElement(
	              "li",
	              null,
	              React.createElement(
	                Link,
	                { to: "/admin" },
	                "admin"
	              ),
	              "."
	            ),
	            React.createElement(
	              "li",
	              null,
	              React.createElement(
	                Link,
	                { to: "/treetest" },
	                "Treetest"
	              ),
	              "."
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return About;
	}(React.Component);

	var TreeTest = function (_React$Component2) {
	  _inherits(TreeTest, _React$Component2);

	  function TreeTest() {
	    _classCallCheck(this, TreeTest);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TreeTest).apply(this, arguments));
	  }

	  _createClass(TreeTest, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        GrailBody,
	        null,
	        React.createElement(
	          "div",
	          null,
	          "Tree here"
	        )
	      );
	    }
	  }]);

	  return TreeTest;
	}(React.Component);

	;

	var Library = function (_React$Component3) {
	  _inherits(Library, _React$Component3);

	  function Library() {
	    _classCallCheck(this, Library);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Library).apply(this, arguments));
	  }

	  _createClass(Library, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        GrailBody,
	        null,
	        React.createElement(
	          "div",
	          null,
	          "Library sources:",
	          React.createElement(
	            ReactTabs.Tabs,
	            null,
	            React.createElement(
	              ReactTabs.TabList,
	              null,
	              React.createElement(
	                ReactTabs.Tab,
	                null,
	                React.createElement(
	                  CountLabel,
	                  { count: 4, title: "NVDL messages" },
	                  "XPath"
	                )
	              ),
	              React.createElement(
	                ReactTabs.Tab,
	                null,
	                React.createElement(
	                  CountLabel,
	                  { count: 5, labelCls: "label label-info",
	                    title: "Schematron messages svrl:successful-report messages" },
	                  "XQuery"
	                )
	              ),
	              React.createElement(
	                ReactTabs.Tab,
	                null,
	                React.createElement(
	                  CountLabel,
	                  { count: 5,
	                    title: "Schematron messages svrl:failed-assert messages" },
	                  "Repository"
	                )
	              )
	            ),
	            React.createElement(
	              ReactTabs.TabPanel,
	              null,
	              "content"
	            ),
	            React.createElement(
	              ReactTabs.TabPanel,
	              null,
	              "content1"
	            ),
	            React.createElement(
	              ReactTabs.TabPanel,
	              null,
	              "content2",
	              React.createElement(
	                Button,
	                { bsStyle: "warning" },
	                "Warning"
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Library;
	}(React.Component);

	;

	var Search = function (_React$Component4) {
	  _inherits(Search, _React$Component4);

	  function Search() {
	    _classCallCheck(this, Search);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Search).apply(this, arguments));
	  }

	  _createClass(Search, [{
	    key: "render",
	    value: function render() {

	      console.log("search", this.props);
	      var q = this.props.location.query.q;
	      return React.createElement(
	        GrailBody,
	        null,
	        React.createElement(
	          "div",
	          null,
	          "Search here: ",
	          q
	        )
	      );
	    }
	  }]);

	  return Search;
	}(React.Component);

	;

	ReactDOM.render(React.createElement(
	  Router,
	  { history: appHistory, onUpdate: hashLinkScroll },
	  React.createElement(
	    Route,
	    { path: "/", component: App },
	    React.createElement(IndexRoute, { component: About }),
	    React.createElement(Route, { path: "about", component: About }),
	    React.createElement(Route, { path: "session", component: _session2.default }),
	    React.createElement(Route, { path: "validate", component: _try2.default }),
	    React.createElement(Route, { path: "library", component: Library }),
	    React.createElement(Route, { path: "admin", component: _admin2.default }),
	    React.createElement(Route, { path: "treetest", component: TreeTest }),
	    React.createElement(Route, { path: "search", component: Search }),
	    React.createElement(Route, { path: "error", component: ServerError }),
	    React.createElement(Route, { path: "*", component: NoMatch })
	  )
	), document.getElementById('target'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// enter query, execute on server, display results
	var Session = function (_React$Component) {
	  _inherits(Session, _React$Component);

	  function Session(props) {
	    _classCallCheck(this, Session);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Session).call(this, props));

	    _this.state = { value: "", chat: [] };
	    _this.send = _this.send.bind(_this);
	    _this.onValue = _this.onValue.bind(_this);
	    _this.onClear = _this.onClear.bind(_this);
	    _this.onClick = _this.onClick.bind(_this);
	    return _this;
	  }

	  // request session values


	  _createClass(Session, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var that = this;
	      that.context.onLog("Requesting queries...");
	      that.context.axios.get("data/queries" + this.props.location.search, axios_json).then(function (r) {
	        var u = that.state.chat.slice(0);
	        that.setState({ chat: r.data.items });
	        that.context.onLog("queries loaded.");
	      }).catch(function (error) {
	        console.log(error);
	        alert("Get queries error");
	      });
	    }
	  }, {
	    key: "send",
	    value: function send() {
	      var that = this;
	      var value = this.state.value;
	      var body = Qs.stringify({ value: value });
	      that.context.onLog("eval...");
	      this.context.axios.post("query", body, axios_json).then(function (r) {
	        console.log("send", r);
	        that.context.onLog("result returned");
	        that.setState(function (previousState, currentProps) {
	          var chat = { created: new Date(), query: value, id: r.data.id, result: r.data.result, error: r.data.error };
	          var u = previousState.chat.concat(chat);
	          return { chat: u, value: r.data.error ? previousState.value : "" };
	        });
	      });
	    }
	  }, {
	    key: "onValue",
	    value: function onValue(value) {
	      // console.log("value:",value);
	      this.state.value = value;
	    }
	  }, {
	    key: "onClear",
	    value: function onClear(value) {
	      console.log("value:", value);
	      this.setState({ value: "" });
	    }
	  }, {
	    key: "onClick",
	    value: function onClick(value) {
	      var item = this.state.chat.find(function (v) {
	        return v.id == value;
	      });
	      console.log("value:", item);
	      this.setState({ value: item.query });
	      alert("click" + value);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var rows = [],
	          that = this;
	      //console.log("************",this.state.chat);
	      this.state.chat.forEach(function (chat) {
	        rows.push(React.createElement(SessionItem, { chat: chat, key: chat.id, onClick: that.onClick.bind(null, chat.id) }));
	      });
	      return React.createElement(
	        GrailBody,
	        null,
	        React.createElement(
	          "div",
	          { className: "HolyGrail-content", style: { display: "flex", flexDirection: "column" } },
	          React.createElement(
	            "div",
	            { style: { flex: "1", display: "flex", flexDirection: "column" } },
	            React.createElement(
	              "div",
	              null,
	              "The log ",
	              this.state.chat.length,
	              React.createElement(
	                Link,
	                { to: "/session/#run" },
	                "#"
	              )
	            ),
	            React.createElement(
	              "div",
	              { style: { flex: "1", height: "100%", backgroundColor: "yellow" } },
	              React.createElement(
	                "div",
	                { className: "acewrap container-fluid", style: { overflow: "auto" } },
	                rows
	              )
	            )
	          ),
	          React.createElement(
	            "div",
	            { style: { border: '1px solid green', backgroundColor: "#d5f5e3" }, id: "run" },
	            React.createElement(AceEditor2, { title: "test", mode: "xquery",
	              code: this.state.value, onValue: this.onValue, onSubmit: this.send }),
	            React.createElement(
	              "div",
	              { className: "btn-group", role: "group", "aria-label": "Clear" },
	              React.createElement(
	                "button",
	                { className: "btn btn-sm btn-info", onClick: this.onClear },
	                "clear"
	              )
	            ),
	            React.createElement(
	              "div",
	              { className: "btn-group", role: "group", "aria-label": "Run" },
	              React.createElement(
	                "button",
	                { className: "btn btn-sm btn-info", onClick: this.send },
	                "run"
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Session;
	}(React.Component);

	;
	Session.contextTypes = {
	  onLog: React.PropTypes.func,
	  axios: React.PropTypes.func
	};

	var SessionItem = function (_React$Component2) {
	  _inherits(SessionItem, _React$Component2);

	  function SessionItem() {
	    _classCallCheck(this, SessionItem);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SessionItem).apply(this, arguments));
	  }

	  _createClass(SessionItem, [{
	    key: "render",
	    value: function render() {
	      var chat = this.props.chat;
	      return React.createElement(
	        "div",
	        null,
	        React.createElement(
	          "div",
	          { className: "row" },
	          React.createElement(
	            "div",
	            { className: "col-md-1", title: chat.id + ": " + chat.created },
	            React.createElement(
	              "button",
	              { onClick: this.props.onClick },
	              "id:",
	              chat.id
	            )
	          ),
	          React.createElement(
	            "div",
	            { className: "col-md-11" },
	            React.createElement(
	              "pre",
	              null,
	              chat.query
	            )
	          )
	        ),
	        React.createElement(
	          "div",
	          { className: "well", style: { whiteSpace: "pre-wrap", fontFamily: "monospace" } },
	          chat.result,
	          React.createElement(
	            "div",
	            null,
	            Qs.stringify(chat.error)
	          )
	        )
	      );
	    }
	  }]);

	  return SessionItem;
	}(React.Component);

	;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// admin tools @TODO security
	var Admin = function (_React$Component) {
	    _inherits(Admin, _React$Component);

	    function Admin(props) {
	        _classCallCheck(this, Admin);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Admin).call(this, props));

	        _this.loadEls = _this.loadEls.bind(_this);
	        _this.onChange = _this.onChange.bind(_this);
	        _this.onValueClick = _this.onValueClick.bind(_this);
	        _this.state = {
	            content: "",
	            mode: "xquery",
	            value: "one"
	        };
	        return _this;
	    }

	    _createClass(Admin, [{
	        key: "onChange",
	        value: function onChange(value) {
	            this.context.onLog("on change");
	            this.setState({
	                value: value
	            });
	        }
	    }, {
	        key: "onValueClick",
	        value: function onValueClick(option) {
	            console.log("value", option);
	            this.context.onLog("on value control: " + option.label);
	        }
	    }, {
	        key: "loadEls",
	        value: function loadEls(q, callback) {
	            this.context.axios.get("elements", axios_json).then(function (r) {
	                var opts = r.data.items;

	                //console.log(r,opts,callback);
	                callback(null, { options: opts, complete: true });
	            });
	        }
	    }, {
	        key: "scan",
	        value: function scan() {
	            var task = "scan";
	            this.context.axios.post(apiBase + "task", Qs.stringify({ task: task })).then(function (r) {
	                alert("not yet:" + task);
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                GrailBody,
	                null,
	                React.createElement(
	                    PanelItem,
	                    { title: "Admin Tasks", flex: "0 0 20em" },
	                    React.createElement(
	                        "button",
	                        { onClick: this.scan },
	                        "Rescan db"
	                    ),
	                    React.createElement("hr", null),
	                    React.createElement("hr", null),
	                    React.createElement(Select.Async, { multi: false, value: this.state.value,
	                        onChange: this.onChange, onValueClick: this.onValueClick, autoBlur: true,
	                        loadOptions: this.loadEls, minimumInput: 1, backspaceRemoves: false })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "HolyGrail-content" },
	                    React.createElement(AceEditor, { code: this.state.content, mode: this.state.mode, wrap: true, readOnly: false })
	                )
	            );
	        }
	    }]);

	    return Admin;
	}(React.Component);

	;
	Admin.contextTypes = {
	    onLog: React.PropTypes.func,
	    axios: React.PropTypes.func
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Edit UI and validate on server
	 */
	var Try = function (_React$Component) {
	    _inherits(Try, _React$Component);

	    function Try(props) {
	        _classCallCheck(this, Try);

	        // Manually bind this method to the component instance...
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Try).call(this, props));

	        _this.validate = _this.validate.bind(_this);
	        _this.onValue = _this.onValue.bind(_this);
	        _this.state = {
	            xml: '<whatever>Am I valid?</whatever>',
	            validations: null,
	            localerr: null
	        };
	        return _this;
	    }

	    _createClass(Try, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var that = this;
	            console.log(this.props);
	            var uri = this.props.location.query.uri;
	            if (uri) {
	                that.context.axios.get("report" + uri, axios_json).then(function (r) {
	                    that.setState({ xml: r.data.xml, validations: r.data.validations });
	                });
	            }
	        }
	        // @return boolean xml can be parsed

	    }, {
	        key: "checkXML",
	        value: function checkXML(xml) {
	            var oParser = new DOMParser();
	            var oDOM = oParser.parseFromString(xml, "text/xml");
	            return !(oDOM.documentElement.nodeName == "parsererror");
	        }
	    }, {
	        key: "validate",
	        value: function validate() {
	            var that = this;
	            var xml = this.state.xml;
	            if (this.checkXML(xml)) {
	                that.context.onLog("Sending validation request");
	                var ms = +new Date();
	                that.context.axios.post("validate", Qs.stringify({ value: this.state.xml })).then(function (r) {
	                    that.setState({ validations: r.data.validations, localerr: null });
	                    ms = +new Date() - ms;
	                    that.context.onLog("Done. (" + ms + "ms)");
	                });
	            } else {
	                that.setState({ validations: null, localerr: "XML is invalid, not sent." });
	            }
	        }
	    }, {
	        key: "onValue",
	        value: function onValue(value) {
	            this.state.xml = value;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                GrailBody,
	                null,
	                React.createElement(
	                    "div",
	                    { className: "HolyGrail-content" },
	                    React.createElement(AceEditor, { mode: "xml", code: this.state.xml,
	                        onValue: this.onValue, title: "(entered)",
	                        wrap: true, readOnly: false })
	                ),
	                React.createElement(
	                    PanelItem,
	                    { title: "Actions", flex: "0 0 24em" },
	                    "Validate against:",
	                    React.createElement(
	                        "ul",
	                        null,
	                        React.createElement(
	                            "li",
	                            null,
	                            React.createElement(
	                                "code",
	                                null,
	                                "?"
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        "button",
	                        { onClick: this.validate, className: "btn btn-default btn-sm" },
	                        "Validate"
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "bg-danger" },
	                        this.state.localerr
	                    )
	                )
	            );
	        }
	    }]);

	    return Try;
	}(React.Component);

	;
	Try.contextTypes = {
	    onLog: React.PropTypes.func,
	    axios: React.PropTypes.func
	};

/***/ }
/******/ ]);