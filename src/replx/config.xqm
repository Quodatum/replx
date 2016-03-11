(:~ 
 : config stuff
 :@author Andy Bunce
 :@version 0.1
 :)
module namespace cnf = 'quodatum.app.config';
import module namespace cmpx="quodatum.cmpx";

declare namespace pkg="http://expath.org/ns/pkg";
declare variable $cnf:name:="replx";

declare variable $cnf:package:=fn:doc("expath-pkg.xml")/pkg:package;


declare %updating function cnf:write-log($text as xs:string){
    admin:write-log("[" || $cnf:name || "] " || $text)
}; 

(:~ config values for render :)
declare  function cnf:settings(){
  let $incl:=cmpx:app($cnf:name,map{"offline":fn:true()})
   return map{
    "version":$cnf:package/@version/fn:string(),
    "static":"/static/replx/",
    "incl-css":$incl?css,
    "incl-js":$incl?js
   }
}; 

