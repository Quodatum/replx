(:~
 : general validation tools, apply sequence of validators
 : schematron and nvdl msg handling
 : format as json friendly
 : @author andy bunce ,quodatum ltd
 : @licence apache 2
 :)

module namespace qv = 'quodatum.validate';
import module namespace sch="expkg-zone58.validation.schematron";
declare namespace svrl = "http://purl.oclc.org/dsdl/svrl";


(:~ generate validation report for $doc
 : @param $validators sequence of functions to apply 
 : @param $extras custom attributes and elements to include in response
 :)
declare function  qv:validation($doc ,$validators as function(*)*,$extras)
as element(validation){
  let $uri:=base-uri($doc)
  let $results:=for-each($validators,function($f){$f($doc)})
  return <validation location="{$uri}"   nodes="{count($doc//*)}">{ $extras,$results}</validation>
};

(:~ report as json
 : @param $options can limit size eg {"limit":200}
:)
declare function  qv:json($d as element(validation),$options as item()) 
as element(_){
 let $limit:= if($options?limit) then $options?limit else 5000
 let $type:=$d/@type/string()
 let $uri:=$d/@location/string()
 let $name:=tokenize($uri,"/")[last()]
 let $nodes:=$d/@nodes/string()
 let $fix:=function($r){element {name($r)}{attribute type {"array"},qv:msg-limit($r/_,$limit)}}
 return <_ type="object">
            <uri>{$uri}</uri>
            <name>{$name}</name>
            <type>{$type}</type>
            <nodes type="number">{$nodes}</nodes>
            
            <msgcounts type="object">{
            for $v in $d/* return element {name($v)}{attribute type {"number"},count($v/_)}
            }</msgcounts>
          
           <reports type="object">{
                $d/*!$fix(.)
            }</reports> 
            
         </_>
};

(:~ restrict number of messages o/p :)
declare function  qv:msg-limit($msgs as element(_)* ,$limit as xs:integer)
as element(_)*{
let $count:=count($msgs)
return  if($count>$limit)
        then (subsequence($msgs,1,$limit -1),<_ type="object"><text>Messages truncated, {1+ $count - $limit} not shown.</text></_>)
        else $msgs
};
 
(:~ 
 : run schematron on doc, returns two reports
:)
declare function qv:schematron($d,$sch as xs:anyURI)
as element()*{
let $report:= sch:validate-document($d,doc($sch))
return ( 
   qv:msgs("failed-assert",$report/svrl:schematron-output/svrl:failed-assert!qv:msg-from-svrl(.)),
   qv:msgs("successful-report", $report/svrl:schematron-output/svrl:successful-report!qv:msg-from-svrl(.))
 )
};
  
(:~ convert svrl node to standard msg :)
declare function qv:msg-from-svrl($svrl as element())
as element(_){
    <_ type="object">
            <text>{$svrl/svrl:text/string()}</text>
            <role>{$svrl/@role/string()}</role>
            <location>{$svrl/@location/string()}</location>
    </_>
};

(:~ create nvdl report :)
declare function qv:nvdl($d,$nvdl as xs:anyURI){
 let $report:= validate:rng-report($d, $nvdl)
 return  qv:msgs("nvdl",$report/message!qv:msg-from-nvdl(.))
};

(:~ convert nvdl message to standard msg format :)
declare function qv:msg-from-nvdl($message as element())
as element(_){
    <_ type="object">
            <text>{$message/string()}</text>
            <role>{$message/@level/lower-case(.)}</role>
            <line type="number">{$message/@line/string()}</line>
    </_>
};

declare %private function qv:msgs($type as xs:string,$msgs as element(_)*)
as element(){
     element {$type}  {attribute type {"array"},$msgs}
 
};