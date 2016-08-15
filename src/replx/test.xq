(:~ 
 : A RESTXQ interface for documentation
 :@author Andy Bunce
 :@version 0.1
 :)


import module namespace cmpx="quodatum.cmpx";
import module namespace txq = 'quodatum.txq' at "lib/txq.xqm";
import module namespace dice = 'quodatum.web.dice/v3' at "lib/dice.xqm";
import module namespace web = 'quodatum.web.utils4' at 'lib/webutils.xqm';
import module namespace entity = 'quodatum.models.generated' at 'generated/models.xqm';


    let $entity:=$entity:list("query")
     let $items:=$entity?data()
    return $items (: $entity?access?id :)
    
   