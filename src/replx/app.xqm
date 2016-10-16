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
 : Evaluates a query and stores in database and returns the result.
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
  let $id:=1+$dr:state/last-id
  let $result:=(dr:eval1($value),map:entry("id","q" || $id))=>map:merge()
  let $doc:=<query id="{$id}">
                <created>{fn:current-dateTime()}</created>
                <query engine="xquery">{$value}</query>
                <result>{$result?result}</result>
              </query>
  return (replace value of node $dr:state/last-id with $id,
          db:replace("replx","queries/q" || $id ||".xml",document{$doc}), 
          $result=> fn:serialize(map{"method":"json"})=>db:output())
};

(:~
 : execute xquery, return map with "result" or ""error"
 :)
declare function dr:eval1($xq)
{
  let $_:=trace($xq,"dr:eval1")
  return try{
    map{"result":serialize(xquery:eval($xq))}
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
 : return query with $id.
 :)
declare
%rest:GET %rest:path("replx/api/data/queries/{$id}")
%rest:query-param("q", "{$q}")  
%output:method("json")  
function dr:get-query($id,$q ) 
{
    let $entity:=$entity:list("query")
    let $items:=$entity?data()
    let $f:=$entity?access?id
    let $item:=$items[$f(.)=$id]
     (: just one :)
     return <json objects="json">{dice:json-flds($item,$entity?json)/*}</json>
};
(:~
 : return queries
 :)
declare
%rest:GET %rest:path("replx/api/data/queries")
%rest:query-param("q", "{$q}")  
%output:method("json")  
function dr:queries($q ) 
{
    let $entity:=$entity:list("query")
    let $items:=$entity?data()
    return dice:response($items,$entity)
};

(:~
 :  ping incr counter
 :)
declare %updating  
%rest:POST %rest:path("/replx/api/xq")
%output:method("text")
function dr:dopost(){
    (replace value of node $dr:state/last-id with 1+$dr:state/last-id,
            db:output(1+$dr:state/last-id))
};

(:~ elements 
 : test of select function todo FIX
 :)
declare 
%rest:GET %rest:path("/replx/api/elements")
%rest:query-param("q", "{$q}")
%rest:produces("application/json")
%output:method("json") 
function dr:elements($q){
   let $els:=doc("cup-models-reports/elements-report.xml")/elements/element
   return <json   type="object" >
            <items type="array">{
                for $e in $els
                return <_ type="object">
                 <label>{$e/@name/string() || " (" || $e/@count/string()|| ")"}</label>
                 <value>{$e/@name/string()}</value>
                </_>
            }</items>
          </json>
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