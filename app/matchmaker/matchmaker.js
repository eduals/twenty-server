/* global require, module */
module.exports = function(db){
  var db = db || require('../../config/neo4j');
  return {
    /*
      function(id, callback)
        id: user id
        callback: function(result)
          result: array of id's of matched users
    */
    matches: require('./lib/matching')(db),


    /*
      function(id, callback)
        id: user id
        callback: function(clusterId)
          clusterId: id of belonging cluster
    */
    classify: require('./lib/classify')(db),
    

    /*
      function(me, myFormula, you, yourFormula)
        me, you:  json objects containing profile information, 
          values are truethy if has the attribute
        myFormula, yourFormula:  json objects containing formula, 
          same structure as above but the value are weights
    */
    score: require('./lib/scoring')()
  };
};

