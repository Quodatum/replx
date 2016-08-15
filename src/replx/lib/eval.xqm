(:~ 
 :execute xquery code from string
 : *** REQUIRES MIXUPDATES = true
 :@author Andy Bunce
 :@version 0.1
 :)
module namespace eval = 'quodatum.eval';
declare default function namespace 'quodatum.eval';
declare namespace task ="https://github.com/Quodatum/app-doc/task";

 
declare variable $eval:def-opts:=map{
     "permission" :  "admin",
     "timeout": 5
 };
  
(:~ eval list of tasks
 :)
declare function do-tasks($names as xs:string*){
   let $name:=fn:trace($names,"tasks: ")
   let $tasks:=fn:doc("../data/doc/tasks.xml")/task:tasks/task:task
   return for $name in $names
          let $task:=$tasks[@name=$name]/task:xquery
          let $res:=eval2($task,5)
          return fn:trace($res,$name || ": ")
};

(:~
 : execute string with update pre basex 8
 : return sequence head() is elapsed time or -1 if error, tail() is result or error code
 :)
declare function eval2($xq as xs:string,$timeout as xs:double)
as item()*{
    let $xq:= 'declare base-uri "' || fn:resolve-uri("..") ||'";&#10;' || $xq 
    let $xq:=fn:trace($xq,"eval2 ")
    return try {
              (:  let $t1:=prof:current-ms() :)
                let $x:=client:connect('localhost', 1984, 'admin', 'admin') !client:query(.,$xq)
               (: let $t:=(prof:current-ms()-$t1) div 1000 :)
                return (0,$x)
           }catch * {
                (-1 ,$err:code)
           }    
};

(:~
 : execute string
 : return sequence head() is elapsed time or -1 if error, tail() is result or error code
 :)
declare function eval($xq as xs:string,$timeout as xs:double)
as item()*{
 let $bindings:=map{}
 let $opts:=map {
     "permission" : "create",
     "timeout":$timeout
  }
  let $xq:= 'declare base-uri "' || fn:resolve-uri("../a") ||'";&#10;' || $xq
  return try{
       let $t1:=prof:current-ms()
       let $x:= xquery:eval($xq,$bindings,$opts)
       let $t:=(prof:current-ms()-$t1) div 1000
       return ($t,$x)
      }catch * 
      {
        (-1 ,$err:code)
      }
};

(:~
 : execute updating expression
 : return sequence head() is elapsed time or -1 if error, tail() is result or error code
 :)
declare  %updating
function update($xq as xs:string,$base as xs:string,$options as map(*))
{
 let $bindings:=map{}
 let $opts:=map:merge(($eval:def-opts,$options))
  let $xq:= 'declare base-uri "' || $base ||'";&#10;' || $xq
   let $xq:=fn:trace($xq,"eval:update")
   return xquery:update($xq,$bindings,$opts)
   (:
  return try{
       let $t1:=prof:current-ms()
       let $x:= () (:xquery:update($xq,$bindings,$opts) :)
       let $t:=(prof:current-ms()-$t1) div 1000
       return db:output(map{"result":xquery:update($xq,$bindings,$opts),
                    "time":(prof:current-ms()-$t1) div 1000
                    })
      }catch * 
      {
         db:output(map{"error":map{
               "code":$err:code,
               "description":$err:description,
               "value":$err:value,
               "module":$err:module,
               "line-number":$err:line-number,
                "column-number":$err:column-number,
               "additional":$err:additional
               }
            })
    
      }
      :)
};