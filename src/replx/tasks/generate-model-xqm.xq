(:~
 : Update "generated/models.xqm" from data/models
 :)

declare namespace task="https://github.com/Quodatum/app-doc/task";
import module namespace bf = 'quodatum.tools.buildfields' at "../lib/entity-gen.xqm";
  
let $efolder:=fn:resolve-uri("../data/replx/models")
let $target:=fn:resolve-uri("../generated/models.xqm")
return (bf:write($efolder,$target),db:output("generated models.xqm"))
          
