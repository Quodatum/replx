(:~ 
 : file system tools
 :@author Andy Bunce
 :@version 0.2
 :)
module namespace df = 'quodatum.doc.file';

(:~
 : path to webapps with trailing slash 
 :)
declare variable $df:base:= db:system()/globaloptions/webpath/fn:string()
                             || file:dir-separator();

(:~ 
 : default file list skip data
 :)
declare function df:keep-files($f as xs:string,$s as xs:string)
as xs:string?{
     if(file:is-file(file:resolve-path($f,$s)))
     then if(starts-with($f,"data")) 
          then ()
          else $f
     else ()
};
     
(:~
 : list of files matching $glob below $src
 : @param $src full path to folder eg "file:/C:/sss/"
 :)
declare function df:dir($src as xs:string,$glob as xs:string)
as xs:string*
{ 
let $s:=file:path-to-native($src) 
return 
file:list($s,fn:true(),$glob)
!df:keep-files(.,$s)
};


(:~ true path from segment :)
declare function df:webpath($path as xs:string)
 as xs:string{
 $df:base || $path
};

(:~
 : list of all appications
 :)
declare function df:apps() as xs:string*
{
    let $root:=$df:base
    for $b in  file:list($root)
    let $full:= $root || file:dir-separator() || $b
    let $name:=file:name($full)
    where file:is-dir($full)and fn:not($name = ('static','WEB-INF'))
    return $name
};

(:~ 
 : serialize a file object
 :) 
declare function df:file($dir,
                    $name as xs:string,
                    $isFolder as xs:boolean) as element(_)
{
     let $name:=fn:translate($name,"\","/")
     return   
      <_ type="object">
         <name>{$name}</name>
         <path>{$dir || $name}</path>
         <isdir type="boolean">{$isFolder}</isdir>
      </_>
};

(:~
 : list of files in directory $dir
 : @return json array {name:"gg","path:"aaa/bb",isdir:false}
 :)
declare   
function df:list($dir as xs:string) as element(_)*  
{
    let $fdir:= df:webpath($dir)
    let $xq:=file:list($fdir)
    let $xq:=$xq
    for $name in $xq   
       let $isFolder:=file:is-dir($fdir ||$name)
       order by $isFolder descending,fn:lower-case($name)
       return df:file($dir,$name,$isFolder)
};

(:~
 : list of files below directory $dir matching pattern
 : @return json array {name:"gg","path:"aaa/bb",isdir:false}
 :)
declare   
function df:find($dir as xs:string,$pattern as xs:string) as element(_)* 
{
   let $fdir:= df:webpath($dir)
   let $names:=file:list($fdir,fn:true(),$pattern)
   for $name in $names   
       let $isFolder:=file:is-dir($fdir ||$name)
       order by $isFolder descending,fn:lower-case($name)
       return df:file($dir,$name,$isFolder)
};

(:~
 : get doc at dir as text, if xml convert to string
 :)
declare function df:read($dir) as item()* 
{
    let $fdir:= df:webpath($dir)
    return if(fn:doc-available($fdir))
           then fn:serialize(fn:doc($fdir))
           else if(fn:unparsed-text-available($fdir))
           then fn:unparsed-text($fdir)
           else ()
};


(:~ 
 : test file is text
 :)
declare function df:is-text-file($path) as xs:boolean{
    df:is-text(file:read-binary($path,0,1024))
};

(:~ 
 : test for text
 : @see http://stackoverflow.com/questions/2644938/how-to-tell-binary-from-text-files-in-linux
 :) 
declare function df:is-text($b as xs:base64Binary )as xs:boolean
{
  fn:empty(bin:find($b, 0,convert:bytes-to-base64(xs:byte(0))))
};