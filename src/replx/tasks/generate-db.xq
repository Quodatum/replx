(:~
 : create or update replx db from stored data files  
 :)
declare namespace task="https://github.com/Quodatum/app-doc/task";
import module namespace dbtools = 'quodatum.dbtools'  at "../lib/dbtools.xqm";
declare variable $map:=map{
 
};

declare function task:ingest($path){
    let $type:=web:content-type($path)
    let $_:=fn:trace($type,"type: ")
   return if(map:contains($map,$type))  then $map($type)($path) else $path
};

let $db:="replx" 
let $src:=fn:resolve-uri("../data/replx")
let $src:=trace($src,"fff")
return (dbtools:sync-from-files(
                            $db
                           ,$src
                           ,file:list($src,fn:true())
                           ,task:ingest#1 )
        ,db:output("replx")
        )
