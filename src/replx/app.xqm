(:~ 
 : A RESTXQ interface for documentation
 :@author Andy Bunce
 :@version 0.1
 :)
module namespace dr = 'quodatum.repl.rest';
declare default function namespace 'quodatum.repl.rest';

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
function doc(){
     (: update model.xqm :)
     let $_:=fn:trace(fn:current-dateTime(),"*** START: ")
     (: @TODO check db exist app status et :)                 
     return 
             render("main.xq",map{})
};


(:~
 : html rendering
 :) 
declare function render($template,$map){
    let $defaults:=cnf:settings()
    let $map:=map:merge(($map,$defaults))
    return (web:method("html"),txq:render(
                fn:resolve-uri("./templates/" || $template)
                ,$map
                ,fn:resolve-uri("./templates/layout.xq")
                )
            )
};

