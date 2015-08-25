angular.module(
    'replx',
    ['ui.router',
     'ngResource',
     'ngAnimate',
     'ngSanitize',
     'ui.bootstrap',
     'restangular',
     'ui.ace'     
		 ])

.constant("apiRoot", "../../replx/")

.config(
    [ '$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
          $stateProvider
		  
          .state('home', {
            url : "",
            controller : "HomeCtrl"
          })
		  
          .state('search', {
            url : "/search?q",
            templateUrl : '/static/replx/templates/search.xhtml',
            controller : "SearchCtrl"
          })

          .state('error', {
            url : "/error",
            templateUrl : '/static/replx/templates/error.xhtml'
          })

          .state('about', {
            url : "/about",
            templateUrl : '/static/replx/templates/about.xhtml',
			 ncyBreadcrumb: { label: 'Home',icon:'glyphicon glyphicon-home'}
          })

          .state('404', {
            url : "/404",
            templateUrl : '/static/replx/templates/404.xhtml'
          })
             .state('term', {
            url : "/term",
            templateUrl : '/static/replx/templates/term.xhtml',
            controller : "TermCtrl"
          })
          ;
        //  $urlRouterProvider.when('', '/about');  
          $urlRouterProvider.otherwise('/404');  
          // use the HTML5 History API
          // $locationProvider.html5Mode(true);
        } ])
		
.controller("HomeCtrl",
    [ "$scope", "$location", function($scope, $location) {
      console.log("HomeCtrl");
     $location.path('/about')
    } ])

 .controller("TermCtrl",
    [ "$scope", "$location", function($scope, $location) {
      console.log("TermCtrl");
      $scope.modes = ['XQuery', 'XML', 'Javascript'];
      $scope.mode = $scope.modes[0];
     
     
      // The ui-ace option
      $scope.aceOption = {
        mode: $scope.mode.toLowerCase(),
        workerPath: '/static/replx/work',
        onLoad: function (_ace) {
     
          // HACK to have the ace instance in the scope...
          $scope.modeChanged = function () {
            _ace.getSession().setMode("ace/mode/" + $scope.mode.toLowerCase());
          };
     
        },
      require: ['ace/ext/language_tools'],
      advanced: {
          enableSnippets: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true
      }
      };
     
      // Initial code content...
      $scope.aceModel = '(: just add xquery :)' ;
    } ])
       
.controller("AppController",
    [ "$scope", "$location", function($scope, $location) {
      console.log("AppController");
      $scope.search = {};
      $scope.doSearch = function() {
        $location.path("/search").search({
          q : $scope.search.q
        });
      };
    } ])

.controller(
    "SearchCtrl",
    [ 'Restangular', '$location', '$scope', '$stateParams',
        function(Restangular, $location, $scope, $stateParams) {
          console.log("Search Init", $stateParams);
          $scope.search.q = $stateParams.q;
          function search(q) {
            console.log("search:",$scope.search );
            Restangular.all("search").getList({
              q : $scope.search.q
            }).then(function(d) {
              console.log(d);
              $scope.results = d;
            })
          }
          ;

          $scope.doSearch = function() {
            search($scope.search.q);
          };
          search($scope.search.q);
        } ])
       
;
