(:~ 
: tools for databases..
: @author andy bunce
: @since mar 2013
:)

module namespace dbtools = 'quodatum.dbtools';

 
(:  trailing slash :)
declare variable $dbtools:webpath:= db:system()/globaloptions/webpath/fn:string()
                             || file:dir-separator();

(:~ 
: save all in db to zip
: no binary yet 
:)
declare function dbtools:zip($dbname as xs:string)
as xs:base64Binary{
  let $files:=db:list($dbname)
  let $zip   := archive:create(
                  $files ! element archive:entry { . },
                  $files ! fn:serialize(db:open($dbname, .))
                  )
return $zip
};

(:~
: update or create database from file path
: @param $dbname name of database
: @param $path file path contain files
:)
declare %updating function dbtools:sync-from-path($dbname as xs:string,$path as xs:string){
   dbtools:sync-from-files($dbname,
                  $path,
                  file:list($path,fn:true()),
                  hof:id#1)
};

(:~
: update or create database from file list. After this the database will have a
: matching copy of the files on the file system
: @param $dbname name of database
: @param $path  base file path where files are relative to en
: @param $files file names from base
: @param fn function to apply f(fullsrcpath)->anotherpath
:)
declare %updating function dbtools:sync-from-files($dbname as xs:string,
                                           $path as xs:string,
                                           $files as xs:string*,
                                         $ingest as function(xs:string) as item()* )
{
let $path:=$path ||"/"
let $files:=$files!fn:translate(.,"\","/")
let $files:=fn:filter($files,function($f){file:is-file(fn:concat($path,$f))})
return if(db:exists($dbname)) then
       (for $d in db:list($dbname) 
       where fn:not($d=$files) 
       return db:delete($dbname,$d),
       for $f in $files
       let $_:=fn:trace($path || $f,"file:") 
       let $content:=$ingest($path || $f) 
       return db:replace($dbname,$f,$content),
       db:optimize($dbname))
       else
        let $full:=$files!fn:concat($path,.)
        let $content:=$full!$ingest(.) 
       return (db:create($dbname,$content,$files))
};

