(:~ 
 : A RESTXQ interface for documentation
 :@author Andy Bunce
 :@version 0.1
 :)
module namespace dr = 'quodatum.repl.rest';

import module namespace cmpx="quodatum.cmpx";
import module namespace cnf = 'quodatum.app.config' at 'config.xqm';
import module namespace txq = 'quodatum.txq' at "lib/txq.xqm";
import module namespace dice = 'quodatum.web.dice/v2' at "lib/dice.xqm";
import module namespace web = 'quodatum.web.utils4' at 'lib/webutils.xqm';

declare variable $dr:state as element(state):=db:open("replx","/state.xml")/state;

(:~
 : The doc home page as html. The UI entry point.
 :)
declare  
 %rest:GET %rest:path("replx")
 %output:method("html")
 %output:version("5.0")
 %updating
function dr:doc(){
     (: update model.xqm :)
     let $_:=fn:trace(fn:current-dateTime(),"*** START REPLX: ")
     (: @TODO check db exist app status et :)
      return (if(db:exists("replx") )
              then ()
              else dr:async-uri(fn:resolve-uri("tasks/generate-db.xq"))              
             , 
              db:output(dr:render("main.xq",map{}))
            )
};

declare %updating function dr:async-uri($uri as xs:anyURI)
{
  let $xq:=fn:unparsed-text($uri)
  let $opts:= map {'base-uri':$uri,'cache': false() }
  return async:update($xq, map{},$opts)
};

(:~
 :  status info json
 :)
declare 
%output:method("json") 
%rest:GET %rest:path("/replx/status")
function dr:status(){
   <json type="object">
   <version>{cnf:settings()?version}</version>
   <cacherestxq>{db:system()/globaloptions/cacherestxq/fn:string()}</cacherestxq>
   </json>
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
  xquery:eval($query)
};



(:~
 :  ping incr counter
 :)
declare %updating  
%rest:POST %rest:path("/replx/xq")
%output:method("text")
function dr:dopost(){
    (replace value of node $dr:state/hits with 1+$dr:state/hits,
            db:output(1+$dr:state/hits))
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