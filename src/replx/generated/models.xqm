(: entity access maps 
 : auto generated from xml files in entities folder at: 2016-04-04T22:53:40.744+01:00 
 :)

module namespace entity = 'quodatum.models.generated';
declare namespace ent='https://github.com/Quodatum/app-doc/entity';
declare namespace xqdoc='http://www.xqdoc.org/1.0';
declare namespace task='https://github.com/Quodatum/app-doc/task';
          
declare variable $entity:list:=map { 
  "entity": map{
     "name": "entity",
     "description": "About an entity i.e. something described in this framework",
     "access": map{ 
       "code": function($_ as element()) as xs:string? {$_/ent:data },
       "description": function($_ as element()) as xs:string {$_/ent:description },
       "fieldslink": function($_ as element()) as xs:string {$_/fn:concat("/data/entity/",@name,"/field") },
       "iconclass": function($_ as element()) as xs:string {$_/ent:iconclass },
       "modules": function($_ as element()) as xs:string? {$_/ent:module/concat("import module namespace ",@prefix,"='",@namespace,"';
")=>string-join() },
       "name": function($_ as element()) as xs:string {$_/@name },
       "namespaces": function($_ as element()) as xs:string? {$_/ent:namespace/concat("declare namespace ",@prefix,"='",@uri,"';
")=>string-join() },
       "nfields": function($_ as element()) as xs:integer {$_/fn:count(ent:fields/ent:field) },
       "parent": function($_ as element()) as xs:string? {$_/ent:parent/@name },
       "parentlink": function($_ as element()) as xs:string? {$_/fn:concat("/data/entity/",ent:parent/@name) },
       "type": function($_ as element()) as xs:string {$_/ent:data/@type } },
    
     "filter": function($item,$q) as xs:boolean{ 
         some $e in ( ) satisfies
         fn:contains($e,$q, 'http://www.w3.org/2005/xpath-functions/collation/html-ascii-case-insensitive')
      },
       "json":   map{ 
           "code": function($_ as element()) as element(code)? {
            (: string :)
                        let $d:=fn:data($_/ent:data)
                        return if($d)
                              then element code {  $d } 
                              else () },
           "description": function($_ as element()) as element(description)? {
            (: string :)
                        let $d:=fn:data($_/ent:description)
                        return if($d)
                              then element description {  $d } 
                              else () },
           "fieldslink": function($_ as element()) as element(fieldslink)? {
            (: string :)
                        let $d:=fn:data($_/fn:concat("/data/entity/",@name,"/field"))
                        return if($d)
                              then element fieldslink {  $d } 
                              else () },
           "iconclass": function($_ as element()) as element(iconclass)? {
            (: string :)
                        let $d:=fn:data($_/ent:iconclass)
                        return if($d)
                              then element iconclass {  $d } 
                              else () },
           "modules": function($_ as element()) as element(modules)? {
            (: string :)
                        let $d:=fn:data($_/ent:module/concat("import module namespace ",@prefix,"='",@namespace,"';
")=>string-join())
                        return if($d)
                              then element modules {  $d } 
                              else () },
           "name": function($_ as element()) as element(name)? {
            (: string :)
                        let $d:=fn:data($_/@name)
                        return if($d)
                              then element name {  $d } 
                              else () },
           "namespaces": function($_ as element()) as element(namespaces)? {
            (: string :)
                        let $d:=fn:data($_/ent:namespace/concat("declare namespace ",@prefix,"='",@uri,"';
")=>string-join())
                        return if($d)
                              then element namespaces {  $d } 
                              else () },
           "nfields": function($_ as element()) as element(nfields)? {
            (: number :)
                        let $d:=fn:data($_/fn:count(ent:fields/ent:field))
                        return if($d)
                              then element nfields { attribute type {'number'}, $d } 
                              else () },
           "parent": function($_ as element()) as element(parent)? {
            (: string :)
                        let $d:=fn:data($_/ent:parent/@name)
                        return if($d)
                              then element parent {  $d } 
                              else () },
           "parentlink": function($_ as element()) as element(parentlink)? {
            (: string :)
                        let $d:=fn:data($_/fn:concat("/data/entity/",ent:parent/@name))
                        return if($d)
                              then element parentlink {  $d } 
                              else () },
           "type": function($_ as element()) as element(type)? {
            (: string :)
                        let $d:=fn:data($_/ent:data/@type)
                        return if($d)
                              then element type {  $d } 
                              else () } },
      "data": function() as element(ent:entity)*
       { collection("doc-doc")//ent:entity }
   },
  "field": map{
     "name": "field",
     "description": "About an entity field.",
     "access": map{ 
       "description": function($_ as element()) as xs:string {$_/ent:description },
       "name": function($_ as element()) as xs:string {$_/@name },
       "parent": function($_ as element()) as xs:string {$_/../../@name },
       "type": function($_ as element()) as xs:string {$_/@type },
       "xpath": function($_ as element()) as xs:string {$_/ent:xpath } },
    
     "filter": function($item,$q) as xs:boolean{ 
         some $e in ( ) satisfies
         fn:contains($e,$q, 'http://www.w3.org/2005/xpath-functions/collation/html-ascii-case-insensitive')
      },
       "json":   map{ 
           "description": function($_ as element()) as element(description)? {
            (: string :)
                        let $d:=fn:data($_/ent:description)
                        return if($d)
                              then element description {  $d } 
                              else () },
           "name": function($_ as element()) as element(name)? {
            (: string :)
                        let $d:=fn:data($_/@name)
                        return if($d)
                              then element name {  $d } 
                              else () },
           "parent": function($_ as element()) as element(parent)? {
            (: string :)
                        let $d:=fn:data($_/../../@name)
                        return if($d)
                              then element parent {  $d } 
                              else () },
           "type": function($_ as element()) as element(type)? {
            (: string :)
                        let $d:=fn:data($_/@type)
                        return if($d)
                              then element type {  $d } 
                              else () },
           "xpath": function($_ as element()) as element(xpath)? {
            (: string :)
                        let $d:=fn:data($_/ent:xpath)
                        return if($d)
                              then element xpath {  $d } 
                              else () } },
      "data": function() as element(ent:field)*
       { collection("doc-doc")//ent:field }
   },
  "query": map{
     "name": "query",
     "description": "An replx query",
     "access": map{ 
       "created": function($_ as element()) as xs:string {$_/created },
       "id": function($_ as element()) as xs:string {$_/@id },
       "query": function($_ as element()) as xs:string {$_/query } },
    
     "filter": function($item,$q) as xs:boolean{ 
         some $e in ( ) satisfies
         fn:contains($e,$q, 'http://www.w3.org/2005/xpath-functions/collation/html-ascii-case-insensitive')
      },
       "json":   map{ 
           "created": function($_ as element()) as element(created)? {
            (: string :)
                        let $d:=fn:data($_/created)
                        return if($d)
                              then element created {  $d } 
                              else () },
           "id": function($_ as element()) as element(id)? {
            (: string :)
                        let $d:=fn:data($_/@id)
                        return if($d)
                              then element id {  $d } 
                              else () },
           "query": function($_ as element()) as element(query)? {
            (: string :)
                        let $d:=fn:data($_/query)
                        return if($d)
                              then element query {  $d } 
                              else () } },
      "data": function() as element(query)*
       { collection("replx/queries")/query }
   },
  "search-result": map{
     "name": "search-result",
     "description": "About a search result.",
     "access": map{ 
       "sref": function($_ as element()) as xs:string {$_/"app.item.index({'name':'benchx'})" },
       "title": function($_ as element()) as xs:string {$_/title },
       "type": function($_ as element()) as xs:string {$_/type },
       "uri": function($_ as element()) as xs:string {$_/uri } },
    
     "filter": function($item,$q) as xs:boolean{ 
         some $e in ( ) satisfies
         fn:contains($e,$q, 'http://www.w3.org/2005/xpath-functions/collation/html-ascii-case-insensitive')
      },
       "json":   map{ 
           "sref": function($_ as element()) as element(sref)? {
            (: string :)
                        let $d:=fn:data($_/"app.item.index({'name':'benchx'})")
                        return if($d)
                              then element sref {  $d } 
                              else () },
           "title": function($_ as element()) as element(title)? {
            (: string :)
                        let $d:=fn:data($_/title)
                        return if($d)
                              then element title {  $d } 
                              else () },
           "type": function($_ as element()) as element(type)? {
            (: string :)
                        let $d:=fn:data($_/type)
                        return if($d)
                              then element type {  $d } 
                              else () },
           "uri": function($_ as element()) as element(uri)? {
            (: string :)
                        let $d:=fn:data($_/uri)
                        return if($d)
                              then element uri {  $d } 
                              else () } },
      "data": function() as element(search)*
       { () }
   },
  "task": map{
     "name": "task",
     "description": "A piece of runnable XQuery code that causes side effects",
     "access": map{ 
       "description": function($_ as element()) as xs:string {$_/xqdoc:module/xqdoc:comment/xqdoc:description },
       "name": function($_ as element()) as xs:string {$_/xqdoc:module/xqdoc:uri },
       "params": function($_ as element()) as xs:integer {$_/count(.//xqdoc:variable) },
       "path": function($_ as element()) as xs:string {$_/fn:replace(db:path(.),"^modules/","doc/") },
       "xquery": function($_ as element()) as xs:string {$_/concat('/doc/data/file/read?path=' ,db:path(.)) } },
    
     "filter": function($item,$q) as xs:boolean{ 
         some $e in ( $item/xqdoc:module/xqdoc:uri, $item/xqdoc:module/xqdoc:comment/xqdoc:description) satisfies
         fn:contains($e,$q, 'http://www.w3.org/2005/xpath-functions/collation/html-ascii-case-insensitive')
      },
       "json":   map{ 
           "description": function($_ as element()) as element(description)? {
            (: string :)
                        let $d:=fn:data($_/xqdoc:module/xqdoc:comment/xqdoc:description)
                        return if($d)
                              then element description {  $d } 
                              else () },
           "name": function($_ as element()) as element(name)? {
            (: string :)
                        let $d:=fn:data($_/xqdoc:module/xqdoc:uri)
                        return if($d)
                              then element name {  $d } 
                              else () },
           "params": function($_ as element()) as element(params)? {
            (: number :)
                        let $d:=fn:data($_/count(.//xqdoc:variable))
                        return if($d)
                              then element params { attribute type {'number'}, $d } 
                              else () },
           "path": function($_ as element()) as element(path)? {
            (: string :)
                        let $d:=fn:data($_/fn:replace(db:path(.),"^modules/","doc/"))
                        return if($d)
                              then element path {  $d } 
                              else () },
           "xquery": function($_ as element()) as element(xquery)? {
            (: string :)
                        let $d:=fn:data($_/concat('/doc/data/file/read?path=' ,db:path(.)))
                        return if($d)
                              then element xquery {  $d } 
                              else () } },
      "data": function() as element(xqdoc:xqdoc)*
       { collection("doc-doc")//xqdoc:xqdoc[
  xqdoc:namespaces/xqdoc:namespace/@uri="https://github.com/Quodatum/app-doc/task"
 and xqdoc:module/@type="main"
] }
   }
};

 

(:~ map of access functions for entity :)
declare function entity:fields($entity as xs:string)
as map(*){
  $entity:list($entity)("access")
}; 
  