(:~ 
 : A RESTXQ interface for documentation
 :@author Andy Bunce
 :@version 0.1
 :)
module namespace dr = 'quodatum.repl.rest';

import module namespace cmpx="quodatum.cmpx";

import module namespace txq = 'quodatum.txq' at "lib/txq.xqm";
import module namespace dice = 'quodatum.web.dice/v3' at "lib/dice.xqm";
import module namespace web = 'quodatum.web.utils4' at 'lib/webutils.xqm';
import module namespace entity = 'quodatum.models.generated' at 'generated/models.xqm';

declare variable $dr:state as element(state):=db:open("replx","/state.xml")/state;
declare variable $dr:app :=cmpx:app("replx",map{"offline":fn:false()});

(:~ display main UI via redirect :)
declare 
%rest:GET %rest:path("/replx")
 function dr:redirect(){
 <rest:redirect>/replx/ui</rest:redirect>
 };
 
(:~ display home page :) 
declare 
%rest:GET %rest:path("/replx/ui")
%rest:produces("text/html")
%output:method("html") %output:version("5.0")
%updating
function dr:main(){
   dr:doc()
};

(:~ all ui paths serve root
 :)
declare 
%rest:GET %rest:path("/replx/ui/{$path=.+}")
%rest:produces("text/html")
%output:method("html") %output:version("5.0")
%updating
function dr:ui($path){
     dr:doc()
};
(:~
 : The doc home page as html. The UI entry point.
 :)
declare  
 %updating
function dr:doc(){
     (: update model.xqm :)
     let $_:=fn:trace(fn:current-dateTime(),"*** START REPLX: ")
     (: @TODO check db exist app status et :)
      return (
              db:output(dr:render("main.xq",map{})),
              if(db:exists("replx") )
              then ()
              else 
              let $query-id:=dr:async-uri(fn:resolve-uri("tasks/generate-db.xq"))
              return db:output("<--" || $query-id || "-->")             
            )
};

declare function dr:async-uri($uri as xs:anyURI)
{
  let $xq:=fn:unparsed-text($uri)
  let $opts:= map {'base-uri':$uri,'cache': false() }
  return jobs:eval($xq, map{},$opts)
};

(:~
 :  status info json
 :)
declare 
%output:method("json") 
%rest:GET %rest:path("/replx/api/status")
function dr:status(){
   <json type="object">
   <version>{$dr:app?version}</version>
   <cacherestxq>{db:system()/globaloptions/cacherestxq/fn:string()}</cacherestxq>
   </json>
};
(:~
 : Evaluates a query and returns the result.
 : @param  $query  query
 : @return result of query
 :)
declare
  %updating
  %rest:POST 
  %rest:query-param("value", "{$value}") 
  %rest:path("/replx/api/query")
  %output:method("text")
function dr:eval-query($value  )  {
  let $id:=1+$dr:state/hits
  let $result:=(dr:eval1($value),map:entry("id",$id))=>map:merge()=> fn:serialize(map{"method":"json"})
  return (replace value of node $dr:state/hits with $id,
          db:output($result))
};

declare function dr:eval1($xq)
{
  let $_:=trace($xq,"dr:eval1")
  return try{
    map{"value":serialize(xquery:eval($xq))}
  }catch * {
       map{"error":map{
               "code":$err:code,
               "description":$err:description,
               "value":$err:value,
               "module":$err:module,
               "line-number":$err:line-number,
                "column-number":$err:column-number,
               "additional":$err:additional
               }
            }
  }
};

(:~
 : List of apps found on file system.
 :)
declare
%rest:GET %rest:path("replx/api/data/queries/{$id}")
%rest:query-param("q", "{$q}")  
%output:method("json")  
function dr:queries($id,$q ) 
{
    let $entity:=$entity:list("query")
    let $items:=$entity?data()
    let $f:=$entity?access?id
    let $item:=$items[$f(.)=$id]
     (: just one :)
     return <json objects="json">{dice:json-flds($item,$entity?json)/*}</json>
};


(:~
 :  ping incr counter
 :)
declare %updating  
%rest:POST %rest:path("/replx/api/xq")
%output:method("text")
function dr:dopost(){
    (replace value of node $dr:state/hits with 1+$dr:state/hits,
            db:output(1+$dr:state/hits))
};

(:~
 : html rendering
 :) 
declare function dr:render($template,$map){
    let $map:=map:merge(($map,$dr:app))
    return (web:method("html"),txq:render(
                fn:resolve-uri("./templates/" || $template)
                ,$map
                ,fn:resolve-uri("./templates/layout.xq")
                )
            )
};