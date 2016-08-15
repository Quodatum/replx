(:~ 
 : generate xquery access code for entity definitions
 :)
module namespace bf = 'quodatum.tools.buildfields';
declare default function namespace 'quodatum.tools.buildfields'; 
declare namespace ent="https://github.com/Quodatum/app-doc/entity"; 

(:~
 : write generated xquery module from entity xml
 : @param efolder full path to folder with entities e.g. fn:resolve-uri("./data/models")
 : @param dest full name of xqm to create e.g. fn:resolve-uri("models.xqm")
 :)
declare %updating function write($efolder as xs:string,$dest as xs:string)
{
    let $src:=bf:module(bf:sources($efolder))
    return file:write-text($dest,$src)
};

(:~
 : generate xquery module for given entities as a string
 :)
declare function module($entities as element(ent:entity)*) as xs:string
{
let $src:= <text>(: entity access maps 
 : auto generated from xml files in entities folder at: {fn:current-dateTime()} 
 :)

module namespace entity = 'quodatum.models.generated';
{bf:build-modules($entities)}
{bf:build-namespaces($entities)}
{(  bf:build-describe($entities))} 

(:~ map of access functions for entity :)
declare function entity:fields($entity as xs:string)
as map(*){{
  $entity:list($entity)("access")
}}; 
  </text> 

 return $src
};

(:~
 : generate xquery for to return field value in the format: "name":function($_){}
 :)
declare function accessfn($f as element(ent:field)) as xs:string
{
let $type:=$f/@type/fn:string()
return <field>
       "{$f/@name/fn:string()}": function($_ as element()) as {$type} {{$_/{$f/ent:xpath } }}</field>
};

declare function generate($e as element(ent:entity)) as xs:string
{
  let $fields:=for $field in $e/ent:fields/ent:field   
                order by $field/@name
                return $field
                
  let $filter:=$e/ent:views/ent:view[@name="filter"]=>fn:tokenize()
  let $filter:= $e/ent:fields/ent:field[@name=$filter]/ent:xpath/fn:concat("$item/",.) 
                   
  return <field>
  "{$e/@name/fn:string()}": map{{
     "name": "{ $e/@name/fn:string()}",
     "description": "{ escape($e/ent:description)}",
     "access": map{{ {$fields!accessfn(.)=>fn:string-join(",")} }},
    
     "filter": function($item,$q) as xs:boolean{{ 
         some $e in ( {fn:string-join($filter,", ")}) satisfies
         fn:contains($e,$q, 'http://www.w3.org/2005/xpath-functions/collation/html-ascii-case-insensitive')
      }},
       "json":   map{{ {$fields!jsonfn(.)=>fn:string-join(",")} }},
      "data": function() as {$e/ent:data/@type/fn:string(.)}*
       {{ {let $a:=$e/ent:data/fn:string() return if($a)then $a else "()"} }}
   }}</field>
};

(:~
 : @return sequence of element(entity) items for definitions at path
 :)
declare function sources($path as xs:string) as element(ent:entity)*
{
let $_:=fn:trace($path,"DD")
 let $p:=fn:resolve-uri($path) || "/"
 return for $f in file:list($p)
        order by $f
        return fn:doc(fn:concat($p,$f))/ent:entity
};

(:map for entity :)
declare function build-map($entity as element(ent:entity)) as xs:string
{
let $m:=for $field in $entity/ent:fields/ent:field   
        order by $field/@name
        return accessfn($field)
return <text>
declare variable $entity:{$entity/@name/fn:string()}: map{{ {fn:string-join($m,",")}
}};

</text>        
};

(:~ 
 :  return xml for suitable json serialization for field 
:)
declare function jsonfn($f as element(ent:field)) 
as xs:string
{
    let $name:=$f/@name/fn:string()
    let $type:=json-type($f/@type)
    let $json-type:=if($type="element") then "string" else $type
    let $opt:=fn:contains($type,"?")
    let $at:=if($json-type ne "string") 
            then "attribute type {'" || $json-type || "'},"
            else "" 
    (: generate json xml :)
    let $simple:=function() as xs:string{
                <field>(: {$type} :)
                        let $d:=fn:data($_/{$f/ent:xpath })
                        return if($d)
                              then element {$name} {{ {$at} $d }} 
                              else ()</field>
                }
    (: serialize when element :)
    let $element:=function() as xs:string{
                <field>element {$name} {{ attribute type {{"string"}},fn:serialize($_/{$f/ent:xpath})}}</field>
                } 
                           
    return <field>
           "{$name}": function($_ as element()) as element({$name})? {{
            {if($type="element") then $element() else $simple()} }}</field>
};


(:~ convert xs type to json
:)
declare function json-type($xsd as xs:string) as xs:string{
switch ($xsd)
   case "element()" return "element" 
   case "xs:boolean" return "boolean"
   case "xs:integer" return "number"
   case "xs:float" return "number"
   case "xs:double" return "number"
   default return "string" 
};

(:~ declare any namespaces found :)
declare function build-namespaces($entities as element()*){
  for $n in distinct-deep($entities/ent:namespace)
  return 
<text>declare namespace {$n/@prefix/fn:string()}='{$n/@uri/fn:string()}';
</text>
};
(:~ declare any namespaces found :)
declare function build-modules($entities as element()*){
  for $n in distinct-deep($entities/ent:module)
  return 
<text>import module namespace {$n/@prefix/fn:string()}='{$n/@namespace/fn:string()}';
</text>
};

declare function build-describe($entities){
  let $m:=for $e in  $entities
          return generate($e)
  return <text>          
declare variable $entity:list:=map {{ {fn:string-join($m,",")}
}};

</text>        
};

declare function escape($str as xs:string) 
as xs:string{
   fn:replace(
     fn:replace($str,'"','""'),
     "'","''")
};

(:-----from functx-------------------:)

 declare function distinct-deep 
  ( $nodes as node()* )  as node()* {
       
    for $seq in (1 to fn:count($nodes))
    return $nodes[$seq][fn:not(is-node-in-sequence-deep-equal(
                          .,$nodes[fn:position() < $seq]))]
};

declare function is-node-in-sequence-deep-equal 
  ( $node as node()? ,
    $seq as node()* )  as xs:boolean {
       
   some $nodeInSeq in $seq satisfies fn:deep-equal($nodeInSeq,$node)
 } ; 