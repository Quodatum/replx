/*
*
*/

angular.module(
    'replx.term',
    ['ui.router',
     'restangular',
     'ui.ace'
     ])
     
.config(
    [ '$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
          $stateProvider
          
          .state('term', {
            url : "/term",
            templateUrl : '/static/replx/feats/term/term.html',
            controller : "TermCtrl"
          })
    }])
    
.controller("TermCtrl",
    [ "$scope", "$location", function($scope, $location) {
      console.log("TermCtrl");
      $scope.modes = ['XQuery', 'XML', 'Javascript'];
      $scope.mode = $scope.modes[0];
     
      $scope.send=function(){
        console.log("SEND",$scope.aceModel); 
       };
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
      $scope.aceModel = '(: just add xquery2 :)' ;
      
     
       $scope.back=function(){
         console.log("back"); 
      };
    } ])
       
