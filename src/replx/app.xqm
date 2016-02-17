(:~ 
 : A RESTXQ interface for documentation
 :@author Andy Bunce
 :@version 0.1
 :)
module namespace dr = 'quodatum.repl.rest';

import module namespace cnf = 'quodatum.app.config' at 'config.xqm';
import module namespace txq = 'quodatum.txq' at "lib/txq.xqm";
import module namespace dice = 'quodatum.web.dice/v2' at "lib/dice.xqm";
import module namespace web = 'quodatum.web.utils4' at 'lib/webutils.xqm';


(:~
 : The doc home page as html. The UI entry point.
 :)
declare  
 %rest:GET %rest:path("replx")
 %output:method("html")
 %output:version("5.0")
function dr:doc(){
     (: update model.xqm :)
     let $_:=fn:trace(fn:current-dateTime(),"*** START: ")
     (: @TODO check db exist app status et :)                 
     return 
             render("main.xq",map{})
};


(:~
 : Evaluates a query and returns the result.
 : @param  $query  query
 : @return result of query
 :)
declare
  %rest:POST("{$query}")
  %rest:path("/replx/eval-query")
  %output:method("text")
function dr:eval-query(
  $query  as xs:string?
) as xs:string {
  util:query($query)
};

(:~
 : html rendering
 :) 
declare function dr:render($template,$map){
    let $defaults:=cnf:settings()
    let $map:=map:merge(($map,$defaults))
    return (web:method("html"),txq:render(
                fn:resolve-uri("./templates/" || $template)
                ,$map
                ,fn:resolve-uri("./templates/layout.xq")
                )
            )
};