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
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/*
	Consignment validator app
	abunce july 2016
	*/

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var IndexRoute = _ReactRouter.IndexRoute;
	var Link = _ReactRouter.Link;
	var browserHistory = _ReactRouter.browserHistory;
	var useRouterHistory = _ReactRouter.useRouterHistory;
	var _history = history;
	var createHistory = _history.createHistory;


	var apiBase = "/replx/api/";

	var axios_json = { headers: { accept: 'application/json' } };

	var App = function (_React$Component) {
		_inherits(App, _React$Component);

		function App(props) {
			_classCallCheck(this, App);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

			_this.onLog = _this.onLog.bind(_this);
			// customized axios instance
			_this.axios = axios.create({
				baseURL: apiBase,
				timeout: 10000,
				headers: { 'X-Custom-Header': 'replx' }
			});
			var that = _this;
			_this.axios.interceptors.response.use(function (response) {
				// Do something with response data
				//console.log("response");
				return response;
			}, function (error) {
				// Do something with response error
				console.log("axios error:", error.response);

				that.props.history.push({
					pathname: "/replx/ui/error",
					state: { err: error.response } });
				//return Promise.reject(error);
			});
			_this.state = { msg: "Welcome to REPLX." };
			return _this;
		}

		_createClass(App, [{
			key: 'getChildContext',
			value: function getChildContext() {
				return { onLog: this.onLog,
					axios: this.axios };
			}
		}, {
			key: 'onLog',
			value: function onLog(msg) {
				this.setState({ msg: msg });
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'HolyGrail' },
					React.createElement(
						'header',
						null,
						React.createElement(HeaderItem, { location: this.props.location.pathname })
					),
					this.props.children,
					React.createElement(
						'footer',
						{ className: 'infoline' },
						this.state.msg
					)
				);
			}
		}]);

		return App;
	}(React.Component);

	;
	App.childContextTypes = {
		onLog: React.PropTypes.func,
		axios: React.PropTypes.func
	};

	var HeaderItem = function (_React$Component2) {
		_inherits(HeaderItem, _React$Component2);

		function HeaderItem() {
			_classCallCheck(this, HeaderItem);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(HeaderItem).apply(this, arguments));
		}

		_createClass(HeaderItem, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'nav',
					{ className: 'navbar navbar-default', style: { marginBottom: "0px" } },
					React.createElement(
						'div',
						{ className: 'navbar-header' },
						React.createElement(
							Link,
							{ to: '/replx/ui', className: 'navbar-brand' },
							'REPLX'
						)
					),
					React.createElement(
						'ul',
						{ className: 'nav navbar-nav' },
						React.createElement(
							'li',
							null,
							React.createElement(
								Link,
								{ to: '/replx/ui/session', activeClassName: 'active-link',
									title: 'Enter your own Xquery' },
								'Session'
							)
						),
						React.createElement(
							'li',
							null,
							React.createElement(
								Link,
								{ to: '/replx/ui/try', activeClassName: 'active-link',
									title: 'Enter your own XML' },
								'Edit'
							)
						)
					),
					React.createElement(
						'ul',
						{ className: 'nav navbar-nav', style: { float: "right" } },
						React.createElement(
							'li',
							null,
							React.createElement(
								Link,
								{ to: '/replx/ui/about', activeClassName: 'active-link' },
								'About'
							)
						)
					)
				);
			}
		}]);

		return HeaderItem;
	}(React.Component);

	;

	var About = function (_React$Component3) {
		_inherits(About, _React$Component3);

		function About() {
			_classCallCheck(this, About);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(About).apply(this, arguments));
		}

		_createClass(About, [{
			key: 'render',
			value: function render() {
				var version = document.body.getAttribute("data-version");
				return React.createElement(
					GrailBody,
					null,
					React.createElement(
						PanelItem,
						{ title: 'About REPLX', flex: '1 0 60em' },
						React.createElement(
							'h1',
							null,
							'ReplX ',
							React.createElement(
								'small',
								null,
								'(version:  ',
								React.createElement(
									Link,
									{ to: '/replx/ui/admin' },
									version
								),
								')'
							)
						),
						React.createElement(
							'p',
							null,
							'Provides:'
						),
						React.createElement(
							'ul',
							null,
							React.createElement(
								'li',
								null,
								'Xquery edit.'
							)
						)
					)
				);
			}
		}]);

		return About;
	}(React.Component);

	var Session = function (_React$Component4) {
		_inherits(Session, _React$Component4);

		function Session() {
			_classCallCheck(this, Session);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Session).apply(this, arguments));
		}

		_createClass(Session, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					GrailBody,
					null,
					React.createElement(
						'div',
						null,
						React.createElement(ReactAce, null)
					)
				);
			}
		}]);

		return Session;
	}(React.Component);

	;

	var NoMatch = function (_React$Component5) {
		_inherits(NoMatch, _React$Component5);

		function NoMatch() {
			_classCallCheck(this, NoMatch);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(NoMatch).apply(this, arguments));
		}

		_createClass(NoMatch, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					GrailBody,
					null,
					React.createElement(
						'div',
						null,
						'404: Not found',
						React.createElement(
							Link,
							{ to: '/replx/ui' },
							'Home'
						)
					)
				);
			}
		}]);

		return NoMatch;
	}(React.Component);

	;

	var ServerError = function (_React$Component6) {
		_inherits(ServerError, _React$Component6);

		function ServerError() {
			_classCallCheck(this, ServerError);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(ServerError).apply(this, arguments));
		}

		_createClass(ServerError, [{
			key: 'render',
			value: function render() {
				console.log("ServerError", this);
				return React.createElement(
					GrailBody,
					null,
					React.createElement(
						'div',
						null,
						'Server Error',
						React.createElement(
							Link,
							{ to: '/replx/ui' },
							'Home'
						),
						React.createElement(
							'pre',
							null,
							this.props.location.state ? this.props.location.state.err.data : "No error found"
						)
					)
				);
			}
		}]);

		return ServerError;
	}(React.Component);

	;
	ServerError.contextTypes = {
		onLog: React.PropTypes.func,
		axios: React.PropTypes.func
	};
	ServerError.state = { err: "n/a" };

	/**
	 * Edit UI and validate on server
	 */

	var Try = function (_React$Component7) {
		_inherits(Try, _React$Component7);

		function Try(props) {
			_classCallCheck(this, Try);

			// Manually bind this method to the component instance...
			var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(Try).call(this, props));

			_this7.validate = _this7.validate.bind(_this7);
			_this7.onValue = _this7.onValue.bind(_this7);
			return _this7;
		}

		_createClass(Try, [{
			key: 'componentDidMount',
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
			key: 'checkXML',
			value: function checkXML(xml) {
				var oParser = new DOMParser();
				var oDOM = oParser.parseFromString(xml, "text/xml");
				return !(oDOM.documentElement.nodeName == "parsererror");
			}
		}, {
			key: 'validate',
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
			key: 'onValue',
			value: function onValue(value) {
				this.state.xml = value;
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					GrailBody,
					null,
					React.createElement(
						'div',
						{ className: 'HolyGrail-content' },
						React.createElement(AceEditor, { mode: 'xml', code: this.state.xml,
							onValue: this.onValue, title: '(entered)',
							wrap: true, readOnly: false })
					),
					React.createElement(
						PanelItem,
						{ title: 'Actions', flex: '0 0 24em' },
						'Validate against:',
						React.createElement(
							'ul',
							null,
							React.createElement(
								'li',
								null,
								React.createElement(
									'code',
									null,
									'?'
								)
							)
						),
						React.createElement(
							'button',
							{ onClick: this.validate, className: 'btn btn-default btn-sm' },
							'Validate'
						),
						React.createElement(
							'div',
							{ className: 'bg-danger' },
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
	Try.state = {
		xml: '<whatever>Am I valid?</whatever>',
		validations: null,
		localerr: null
	};

	// admin tools @TODO security

	var Admin = function (_React$Component8) {
		_inherits(Admin, _React$Component8);

		function Admin(props) {
			_classCallCheck(this, Admin);

			var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(Admin).call(this, props));

			_this8.loadEls = _this8.loadEls.bind(_this8);
			_this8.onChange = _this8.onChange.bind(_this8);
			_this8.onValueClick = _this8.onValueClick.bind(_this8);
			_this8.state = {
				content: "",
				mode: "xquery",
				value: "one"
			};
			return _this8;
		}

		_createClass(Admin, [{
			key: 'onChange',
			value: function onChange(value) {
				this.context.onLog("on change");
				this.setState({
					value: value
				});
			}
		}, {
			key: 'onValueClick',
			value: function onValueClick(option) {
				console.log("value", option);
				this.context.onLog("on value control: " + option.label);
			}
		}, {
			key: 'loadEls',
			value: function loadEls(q, callback) {
				this.context.axios.get("elements", axios_json).then(function (r) {
					var opts = r.data.items;

					//console.log(r,opts,callback);
					callback(null, { options: opts, complete: true });
				});
			}
		}, {
			key: 'scan',
			value: function scan() {
				var task = "scan";
				this.context.axios.post(apiBase + "task", Qs.stringify({ task: task })).then(function (r) {
					alert("not yet:" + task);
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					GrailBody,
					null,
					React.createElement(
						PanelItem,
						{ title: 'Admin Tasks', flex: '0 0 20em' },
						React.createElement(
							'button',
							{ onClick: this.scan },
							'Rescan db'
						),
						React.createElement('hr', null),
						React.createElement('hr', null),
						React.createElement(Select.Async, { multi: false, value: this.state.value,
							onChange: this.onChange, onValueClick: this.onValueClick, autoBlur: true,
							loadOptions: this.loadEls, minimumInput: 1, backspaceRemoves: false })
					),
					React.createElement(
						'div',
						{ className: 'HolyGrail-content' },
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

	ReactDOM.render(React.createElement(
		Router,
		{ history: browserHistory },
		React.createElement(
			Route,
			{ path: '/replx/ui', component: App },
			React.createElement(IndexRoute, { component: About }),
			React.createElement(Route, { path: 'about', component: About }),
			React.createElement(Route, { path: 'try', component: Try }),
			React.createElement(Route, { path: 'session', component: Session }),
			React.createElement(Route, { path: 'admin', component: Admin }),
			React.createElement(Route, { path: 'error', component: ServerError }),
			React.createElement(Route, { path: '*', component: NoMatch })
		)
	), document.getElementById('target'));

/***/ }
/******/ ]);