var tsp_helper = function () { 

var euclidean_distance = function ( X, Y ) {  return Math.sqrt(  ((X.x - Y.x) * (X.x - Y.x)) + ((X.y - Y.y) * (X.y - Y.y)) )    }; /* Can get similar results leaving out the expensive sqrt operation. **/
this.solution_hash = function(x) { 
//console.log(x.cities);
return x.cities.reduce(function (a,b) {return a.name+""+b.name } )};


this.calculate_mileage = function (route) {
  /** Calculate distances between cities on route and distance between the last and first to complete the loop.
  **/
    var cum_dist = 0;
    for ( var i = 0 ; i < route.cities.length - 1 ; i++ ) {
      
      cum_dist += euclidean_distance( route.cities[i], route.cities[i+1]);

    } 
    return cum_dist + euclidean_distance ( route.cities[0], route.cities[route.cities.length-1]) ;
    
  

 };


 this.peturb = function ( route ) { 
 // swap two random cities
 var adj_route = route.cities.slice(0); // make a copy for the new route.
 //console.log("Before swap");
 //console.log (adj_route);
 first = parseInt(Math.random() * adj_route.length); 
 second = parseInt(Math.random() * adj_route.length);
 while ( first == second ) {  // Do this to make sure the random indices are different.
   second = parseInt(Math.random() * adj_route.length);
 } 
  /** Swap them now **/
  //console.log(adj_route[first]);
 //console.log(adj_route[second]);
 //console.log("first is :" + first + " second is "+ second );
 var holder = adj_route[first];
 adj_route[first] = adj_route[second];
 adj_route[second] = holder;
 

 rtn = new tsp_solution ();
 rtn.cities = adj_route;
// console.log("After swap")
 //console.log (adj_route);
 return rtn;
 
  

 };

 


return this;

}
