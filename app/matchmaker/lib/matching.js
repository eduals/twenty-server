module.exports = function(db){
  return function(id, callback){
    /*
      1. users in clusters chosen by my cluster-mate
      2. users who are cluster-mates of my previous choices
    */
    var query = [
      'MATCH (user:User {userId})-->(source:Cluster)<--(peer:User), ',
      '(peer)-->(:Stack)-[:APRROVES]->other-->(target:Cluster)<--(other:User)',
      'WHERE (user)-->(:Location)<--(other) AND NOT (user)-->(:Stack)-[:APRROVES]->(other)',
      'RETURN DISTINCT other.id',
      'UNION',
      'MATCH (user:User {userId})-->(:Stack)-[:APRROVES]->(past:User)-->(target:Cluster)<--(other:User)',
      'WHERE (user)-->(:Location)<--(other)',
      'RETURN DISTINCT other.id'
    ].join(' ');

    var params = {
      userId: id
    };

    db.query(query, params, callback);

    return this;
  };
};