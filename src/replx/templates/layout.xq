declare  variable $body external :="{body}";
declare  variable $version external :="{verson}";
declare variable $base external :="/replx/";
declare variable $static external :="/static/replx/";
declare variable $incl-css as element()* external :=();
declare variable $incl-js as element()* external :=();


<html ng-app="replx" ng-controller="rootController">
<head>
<meta charset="utf-8" />
 <base href="{$base}" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="REPL for BaseX" />
<meta name="author" content="andy bunce." />
<title>REPLx (v{$version})</title>
<link rel="shortcut icon" href="{$static}replx.png" />
<!-- component css -->
{$incl-css}

<link href="{$static}app.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
  (function(i,s,o,g,r,a,m){{i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){{
  (i[r].q=i[r].q||[]).push(arguments)}},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  }})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-51544119-2', 'auto');
</script>

</head>
<body  >
    {$body}
    <!-- start component js -->
    {$incl-js}
     <!-- app js -->
      <script src="{$static}app.js"></script>
  
</body>
</html>