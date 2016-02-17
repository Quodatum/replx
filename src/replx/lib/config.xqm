(:~ 
 : config stuff
 :@author Andy Bunce
 :@version 0.1
 :)
module namespace cnf = 'quodatum.app.config';

declare namespace pkg="http://expath.org/ns/pkg";
declare variable $cnf:name:="replx";

declare variable $cnf:package:=fn:doc("expath-pkg.xml")/pkg:package;
declare variable $cnf:includes:=fn:doc("./templates/includes.xml")/includes;

declare %updating function cnf:write-log($text as xs:string){
    admin:write-log("[" || $cnf:name || "] " || $text)
}; 

(:~ config values for render :)
declare  function cnf:settings(){
   map{
    "version":$cnf:package/@version/fn:string(),
    "static":"/static/doc/",
    "incl-css":$cnf:includes/css/*,
    "incl-js":$cnf:includes/js/*
   }
}; 
