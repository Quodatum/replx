declare variable $static external :="/static/repl/";
<div class="container">
      <div class="container-fluid" ng-include="'{$static}templates/navbar.xhtml'">
        </div>
      <div class="center-container">
        <ui-view class="view-animate" style="position:relative;">Loading...</ui-view>
        </div>
      <div growl="growl"/>
</div>
