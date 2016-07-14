/* A solution has a list of cities and a travelled distance */

function tsp_solution () {
 this.cities = [];
 this.mileage = 0.0;
 this.print  = function () {
 return this.cities.map(function(i){ return i.name;}).reduce(function(x,y) { return x+"-"+y;}) +"-"+ this.cities[0].name ;
  //return this.cities.reduce( function (x,y) { return x.name+"->"+y.name;} );
 }










 return this;
} 
