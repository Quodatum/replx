declare  variable $body external :="{body}";
declare  variable $version external :="{verson}";
declare variable $base external :="/replx/";
declare variable $static external :="/static/replx/";
declare variable $css as element()* external :=();
declare variable $js as element()* external :=();


<html >
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="REPL for BaseX" />
<meta name="author" content="andy bunce." />
<title>REPLx (v{$version})</title>
<link rel="shortcut icon" href="{$static}replx.png" />
<!-- component css -->
{$css}

<link href="{$static}app.css" rel="stylesheet" type="text/css" />

<script type="text/javascript">
  (function(i,s,o,g,r,a,m){{i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){{
  (i[r].q=i[r].q||[]).push(arguments)}},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  }})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-51544119-2', 'auto');
</script>

</head>
<body  data-version="{$version}">
    {$body}
    <!-- start component js -->
    {$js}
     <!-- app js -->
      <script src="{$static}react-libs/ace-react.js" type="text/babel"></script>
    <script src="{$static}react-libs/ace.jsx" type="text/babel"></script>

    <script src="{$static}react-libs/react-tabs.js" type="text/javascript"></script>
   <script src="{$static}react-libs/quodatum-utils.js" type="text/babel"></script>
  
      <script src="{$static}app.js" type="text/babel"></script>
  
</body>
</html>